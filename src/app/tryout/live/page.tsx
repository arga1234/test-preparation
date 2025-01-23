'use client';

import { QuestionGrid, Question, Timer, ButtonComponent } from '@/components';
import { ModuleContainer } from '@/module';
import { IQuestion, QuestionCollection } from '@/module/question';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
const TryoutLivePage = () => {
  //states
  const [quesctionCollection, setQuesctionCollection] =
    useState<QuestionCollection>();
  const [question, setQuestion] = useState<IQuestion>();
  const [testId, setTestId] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const searchParam = useSearchParams();

  //memo
  const { dummyQuestionController } = useMemo(() => {
    return new ModuleContainer().questionContainer;
  }, []);

  //methods
  const onOptionSelect = useCallback(
    (optionId: string) => {
      if (quesctionCollection) {
        const qc = quesctionCollection.updateCollection({
          index: selectedIndex,
          selectedOption: optionId,
          status: 'answered',
          testId,
        });
        setQuesctionCollection(qc);
        setQuestion(qc.getByIndex(selectedIndex));
      }
    },
    [quesctionCollection, testId, selectedIndex],
  );
  const onQuestionClick = useCallback(
    (index?: number) => {
      if (quesctionCollection) {
        const qc = quesctionCollection.activateSelectedQuestion(
          index ? index : 0,
        );
        const q = qc.getByIndex(index ? index : 0);
        const duration = localStorage.getItem(`${testId}-duration`);
        setQuesctionCollection(
          qc.updateCollection({
            index: selectedIndex, // selectedIndex should be the previous index incase to update the previous question duration
            duration,
            testId,
          }),
        );
        setQuestion(q);
        setSelectedIndex(index);
      }
    },
    [quesctionCollection, selectedIndex, testId],
  );
  const onQuestionCollectionRequest = useCallback(() => {
    if (testId) {
      dummyQuestionController()
        .getQuestionCollection(testId)
        .then((res) => {
          setQuesctionCollection(res);
        });
    }
  }, [dummyQuestionController, testId]);

  //useEffect
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const x = searchParam.get('testId');
    setTestId(x ? x : undefined);
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
          <Question
            questionNumber={question.number}
            category={question.category}
            questionText={question.question}
            options={question.option}
            selectedOptionId={question.selectedOption}
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
