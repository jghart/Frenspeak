export interface TCFPrompt {
    id: string;
    taskType: 'task1' | 'task2' | 'task3';
    title: string;
    prompt: string;
    examinerQuestion: string;
    keywords: string[];
    expectedMinWords: number;
    timeLimit: number; // seconds
}

// ─── TASK 1: Personal Interaction (2 minutes) ───────────────────────────
// The examiner asks simple personal questions. The candidate answers naturally.
export const task1Prompts: TCFPrompt[] = [
    {
        id: 't1-01',
        taskType: 'task1',
        title: 'Introduction personnelle',
        prompt: 'Présentez-vous : votre nom, votre âge, votre nationalité et votre profession.',
        examinerQuestion: 'Bonjour. Pouvez-vous vous présenter, s\'il vous plaît ? Dites-moi votre nom, votre âge, votre nationalité et ce que vous faites dans la vie.',
        keywords: ['je', 'appelle', 'ans', 'nationalité', 'travaille', 'habite', 'suis'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-02',
        taskType: 'task1',
        title: 'Votre famille',
        prompt: 'Parlez de votre famille : combien de personnes, leurs prénoms, ce qu\'ils font.',
        examinerQuestion: 'Parlez-moi de votre famille. Combien de personnes y a-t-il dans votre famille ? Que font-ils ?',
        keywords: ['famille', 'frère', 'sœur', 'parents', 'mère', 'père', 'enfants'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-03',
        taskType: 'task1',
        title: 'Votre logement',
        prompt: 'Décrivez l\'endroit où vous habitez : ville ou campagne, type de logement, ce que vous aimez.',
        examinerQuestion: 'Où habitez-vous ? Décrivez votre logement. Qu\'est-ce que vous aimez dans votre quartier ?',
        keywords: ['habite', 'maison', 'appartement', 'ville', 'quartier', 'aime', 'près'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-04',
        taskType: 'task1',
        title: 'Vos loisirs',
        prompt: 'Parlez de vos loisirs et activités préférés pendant votre temps libre.',
        examinerQuestion: 'Que faites-vous pendant votre temps libre ? Quels sont vos loisirs préférés ?',
        keywords: ['aime', 'temps libre', 'loisir', 'sport', 'musique', 'lire', 'jouer', 'week-end'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-05',
        taskType: 'task1',
        title: 'Votre travail ou études',
        prompt: 'Parlez de votre travail ou de vos études : ce que vous faites, depuis combien de temps, ce que vous aimez.',
        examinerQuestion: 'Parlez-moi de votre travail ou de vos études. Qu\'est-ce que vous faites exactement ? Depuis combien de temps ?',
        keywords: ['travaille', 'étudie', 'entreprise', 'université', 'depuis', 'aime', 'collègues'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-06',
        taskType: 'task1',
        title: 'Votre journée typique',
        prompt: 'Décrivez une journée typique de votre vie quotidienne.',
        examinerQuestion: 'Décrivez-moi une journée typique. Que faites-vous le matin, l\'après-midi et le soir ?',
        keywords: ['matin', 'après-midi', 'soir', 'lever', 'manger', 'travailler', 'dormir', 'heure'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-07',
        taskType: 'task1',
        title: 'Vos vacances',
        prompt: 'Parlez de vos dernières vacances ou d\'un voyage que vous avez fait.',
        examinerQuestion: 'Racontez-moi vos dernières vacances. Où êtes-vous allé(e) ? Qu\'avez-vous fait ?',
        keywords: ['vacances', 'voyage', 'allé', 'visité', 'pays', 'plage', 'hôtel', 'aimé'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-08',
        taskType: 'task1',
        title: 'La nourriture',
        prompt: 'Parlez de vos habitudes alimentaires et de vos plats préférés.',
        examinerQuestion: 'Qu\'est-ce que vous aimez manger ? Quel est votre plat préféré ? Savez-vous cuisiner ?',
        keywords: ['manger', 'cuisine', 'plat', 'préféré', 'aime', 'restaurant', 'préparer'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-09',
        taskType: 'task1',
        title: 'Vos amis',
        prompt: 'Parlez de vos amis : comment vous les avez rencontrés et ce que vous faites ensemble.',
        examinerQuestion: 'Parlez-moi de vos amis. Comment les avez-vous rencontrés ? Que faites-vous ensemble ?',
        keywords: ['ami', 'rencontré', 'ensemble', 'sortir', 'connaît', 'aime', 'temps'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-10',
        taskType: 'task1',
        title: 'Le français',
        prompt: 'Expliquez pourquoi vous apprenez le français et comment vous le pratiquez.',
        examinerQuestion: 'Pourquoi apprenez-vous le français ? Comment étudiez-vous ? Depuis combien de temps ?',
        keywords: ['français', 'apprends', 'depuis', 'cours', 'pratique', 'parler', 'important'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-11',
        taskType: 'task1',
        title: 'Votre ville',
        prompt: 'Décrivez la ville où vous habitez : les lieux importants, les transports, l\'ambiance.',
        examinerQuestion: 'Décrivez la ville où vous vivez. Qu\'est-ce qu\'il y a d\'intéressant ? Comment sont les transports ?',
        keywords: ['ville', 'centre', 'transport', 'bus', 'restaurant', 'parc', 'intéressant'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
    {
        id: 't1-12',
        taskType: 'task1',
        title: 'Le sport',
        prompt: 'Parlez de votre relation avec le sport : est-ce que vous faites du sport ? Lequel ?',
        examinerQuestion: 'Est-ce que vous faites du sport ? Quel sport pratiquez-vous ? Combien de fois par semaine ?',
        keywords: ['sport', 'jouer', 'football', 'course', 'semaine', 'santé', 'équipe', 'aime'],
        expectedMinWords: 40,
        timeLimit: 120,
    },
];

// ─── TASK 2: Role Play (3.5 minutes) ────────────────────────────────────
// The candidate must interact: ask questions, solve a situation, get information.
export const task2Prompts: TCFPrompt[] = [
    {
        id: 't2-01',
        taskType: 'task2',
        title: 'À la gare',
        prompt: 'Vous êtes à la gare. Demandez les horaires des trains, le prix du billet et le quai de départ.',
        examinerQuestion: 'Bonjour, bienvenue à la gare. Que puis-je faire pour vous ?',
        keywords: ['train', 'billet', 'horaire', 'quai', 'départ', 'arrivée', 'prix', 'aller-retour'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-02',
        taskType: 'task2',
        title: 'Chez le médecin',
        prompt: 'Vous ne vous sentez pas bien. Expliquez vos symptômes au médecin et posez des questions sur le traitement.',
        examinerQuestion: 'Bonjour, asseyez-vous. Qu\'est-ce qui ne va pas aujourd\'hui ?',
        keywords: ['mal', 'tête', 'fièvre', 'symptôme', 'médicament', 'ordonnance', 'repos', 'docteur'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-03',
        taskType: 'task2',
        title: 'À l\'hôtel',
        prompt: 'Vous arrivez dans un hôtel. Réservez une chambre, demandez les services disponibles et le prix.',
        examinerQuestion: 'Bonsoir, bienvenue à l\'hôtel Le Parisien. Comment puis-je vous aider ?',
        keywords: ['chambre', 'nuit', 'réservation', 'petit-déjeuner', 'prix', 'wifi', 'clé'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-04',
        taskType: 'task2',
        title: 'Au restaurant',
        prompt: 'Vous êtes au restaurant. Commandez un repas, demandez des recommandations et signalez une allergie alimentaire.',
        examinerQuestion: 'Bonsoir ! Voici le menu. Avez-vous choisi ou souhaitez-vous des suggestions ?',
        keywords: ['menu', 'plat', 'commander', 'allergie', 'dessert', 'boisson', 'addition', 'recommande'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-05',
        taskType: 'task2',
        title: 'À la banque',
        prompt: 'Vous voulez ouvrir un compte en banque. Demandez les types de comptes, les documents nécessaires et les frais.',
        examinerQuestion: 'Bonjour, bienvenue à la banque. En quoi puis-je vous aider aujourd\'hui ?',
        keywords: ['compte', 'ouvrir', 'carte', 'documents', 'frais', 'identité', 'virement'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-06',
        taskType: 'task2',
        title: 'Location d\'appartement',
        prompt: 'Vous cherchez un appartement à louer. Demandez des informations sur la taille, le loyer, les charges et la disponibilité.',
        examinerQuestion: 'Bonjour, vous appelez pour l\'annonce du logement. Que souhaitez-vous savoir ?',
        keywords: ['appartement', 'loyer', 'charges', 'pièces', 'disponible', 'meubles', 'quartier', 'bail'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-07',
        taskType: 'task2',
        title: 'Inscription à un cours',
        prompt: 'Vous voulez vous inscrire à un cours de français. Renseignez-vous sur les horaires, le prix et les niveaux.',
        examinerQuestion: 'Bonjour ! Vous souhaitez vous inscrire à un cours ? Je suis à votre disposition.',
        keywords: ['cours', 'inscription', 'horaire', 'niveau', 'prix', 'semaine', 'professeur', 'test'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-08',
        taskType: 'task2',
        title: 'Problème avec un achat',
        prompt: 'Vous avez acheté un produit défectueux. Expliquez le problème et demandez un remboursement ou un échange.',
        examinerQuestion: 'Bonjour, service client. Quel est le problème avec votre achat ?',
        keywords: ['produit', 'défectueux', 'remboursement', 'échange', 'reçu', 'marche', 'garantie'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-09',
        taskType: 'task2',
        title: 'À la poste',
        prompt: 'Vous devez envoyer un colis à l\'étranger. Demandez les tarifs, les délais et les options d\'envoi.',
        examinerQuestion: 'Bonjour, bienvenue à La Poste. Que souhaitez-vous envoyer ?',
        keywords: ['colis', 'envoyer', 'tarif', 'délai', 'recommandé', 'timbre', 'poids', 'adresse'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
    {
        id: 't2-10',
        taskType: 'task2',
        title: 'Agence de voyage',
        prompt: 'Vous voulez planifier un voyage en France. Demandez des informations sur les destinations, les prix et l\'hébergement.',
        examinerQuestion: 'Bonjour ! Bienvenue à l\'agence Voyages France. Où souhaitez-vous aller ?',
        keywords: ['voyage', 'destination', 'billet', 'hôtel', 'prix', 'avion', 'semaine', 'réserver'],
        expectedMinWords: 60,
        timeLimit: 210,
    },
];

// ─── TASK 3: Opinion (4.5 minutes) ──────────────────────────────────────
// The candidate must express and defend an opinion on a social topic.
export const task3Prompts: TCFPrompt[] = [
    {
        id: 't3-01',
        taskType: 'task3',
        title: 'Le télétravail',
        prompt: 'Le télétravail est-il une bonne chose pour les employés ? Donnez votre opinion avec des arguments et des exemples.',
        examinerQuestion: 'De plus en plus de personnes travaillent depuis chez elles. Pensez-vous que le télétravail est bénéfique ? Pourquoi ?',
        keywords: ['pense', 'opinion', 'avantage', 'inconvénient', 'travail', 'maison', 'productivité', 'équilibre', 'parce que', 'cependant'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-02',
        taskType: 'task3',
        title: 'Les réseaux sociaux',
        prompt: 'Les réseaux sociaux ont-ils un impact positif ou négatif sur la société ? Argumentez votre point de vue.',
        examinerQuestion: 'Quel est votre avis sur les réseaux sociaux ? Sont-ils plutôt positifs ou négatifs pour la société ?',
        keywords: ['réseaux sociaux', 'positif', 'négatif', 'communication', 'jeunes', 'danger', 'information', 'connecté', 'pense', 'opinion'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-03',
        taskType: 'task3',
        title: 'L\'éducation en ligne',
        prompt: 'L\'éducation en ligne peut-elle remplacer l\'éducation traditionnelle ? Donnez votre avis.',
        examinerQuestion: 'Pensez-vous que l\'éducation en ligne est aussi efficace que l\'éducation en classe ? Expliquez votre position.',
        keywords: ['éducation', 'en ligne', 'classe', 'professeur', 'étudiant', 'avantage', 'efficace', 'préfère', 'parce que'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-04',
        taskType: 'task3',
        title: 'L\'environnement',
        prompt: 'Que faut-il faire pour protéger l\'environnement ? Chacun peut-il agir à son niveau ?',
        examinerQuestion: 'La protection de l\'environnement est un sujet important. Selon vous, que peut faire chaque personne pour aider ?',
        keywords: ['environnement', 'pollution', 'recycler', 'énergie', 'nature', 'planète', 'chacun', 'responsable', 'important'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-05',
        taskType: 'task3',
        title: 'La technologie et les enfants',
        prompt: 'Les enfants utilisent de plus en plus la technologie. Est-ce positif pour leur développement ? Donnez votre avis.',
        examinerQuestion: 'Les enfants passent beaucoup de temps devant les écrans. Qu\'en pensez-vous ? Est-ce bon ou mauvais pour eux ?',
        keywords: ['enfants', 'technologie', 'écran', 'éducation', 'jouer', 'développement', 'limite', 'parents', 'positif', 'négatif'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-06',
        taskType: 'task3',
        title: 'Vivre en ville ou à la campagne',
        prompt: 'Est-il préférable de vivre en ville ou à la campagne ? Comparez et donnez votre préférence.',
        examinerQuestion: 'Préférez-vous vivre en ville ou à la campagne ? Quels sont les avantages et inconvénients de chacun ?',
        keywords: ['ville', 'campagne', 'avantage', 'inconvénient', 'calme', 'transport', 'nature', 'préfère', 'parce que'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-07',
        taskType: 'task3',
        title: 'L\'immigration',
        prompt: 'L\'immigration est un sujet complexe. Quels sont les aspects positifs et négatifs ?',
        examinerQuestion: 'L\'immigration est souvent dans l\'actualité. Quel est votre point de vue sur ce sujet ?',
        keywords: ['immigration', 'culture', 'diversité', 'travail', 'intégration', 'société', 'positif', 'difficulté', 'opinion'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-08',
        taskType: 'task3',
        title: 'Le transport public',
        prompt: 'Faut-il développer davantage les transports en commun ? Discutez de ses avantages.',
        examinerQuestion: 'Pensez-vous que les transports en commun devraient être développés davantage ? Pourquoi ou pourquoi pas ?',
        keywords: ['transport', 'commun', 'bus', 'métro', 'voiture', 'pollution', 'gratuit', 'développer', 'avantage'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-09',
        taskType: 'task3',
        title: 'L\'âge de la retraite',
        prompt: 'Doit-on repousser l\'âge de la retraite ? Donnez votre opinion et justifiez-la.',
        examinerQuestion: 'Dans beaucoup de pays, on augmente l\'âge de la retraite. Qu\'en pensez-vous ? Est-ce juste ?',
        keywords: ['retraite', 'âge', 'travailler', 'santé', 'jeunes', 'emploi', 'gouvernement', 'juste', 'pense', 'opinion'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
    {
        id: 't3-10',
        taskType: 'task3',
        title: 'L\'alimentation bio',
        prompt: 'Manger bio est-il vraiment meilleur pour la santé ? Partagez votre opinion.',
        examinerQuestion: 'De plus en plus de personnes achètent des produits bio. Pensez-vous que c\'est vraiment mieux ?',
        keywords: ['bio', 'santé', 'alimentation', 'naturel', 'cher', 'pesticide', 'qualité', 'pense', 'meilleur'],
        expectedMinWords: 80,
        timeLimit: 270,
    },
];

// ─── Utility: get all prompts ──────────────────────────────────────────
export const allPrompts: TCFPrompt[] = [...task1Prompts, ...task2Prompts, ...task3Prompts];

export function getRandomPrompt(taskType: 'task1' | 'task2' | 'task3'): TCFPrompt {
    const pool = taskType === 'task1' ? task1Prompts : taskType === 'task2' ? task2Prompts : task3Prompts;
    return pool[Math.floor(Math.random() * pool.length)];
}

export function getPromptById(id: string): TCFPrompt | undefined {
    return allPrompts.find((p) => p.id === id);
}

export const TASK_LABELS: Record<string, string> = {
    task1: 'Tâche 1 — Interaction personnelle',
    task2: 'Tâche 2 — Jeu de rôle',
    task3: 'Tâche 3 — Opinion',
};

export const TASK_DESCRIPTIONS: Record<string, string> = {
    task1: 'Answer personal questions about yourself, your life, hobbies, and routines.',
    task2: 'Role-play a situation: ask for information, solve a problem, or make a request.',
    task3: 'Express and defend your opinion on a social or cultural topic.',
};

export const TASK_TIME_LABELS: Record<string, string> = {
    task1: '2 minutes',
    task2: '3 min 30 sec',
    task3: '4 min 30 sec',
};
