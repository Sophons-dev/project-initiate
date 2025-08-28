import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const questions = [
  // Student Questions
  {
    text: 'Which activities sound most fun to you?',
    type: 'multi_choice' as const,
    options: [
      'Designing or creating something new',
      'Solving puzzles, fixing gadgets, or coding',
      'Leading projects or persuading others',
      'Helping friends or teaching others',
      'Organizing schedules or data',
    ],
    targetField: 'interests',
    userTypes: ['student'] as const,
    order: 1,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: 'Which school subjects do you enjoy most?',
    type: 'multi_choice' as const,
    options: [
      'Arts / Literature',
      'Math / Science',
      'Social Studies / Leadership activities',
      'PE / Volunteering / Helping roles',
      'Business / Economics',
    ],
    targetField: 'interests',
    userTypes: ['student'] as const,
    order: 2,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: 'What kind of skills do you feel most confident in?',
    type: 'multi_choice' as const,
    options: [
      'Creativity / Expression',
      'Problem-solving / Analysis',
      'Communication / Leadership',
      'Caring / Mentoring',
      'Organization / Planning',
    ],
    targetField: 'skills',
    userTypes: ['student'] as const,
    order: 3,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: "What's most important for your future career?",
    type: 'single_choice' as const,
    options: [
      'High salary',
      'Job stability',
      'Creativity and freedom',
      'Helping others / Making impact',
      'Prestige / Recognition',
    ],
    targetField: 'career_goals',
    userTypes: ['student'] as const,
    order: 4,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: 'How do you like to learn best?',
    type: 'single_choice' as const,
    options: [
      'Trying it myself first',
      'Working with classmates / mentors',
      'Watching examples then copying',
      'Following clear step-by-step instructions',
    ],
    targetField: 'learning_style',
    userTypes: ['student'] as const,
    order: 5,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: "In the next 5 years, I'd like to…",
    type: 'single_choice' as const,
    options: [
      'Start a business or project',
      'Get a stable job right after graduation',
      'Take more studies / certifications',
      'Explore different paths until I find my fit',
    ],
    targetField: 'career_aspirations',
    userTypes: ['student'] as const,
    order: 6,
    isActive: true,
    stage: 'onboarding' as const,
  },

  // Professional Questions
  {
    text: 'Which part of your current work do you enjoy most?',
    type: 'multi_choice' as const,
    options: [
      'Creating / designing ideas',
      'Solving problems with tools or data',
      'Leading teams / making decisions',
      'Supporting others / customer service',
      'Organizing / streamlining processes',
    ],
    targetField: 'work_enjoyment',
    userTypes: ['professional'] as const,
    order: 1,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: 'Which part feels least "you"?',
    type: 'multi_choice' as const,
    options: [
      'Routine / repetitive work',
      'Technical tasks',
      'Leadership roles',
      'People-facing tasks',
      'Creative work',
    ],
    targetField: 'work_dislikes',
    userTypes: ['professional'] as const,
    order: 2,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: 'What motivates you most now?',
    type: 'single_choice' as const,
    options: [
      'Higher income',
      'Work-life balance',
      'Learning and growth',
      'Social impact / purpose',
      'Prestige / recognition',
    ],
    targetField: 'motivation',
    userTypes: ['professional'] as const,
    order: 3,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: 'What environment do you prefer?',
    type: 'single_choice' as const,
    options: [
      'Independent work',
      'Team collaboration',
      'Leadership & decision-making',
      'Research and analysis',
      'Helping/support roles',
    ],
    targetField: 'work_environment',
    userTypes: ['professional'] as const,
    order: 4,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: 'Which skill would you most like to strengthen?',
    type: 'multi_choice' as const,
    options: [
      'Technical / digital',
      'Communication / leadership',
      'Creativity / innovation',
      'People / service skills',
      'Organization / management',
    ],
    targetField: 'skill_development',
    userTypes: ['professional'] as const,
    order: 5,
    isActive: true,
    stage: 'onboarding' as const,
  },
  {
    text: "In the next 2–3 years, I'd like to…",
    type: 'single_choice' as const,
    options: [
      'Shift careers completely',
      'Move up in my current field',
      'Start my own venture',
      'Pursue further studies or certifications',
      'Explore options until I find a good fit',
    ],
    targetField: 'future_aspirations',
    userTypes: ['professional'] as const,
    order: 6,
    isActive: true,
    stage: 'onboarding' as const,
  },
];

export async function seedQuestions() {
  console.log('🌱 Seeding questions...');

  try {
    await prisma.question.deleteMany({});
    console.log('🗑️  Cleared existing questions');

    const createdQuestions = await Promise.all(
      questions.map(async question => {
        return await prisma.question.create({
          data: {
            ...question,
            options: [...question.options],
            userTypes: [...question.userTypes],
          },
        });
      })
    );

    console.log(`✅ Created ${createdQuestions.length} questions`);

    // Log summary by user type
    const studentQuestions = createdQuestions.filter(q =>
      q.userTypes.includes('student')
    );
    const professionalQuestions = createdQuestions.filter(q =>
      q.userTypes.includes('professional')
    );

    console.log(`📚 Student questions: ${studentQuestions.length}`);
    console.log(`💼 Professional questions: ${professionalQuestions.length}`);

    return createdQuestions;
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    throw error;
  }
}
