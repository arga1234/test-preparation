'use client';

import React from 'react';
import '../css/Question.css';
import ButtonComponent from './Button.component';

interface QuestionProps {
  questionNumber: number;
  category: string;
  questionText: string;
  options: { id: string; text: string; points?: number }[];
  selectedOptionId: string;
  explanation: string;
  onOptionSelect: (optionId: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  questionNumber,
  category,
  questionText,
  options,
  selectedOptionId,
  explanation,
  onOptionSelect,
}) => {
  return (
    <div className="question-card">
      <div className="flex-row center-between">
        <div className="flex-row center-start">
          <h4>Soal No {questionNumber}</h4>
          <p>{category}</p>
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
          <li key={option.id}>
            <button
              className={
                selectedOptionId === option.id ? 'selected-option' : 'option'
              }
              onClick={() => onOptionSelect(option.id)}
            >
              {option.text}
            </button>
            {selectedOptionId === option.id && (
              <span className="points">{option.points} Poin</span>
            )}
          </li>
        ))}
      </ul>
      <div className="explanation">
        <strong>Pembahasan:</strong>
        <p>{explanation}</p>
      </div>
    </div>
  );
};

export default React.memo(Question);
