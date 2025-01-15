'use client';

import QuestionComponent from '@/components/Question.component';
import QuestionGridComponent from '@/components/QuestionGrid.component';
import { ModuleContainer } from '@/module';
import { IQuestion, QuestionItemList } from '@/module/question';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const TryoutLivePage = () => {
  //states
  const [selectedOptionId, setSelectedOptionId] = useState<string>();
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setQuestion] = useState<IQuestion>();
  const [questions, setQuestions] = useState<QuestionItemList[]>();
  const [questionDiscussion, setQuestionDiscussion] = useState();

  //memo
  const { dummyQuestionController } = useMemo(() => {
    return new ModuleContainer().questionContainer;
  }, []);

  //methods
  const onOptionSelect = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
  }, []);
  const onQuestionByIdRequest = useCallback(
    (id: string) => {
      dummyQuestionController()
        .getQuestionById(id)
        .then((res) => {
          setQuestion(res);
        });
    },
    [dummyQuestionController],
  );
  const onQuestionClick = useCallback(
    (id: string, index: number) => {
      const x: QuestionItemList[] = questions
        ? questions.map((el) => {
            if (el.id === id) {
              return { ...el, status: 'active' };
            }

            return { ...el, status: 'unanswered' };
          })
        : [];
      setQuestionNumber(index);
      setQuestions(x);
      onQuestionByIdRequest(id);
    },
    [onQuestionByIdRequest, questions],
  );
  const onQuestionListRequest = useCallback(() => {
    dummyQuestionController()
      .getQuestionList()
      .then((res) => {
        setQuestions(res);
      });
  }, [dummyQuestionController]);

  //useEffect

  //get question list sekali pada saat pertama diload
  useEffect(() => {
    onQuestionListRequest();
  }, []);
  //get question no.1 ketika question list udah tersedia
  useEffect(() => {
    if (questions && question === undefined) {
      onQuestionByIdRequest(questions[0].id);
    }
  }, [questions, question, onQuestionByIdRequest]);

  return (
    <div
      style={{
        margin: '10px',
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'flex-start',
      }}
    >
      {question && questions && (
        <>
          <QuestionComponent
            questionNumber={questionNumber}
            category={question.category}
            questionText={question.question}
            options={question.option}
            onOptionSelect={onOptionSelect}
            selectedOptionId={selectedOptionId}
          />
          <QuestionGridComponent
            questions={questions}
            onQuestionClick={onQuestionClick}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(TryoutLivePage);
