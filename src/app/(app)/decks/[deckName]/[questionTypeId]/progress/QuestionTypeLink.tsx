import React from 'react';
import { questionTypeIdToQuestionTypeDisplayName } from '@lib/utils/utils';
import Link from 'next/link';

type Props = {
  questionTypeId: number;
  currentQuestionTypeId: number;
  icon: React.ReactNode;
  deckName: DeckRecord['name'];
};

export default function QuestionTypeLink({
  questionTypeId,
  currentQuestionTypeId,
  icon,
  deckName,
}: Readonly<Props>) {
  return (
    <Link
      href={`/decks/${deckName}/${questionTypeId}/progress`}
      className={`group flex items-center gap-2 border-b hover:border-gray-50 ${currentQuestionTypeId === questionTypeId ? 'border-gray-300' : 'border-gray-600'}`}
    >
      {icon}
      <span
        className={`text-lg text-gray-200 group-hover:text-white ${currentQuestionTypeId === questionTypeId ? 'text-white' : ''}`}
      >
        {questionTypeIdToQuestionTypeDisplayName(
          questionTypeId as Question['questionTypeId'],
        )}
      </span>
    </Link>
  );
}
