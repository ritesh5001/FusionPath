'use client'

import { format } from "path" // Unused import
import { Checkbox } from "@/components/ui/checkbox"
import { toggleTask } from "@/actions/updateProgress"
import { useTransition } from "react"

interface QuestionRowProps {
    question: {
        _id: string; // Since it's passed from server component after plain obj conversion or just needs ID
        questionId?: string; // It could be _id or we use questionId if related to progress
        // We'll use the question's actual _id from the questions collection
        title: string;
        link: string;
        topic: string;
        day: number;
        completed: boolean;
    }
}

export function QuestionRow({ question }: QuestionRowProps) {
    const [isPending, startTransition] = useTransition()

    return (
        <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100 mb-2">
            <div className="flex items-center gap-4">
                <Checkbox
                    id={question._id}
                    checked={question.completed}
                    onCheckedChange={(checked) => {
                        startTransition(() => {
                            toggleTask(question._id, checked === true)
                        })
                    }}
                    disabled={isPending}
                    className="h-5 w-5"
                />
                <div className="flex flex-col">
                    <a
                        href={question.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`font-medium hover:underline ${question.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}
                    >
                        {question.title}
                    </a>
                    <span className="text-xs text-gray-500">{question.topic}</span>
                </div>
            </div>

            {question.completed && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Done
                </span>
            )}
        </div>
    )
}
