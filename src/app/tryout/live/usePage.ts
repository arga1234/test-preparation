import { ModuleContainer } from '@/module';
import { IQuestion, QuestionCollection } from '@/module/question';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const usePage = () => {
  //states
  const [quesctionCollection, setQuesctionCollection] =
    useState<QuestionCollection>();
  const [question, setQuestion] = useState<IQuestion>();
  const [testId, setTestId] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const searchParam = useSearchParams();

  //memo
  const { tryoutContainer, questionContainer } = useMemo(() => {
    return new ModuleContainer();
  }, []);

  //methods
  const onOptionSelect = useCallback(
    (optionId: string) => {
      questionContainer
        .questionController()
        .onOptionClick(optionId, quesctionCollection, selectedIndex, testId)
        .then(({ q, qc }) => {
          setQuesctionCollection(qc);
          setQuestion(q);
        });
    },
    [questionContainer, quesctionCollection, selectedIndex, testId],
  );
  const onQuestionClick = useCallback(
    (index?: number) => {
      questionContainer
        .questionController()
        .onQuestionClick(selectedIndex, testId, quesctionCollection, index)
        .then(({ q, qc }) => {
          setQuesctionCollection(qc);
          setQuestion(q);
          setSelectedIndex(index);
        });
    },
    [quesctionCollection, questionContainer, selectedIndex, testId],
  );
  const onQuestionCollectionRequest = useCallback(() => {
    if (testId) {
      tryoutContainer
        .tryoutController()
        .getTryoutTest(testId)
        .then((res) => {
          setQuesctionCollection(res);
        });
    }
  }, [tryoutContainer, testId]);

  //hooks
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

  return {
    onOptionSelect,
    onQuestionClick,
    quesctionCollection,
    question,
    testId,
    selectedIndex,
  };
};
