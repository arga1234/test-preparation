'use client';

import { QuestionGrid, Question, Timer, ButtonComponent } from '@/components';
import React from 'react';
import { usePage } from './usePage';

const DiscussionPage = () => {
  const {
    onQuestionClick,
    testId,
    quesctionCollection,
    question,
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
          <Question isDiscussion testId={testId} question={question} />
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
          <div style={{ marginBottom: '10px' }}>
            <Timer
              id={question.id}
              initialTime={question.duration || 0}
              mode="stay"
              label="Lama Pengerjaan"
              storageKey={`${testId}-duration`}
            />
          </div>
          <QuestionGrid
            isDiscussion
            questions={quesctionCollection.questions}
            onQuestionClick={onQuestionClick}
          />
        </div>
      </div>
    )
  );
};

export default React.memo(DiscussionPage);
