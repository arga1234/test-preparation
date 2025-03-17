'use client';

import { QuestionGrid, Question, Timer, ButtonComponent } from '@/components';
import React from 'react';
import { usePage } from './usePage';
const TryoutLivePage = () => {
  const {
    onOptionSelect,
    onQuestionClick,
    quesctionCollection,
    question,
    testId,
    selectedIndex,
  } = usePage();

  return (
    quesctionCollection &&
    question &&
    testId && (
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
          gap: '10px',
          padding: '10px',
        }}
      >
        <div style={{ width: '100%' }} className="flex-column">
          <Question
            testId={testId}
            question={question}
            onOptionSelect={onOptionSelect}
          />
          <div
            style={{
              marginTop: '10px',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '10px',
            }}
            className="flex-row"
          >
            <ButtonComponent
              text="sebelumnya"
              className="primary"
              disabled={selectedIndex === 0 ? true : false}
              onClick={() => {
                onQuestionClick(
                  question.number ? question.number - 2 : undefined,
                );
              }}
            />
            <ButtonComponent
              text="selanjutnya"
              className="primary"
              disabled={
                selectedIndex === quesctionCollection.questions.length - 1
                  ? true
                  : false
              }
              onClick={() => {
                onQuestionClick(question.number);
              }}
            />
          </div>
        </div>

        <div className="flex-column">
          <div
            className="flex-row"
            style={{ flexWrap: 'nowrap', gap: '5px', marginBottom: '10px' }}
          >
            <Timer
              id={question.id}
              initialTime={question.duration || 0}
              mode="countUp"
              label="Lama Pengerjaan"
              storageKey={`${testId}-duration`}
            />
            <Timer
              id={question.id}
              initialTime={5000}
              mode="countDown"
              label="Sisa Waktu"
              storageKey={`${testId}-sisa-waktu`}
            />
          </div>
          <ButtonComponent
            style={{ marginBottom: '10px' }}
            text="Akhiri Pengerjaan"
            className="primary"
            onClick={() => {
              onQuestionClick(question.number);
            }}
          />
          <QuestionGrid
            questions={quesctionCollection.questions}
            onQuestionClick={onQuestionClick}
          />
        </div>
      </div>
    )
  );
};

export default React.memo(TryoutLivePage);
