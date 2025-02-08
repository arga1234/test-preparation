'use client';

import React, { useCallback, useState } from 'react';
import { LabelComponent } from './Label.component';
import { DialogButton } from './DialogButton.component';
import { IQuestion } from '@/module/question';
import '../css/Question.css';

interface QuestionProps {
  isDiscussion?: boolean;
  onOptionSelect?: (optionId: string) => void;
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
            <h4 className="mr-10">Soal No {questionNumber}</h4>
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
              className="input-text"
              placeholder="Pesan"
              value={reportMessage}
              onChange={(event) => setReportMessage(event.target.value)}
            />
          </DialogButton>
        </div>
        <div dangerouslySetInnerHTML={{ __html: questionText }} />
        {/* <p>{questionText}</p> */}
        <ul>
          {options.map((option) => (
            <li className="flex-row center-start" key={option.id}>
              <button
                style={{
                  flexGrow: 1,
                  textAlign: 'left',
                }}
                className={optionClass(option.id)}
                onClick={() =>
                  onOptionSelect
                    ? onOptionSelect(option.id)
                    : () => {
                        return;
                      }
                }
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
            <div
              className="mt-10"
              dangerouslySetInnerHTML={{ __html: explanation }}
            />
          </div>
        )}
      </div>
    );
  },
);

export { Question };
