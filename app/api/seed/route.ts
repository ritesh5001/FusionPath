
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Question from '@/models/Question';
import { QUESTIONS } from '@/lib/data';

export async function GET() {
    try {
        await dbConnect();

        // Check if questions already exist
        const count = await Question.countDocuments();
        if (count > 0) {
            return NextResponse.json({ message: 'Questions already seeded', count });
        }

        // Insert questions
        await Question.insertMany(QUESTIONS);

        return NextResponse.json({ message: 'Database seeded successfully', count: QUESTIONS.length });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
