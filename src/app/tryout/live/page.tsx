'use client';

import { QuestionGrid, Question } from '@/components';
import { ModuleContainer } from '@/module';
import {
  IQuestion,
  IQuestionStatus,
  QuestionCollection,
} from '@/module/question';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ButtonComponent from '@/components/Button.component';
const TryoutLivePage = () => {
  //states
  const [quesctionCollection, setQuesctionCollection] =
    useState<QuestionCollection>();
  const [question, setQuestion] = useState<IQuestion>();
  const [testId, setTestId] = useState<string>();
  const searchParam = useSearchParams();

  //memo
  const { dummyQuestionController } = useMemo(() => {
    return new ModuleContainer().questionContainer;
  }, []);

  //methods
  const onOptionSelect = useCallback(
    (optionId: string) => {
      if (quesctionCollection && question && testId) {
        const q = {
          ...question,
          selectedOption: optionId,
          status: 'answered' as IQuestionStatus,
        };
        setQuesctionCollection(quesctionCollection.updateCollection(q, testId));
        setQuestion(q);
      }
    },
    [quesctionCollection, question, testId],
  );
  const onQuestionClick = useCallback(
    (index: number) => {
      if (quesctionCollection) {
        const qc = quesctionCollection.activateSelectedQuestion(index);
        setQuesctionCollection(qc);
        const q = qc.getByIndex(index);
        setQuestion(q);
      }
    },
    [quesctionCollection],
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
      const q = qs.getByIndex(0);
      setQuestion(q);
    }
  }, [question, quesctionCollection]);

  return (
    quesctionCollection &&
    question && (
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
              onClick={() => {
                //
              }}
            />
            <ButtonComponent
              text="selanjutnya"
              className="primary"
              onClick={() => {
                //
              }}
            />
          </div>
        </div>

        <QuestionGrid
          questions={quesctionCollection.questions}
          onQuestionClick={onQuestionClick}
        />
      </div>
    )
  );
};

export default React.memo(TryoutLivePage);
