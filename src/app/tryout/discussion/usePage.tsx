import { ModuleContainer } from '@/module';
import { IQuestion, QuestionCollection } from '@/module/question';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const usePage = () => {
  //state
  const [quesctionCollection, setQuesctionCollection] =
    useState<QuestionCollection>();
  const [question, setQuestion] = useState<IQuestion>();
  const [testId, setTestId] = useState<string>();
  const [tryId, setTryId] = useState<string>();
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const searchParam = useSearchParams();

  //memo
  const { tryoutContainer, questionContainer } = useMemo(() => {
    return new ModuleContainer();
  }, []);

  //methods
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
    if (testId && tryId) {
      tryoutContainer
        .tryoutController()
        .getTryoutAnswerByTryId(testId, tryId)
        .then((res) => {
          setQuesctionCollection(res);
        });
    }
  }, [tryoutContainer, testId, tryId]);

  const getSearchParams = useCallback(() => {
    const testId = searchParam.get('testId');
    const tryId = searchParam.get('tryId');
    setTestId(testId || undefined);
    setTryId(tryId || undefined);
  }, [searchParam]);

  const setQuestionCollection = useCallback(() => {
    if (question === undefined && quesctionCollection) {
      const qs = quesctionCollection.activateSelectedQuestion(0);
      setQuesctionCollection(qs);
      setQuestion(qs.getByIndex(selectedIndex));
    }
  }, [quesctionCollection, question, selectedIndex]);

  //hooks
  useEffect(() => {
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    getSearchParams();
  }, [getSearchParams]);

  useEffect(() => {
    onQuestionCollectionRequest();
  }, [onQuestionCollectionRequest]);

  useEffect(() => {
    setQuestionCollection();
  }, [setQuestionCollection]);
  return {
    onQuestionClick,
    testId,
    tryId,
    quesctionCollection,
    question,
    selectedIndex,
  };
};
