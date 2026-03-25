import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Session from '@/lib/models/Session';
import Turn from '@/lib/models/Turn';
import DailyStats from '@/lib/models/DailyStats';
import { getPromptById } from '@/lib/data/tcf-prompts';
import { scoreResponse } from '@/lib/scoring';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { promptId, transcript, duration } = await req.json();

        if (!promptId || !transcript) {
            return NextResponse.json(
                { error: 'promptId and transcript are required' },
                { status: 400 }
            );
        }

        const prompt = getPromptById(promptId);
        if (!prompt) {
            return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
        }

        // Score the response
        const result = scoreResponse(transcript, prompt);

        await dbConnect();

        const userId = (session.user as any).id;

        // Create session
        const practiceSession = await Session.create({
            userId,
            type: 'speaking',
            exam: 'TCF',
            taskType: prompt.taskType,
            score: result.score,
            duration: duration || 0,
            completedAt: new Date(),
        });

        // Save examiner turn
        await Turn.create({
            sessionId: practiceSession._id,
            role: 'examiner',
            text: prompt.examinerQuestion,
        });

        // Save user turn with scoring
        await Turn.create({
            sessionId: practiceSession._id,
            role: 'user',
            text: transcript,
            score: result.score,
            feedbackText: result.feedback.join(' | '),
            wordCount: result.wordCount,
            keywordsMatched: result.keywordsMatched,
        });

        // Update daily stats
        const today = new Date().toISOString().split('T')[0];
        const minutesPracticed = Math.ceil((duration || 0) / 60);

        await DailyStats.findOneAndUpdate(
            { userId, date: today },
            {
                $inc: {
                    minutesPracticed: minutesPracticed,
                    speakingTasksDone: 1,
                },
                $set: {
                    speakingScore: result.score,
                },
            },
            { upsert: true, new: true }
        );

        return NextResponse.json({
            sessionId: practiceSession._id.toString(),
            ...result,
        });
    } catch (error: any) {
        console.error('Speaking submit error:', error);
        return NextResponse.json(
            { error: 'Failed to submit speaking response' },
            { status: 500 }
        );
    }
}
