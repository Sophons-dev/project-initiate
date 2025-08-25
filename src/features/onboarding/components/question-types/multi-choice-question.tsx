import { Question } from '@/features/onboarding/types/question';

interface MultiChoiceQuestionProps {
  question: Question;
  value: string | string[];
  onChange: (value: string[]) => void;
}

export function MultiChoiceQuestion({
  question,
  value,
  onChange,
}: MultiChoiceQuestionProps) {
  const handleCheckboxChange = (option: string) => {
    const newValue = [...value];
    const index = newValue.indexOf(option);

    if (index > -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option);
    }

    onChange(newValue);
  };

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
              type='checkbox'
              name={question.id}
              value={option}
              checked={value.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className='mr-4'
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
