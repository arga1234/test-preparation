'use client';

import { QuestionGrid, Question, Timer, ButtonComponent } from '@/components';
import { ModuleContainer } from '@/module';
import { IQuestion, QuestionCollection } from '@/module/question';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const DiscussionPage = () => {
  //states
  const [quesctionCollection, setQuesctionCollection] =
    useState<QuestionCollection>();
  const [question, setQuestion] = useState<IQuestion>();
  const [testId, setTestId] = useState<string>();
  const [tryId, setTryId] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const searchParam = useSearchParams();

  //memo
  const { tryoutController } = useMemo(() => {
    return new ModuleContainer().tryoutContainer;
  }, []);

  //methods
  const onQuestionClick = useCallback(
    (index?: number) => {
      if (quesctionCollection) {
        const qc = quesctionCollection.activateSelectedQuestion(
          index ? index : 0,
        );
        const q = qc.getByIndex(index ? index : 0);
        const duration = localStorage.getItem(`${testId}-duration`);
        setQuesctionCollection(
          qc.updateCollection(
            {
              index: selectedIndex, // selectedIndex should be the previous index incase to update the previous question duration
              duration,
              testId,
            },
            true,
          ),
        );
        setQuestion(q);
        setSelectedIndex(index);
      }
    },
    [quesctionCollection, selectedIndex, testId],
  );
  const onQuestionCollectionRequest = useCallback(() => {
    if (testId && tryId) {
      tryoutController()
        .getTryoutAnswerByTryId(testId, tryId)
        .then((res) => {
          setQuesctionCollection(res);
        });
    }
  }, [tryoutController, testId, tryId]);

  //useEffect
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const testId = searchParam.get('testId');
    const tryId = searchParam.get('tryId');
    setTestId(testId || undefined);
    setTryId(tryId || undefined);
  }, [searchParam]);

  useEffect(() => {
    onQuestionCollectionRequest();
  }, [onQuestionCollectionRequest]);

  useEffect(() => {
    if (question === undefined && quesctionCollection) {
      const qs = quesctionCollection.activateSelectedQuestion(0);
      setQuesctionCollection(qs);
      setQuestion(qs.getByIndex(selectedIndex));
    }
  }, [question, quesctionCollection, selectedIndex]);

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
