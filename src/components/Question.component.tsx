'use client';

import React, { useCallback } from 'react';
import '../css/Question.css';
import ButtonComponent from './Button.component';
import LabelComponent from './Label.component';

interface QuestionProps {
  questionNumber: number;
  category: string;
  questionText: string;
  options: { id: string; text: string; points?: number }[];
  selectedOptionId?: string;
  explanation: string;
  correctOptionId?: string;
  isDiscussion?: boolean;
  onOptionSelect: (optionId: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionNumber,
  category,
  questionText,
  options,
  selectedOptionId,
  explanation,
  isDiscussion,
  correctOptionId,
  onOptionSelect,
}) => {
  const optionClass = useCallback(
    (optionId: string) => {
      if (
        selectedOptionId === optionId &&
        selectedOptionId !== correctOptionId &&
        isDiscussion
      ) {
        return 'incorrect-option';
      } else if (optionId === correctOptionId && isDiscussion) {
        return 'selected-option';
      } else if (selectedOptionId === optionId) {
        return 'selected-option';
      } else {
        return 'option bg-grey-1 border-1';
      }
    },
    [selectedOptionId, isDiscussion, correctOptionId],
  );
  return (
    <div className="bg-white question-card">
      <div className="flex-row center-between">
        <div className="flex-row center-start">
          <h4 style={{ marginRight: '10px' }}>Soal No {questionNumber}</h4>
          <LabelComponent primary text={category} />
        </div>
        <ButtonComponent
          className="danger"
          text="Laporkan Soal"
          onClick={() => {
            //
          }}
        />
      </div>
      <p>{questionText}</p>
      <ul>
        {options.map((option) => (
          <li className="flex-row center-start" key={option.id}>
            <button
              style={{
                flexGrow: 1,
                textAlign: 'left',
              }}
              className={optionClass(option.id)}
              onClick={() => onOptionSelect(option.id)}
            >
              {option.text}
            </button>
            {option.points !== undefined && isDiscussion && (
              <span className="points">{option.points} Poin</span>
            )}
          </li>
        ))}
      </ul>
      {isDiscussion && (
        <div className="bg-grey-1 border-1 explanation">
          <strong>Pembahasan:</strong>
          <div dangerouslySetInnerHTML={{ __html: explanation }} />
        </div>
      )}
    </div>
  );
};

export default React.memo(Question);
