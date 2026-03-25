import { TCFPrompt } from '@/lib/data/tcf-prompts';

interface ScoringResult {
    score: number;           // 0–20
    wordCount: number;
    keywordsMatched: string[];
    keywordsMissed: string[];
    feedback: string[];
    level: 'A2' | 'B1' | 'B2';
}

/**
 * Normalize French text: lowercase, strip accents for comparison.
 */
function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * Score a user's spoken response against a TCF prompt.
 * Returns a score out of 20, matched/missed keywords, and textual feedback.
 */
export function scoreResponse(transcript: string, prompt: TCFPrompt): ScoringResult {
    const words = transcript.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const normalizedTranscript = normalize(transcript);

    // ── Keyword matching ─────────────────────────────────────────
    const keywordsMatched: string[] = [];
    const keywordsMissed: string[] = [];

    for (const keyword of prompt.keywords) {
        const normalizedKeyword = normalize(keyword);
        if (normalizedTranscript.includes(normalizedKeyword)) {
            keywordsMatched.push(keyword);
        } else {
            keywordsMissed.push(keyword);
        }
    }

    const keywordRatio = prompt.keywords.length > 0
        ? keywordsMatched.length / prompt.keywords.length
        : 0;

    // ── Length score (0–5 points) ────────────────────────────────
    let lengthScore = 0;
    const minWords = prompt.expectedMinWords;
    if (wordCount >= minWords * 1.5) {
        lengthScore = 5;
    } else if (wordCount >= minWords) {
        lengthScore = 4;
    } else if (wordCount >= minWords * 0.7) {
        lengthScore = 3;
    } else if (wordCount >= minWords * 0.4) {
        lengthScore = 2;
    } else if (wordCount >= minWords * 0.2) {
        lengthScore = 1;
    }

    // ── Keyword score (0–6 points) ──────────────────────────────
    let keywordScore = Math.round(keywordRatio * 6);

    // ── Fluency heuristics (0–5 points) ─────────────────────────
    let fluencyScore = 0;

    // Check sentence variety (periods, commas → structure)
    const sentenceCount = transcript.split(/[.!?]+/).filter((s) => s.trim().length > 3).length;
    if (sentenceCount >= 4) fluencyScore += 2;
    else if (sentenceCount >= 2) fluencyScore += 1;

    // Check for connectors (linking words are a B2 indicator)
    const connectors = ['parce que', 'cependant', 'donc', 'mais', 'aussi', 'en plus', 'par exemple', 'car', 'd\'abord', 'ensuite', 'enfin', 'toutefois', 'néanmoins', 'pourtant', 'en revanche', 'de plus', 'par contre'];
    const connectorsUsed = connectors.filter((c) => normalizedTranscript.includes(normalize(c)));
    if (connectorsUsed.length >= 3) fluencyScore += 2;
    else if (connectorsUsed.length >= 1) fluencyScore += 1;

    // Average word length (proxy for vocabulary sophistication)
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / Math.max(words.length, 1);
    if (avgWordLength >= 5) fluencyScore += 1;

    fluencyScore = Math.min(fluencyScore, 5);

    // ── Task-specific bonus (0–4 points) ────────────────────────
    let taskBonus = 0;

    if (prompt.taskType === 'task1') {
        // Personal interaction: did they actually answer?
        if (wordCount >= minWords) taskBonus += 2;
        if (keywordRatio >= 0.5) taskBonus += 2;
    } else if (prompt.taskType === 'task2') {
        // Role play: did they ask questions?
        const questionMarks = (transcript.match(/\?/g) || []).length;
        if (questionMarks >= 2) taskBonus += 2;
        else if (questionMarks >= 1) taskBonus += 1;
        if (keywordRatio >= 0.4) taskBonus += 2;
    } else if (prompt.taskType === 'task3') {
        // Opinion: did they express an opinion & use connectors?
        const opinionWords = ['pense', 'crois', 'opinion', 'avis', 'selon moi', 'je trouve', 'estime'];
        const hasOpinion = opinionWords.some((w) => normalizedTranscript.includes(normalize(w)));
        if (hasOpinion) taskBonus += 2;
        if (connectorsUsed.length >= 2) taskBonus += 2;
    }

    taskBonus = Math.min(taskBonus, 4);

    // ── Final score ─────────────────────────────────────────────
    const rawScore = lengthScore + keywordScore + fluencyScore + taskBonus;
    const score = Math.min(Math.max(Math.round(rawScore), 0), 20);

    // ── Estimate level ──────────────────────────────────────────
    let level: 'A2' | 'B1' | 'B2';
    if (score >= 14) level = 'B2';
    else if (score >= 8) level = 'B1';
    else level = 'A2';

    // ── Generate feedback ───────────────────────────────────────
    const feedback: string[] = [];

    // Word count feedback
    if (wordCount < minWords * 0.5) {
        feedback.push(`Your response is quite short (${wordCount} words). Try to elaborate more — aim for at least ${minWords} words.`);
    } else if (wordCount < minWords) {
        feedback.push(`Good effort! You used ${wordCount} words. Try to reach ${minWords}+ words for a better score.`);
    } else {
        feedback.push(`Great length! You produced ${wordCount} words.`);
    }

    // Keyword feedback
    if (keywordsMissed.length > 0 && keywordsMissed.length <= 4) {
        feedback.push(`Try to include these relevant words: ${keywordsMissed.join(', ')}.`);
    } else if (keywordsMissed.length > 4) {
        feedback.push(`Many key terms were missing. Focus on staying on-topic and using vocabulary related to the prompt.`);
    }

    if (keywordsMatched.length > 0) {
        feedback.push(`Good vocabulary usage! You included: ${keywordsMatched.join(', ')}.`);
    }

    // Fluency feedback
    if (sentenceCount < 2) {
        feedback.push('Try to use more complete sentences. Structure your response with a beginning, middle, and end.');
    }

    if (connectorsUsed.length === 0) {
        feedback.push('Use linking words (parce que, cependant, donc, aussi, en plus) to connect your ideas — this is important for B2.');
    } else {
        feedback.push(`Nice use of connectors: ${connectorsUsed.join(', ')}.`);
    }

    // Task-specific feedback
    if (prompt.taskType === 'task2') {
        const questionMarks = (transcript.match(/\?/g) || []).length;
        if (questionMarks === 0) {
            feedback.push('In a role-play task, you should ask questions! Try using interrogative forms.');
        }
    }

    if (prompt.taskType === 'task3') {
        const opinionWords = ['pense', 'crois', 'opinion', 'avis', 'selon moi', 'je trouve'];
        const hasOpinion = opinionWords.some((w) => normalizedTranscript.includes(normalize(w)));
        if (!hasOpinion) {
            feedback.push('State your opinion clearly using phrases like "Je pense que..." or "À mon avis...".');
        }
    }

    return {
        score,
        wordCount,
        keywordsMatched,
        keywordsMissed,
        feedback,
        level,
    };
}
