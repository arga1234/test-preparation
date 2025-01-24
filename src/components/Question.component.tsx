'use client';

import React, { useCallback, useState } from 'react';
import '../css/Question.css';
import { LabelComponent } from './Label.component';
import { DialogButton } from './DialogButton.component';
import { IQuestion } from '@/module/question';

interface QuestionProps {
  isDiscussion?: boolean;
  onOptionSelect: (optionId: string) => void;
  question: IQuestion;
  testId: string;
  onReport?: (testId: string, questionId: string) => Promise<void>;
}

const Question: React.FC<QuestionProps> = React.memo(
  ({ isDiscussion, question, testId, onOptionSelect, onReport }) => {
    //props
    const {
      question: questionText,
      number: questionNumber,
      category,
      option: options,
      selectedOption: selectedOptionId,
      correctOption: correctOptionId,
      explanation,
      id: questionId,
    } = question;

    //state
    const [reportMessage, setReportMessage] = useState<string>();

    //methods
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
    const onReportSubmit = useCallback(() => {
      if (onReport) {
        // loading true
        onReport(questionId, testId)
          .then(() => {
            // success alert
          })
          .catch(() => {
            // error alert
          })
          .finally(() => {
            // loading false
          });
      }
    }, [onReport, questionId, testId]);
    return (
      <div className="bg-white question-card">
        <div className="flex-row center-between">
          <div className="flex-row center-start">
            <h4 style={{ marginRight: '10px' }}>Soal No {questionNumber}</h4>
            <LabelComponent primary text={category} />
          </div>
          <DialogButton
            dialogTitle="Laporkan Soal"
            buttonClassName="danger"
            label={'Laporkan'}
            onSubmit={onReportSubmit}
          >
            <input
              type="text"
              style={{
                width: '100%',
                padding: '10px',
                border: 'none',
                backgroundColor: '#eee',
                borderRadius: '5px',
                outline: 'none',
              }}
              placeholder="Pesan"
              value={reportMessage}
              onChange={(event) => setReportMessage(event.target.value)}
            />
          </DialogButton>
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
        {isDiscussion && explanation && (
          <div className="bg-grey-1 border-1 explanation">
            <strong>Pembahasan:</strong>
            <div dangerouslySetInnerHTML={{ __html: explanation }} />
          </div>
        )}
      </div>
    );
  },
);

export { Question };
