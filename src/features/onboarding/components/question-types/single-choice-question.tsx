import { Question } from '@/features/onboarding/types';

interface SingleChoiceQuestionProps {
  question: Question;
  value: string | string[];
  onChange: (value: string) => void;
}

export function SingleChoiceQuestion({
  question,
  value,
  onChange,
}: SingleChoiceQuestionProps) {
  return (
    <div>
      <h3 className='font-semibold text-lg mb-4'>{question.question_text}</h3>
      <div className='space-y-2'>
        {question.options?.map(option => (
          <label
            key={option}
            className='flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50'
          >
            <input
              type='radio'
              name={question.id}
              value={option}
              checked={value === option}
              onChange={e => onChange(e.target.value)}
              className='mr-4'
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
