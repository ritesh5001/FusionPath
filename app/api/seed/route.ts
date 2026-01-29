
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Question from '@/models/Question';
import { QUESTIONS } from '@/lib/data';

export async function GET() {
    try {
        await dbConnect();

        // Delete existing questions and reseed (for updating to new data)
        await Question.deleteMany({});

        // Insert questions
        await Question.insertMany(QUESTIONS);

        return NextResponse.json({ 
            message: 'Database seeded successfully with Top 100 LeetCode Questions', 
            count: QUESTIONS.length 
        });
    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({ error: 'Failed to seed database' }, { status: 500 });
    }
}
