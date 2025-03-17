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
  const { tryoutController } = useMemo(() => {
    return new ModuleContainer().tryoutContainer;
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
      tryoutController()
        .getTryoutTest(testId)
        .then((res) => {
          setQuesctionCollection(res);
        });
    }
  }, [tryoutController, testId]);

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
