import { IQuestion } from '../dto';
import { QuestionCollection } from '../entity';

export interface IQuestionUsecase {
  onQuestionClick: (
    previousIndex?: number,
    testId?: string,
    quesctionCollection?: QuestionCollection,
    selectedIndex?: number,
  ) => Promise<{ qc: QuestionCollection; q: IQuestion | undefined }>;
  onOptionSelect: (
    optionId: string,
    qc?: QuestionCollection,
    selectedIndex?: number,
    testId?: string,
  ) => Promise<{
    qc: QuestionCollection;
    q: IQuestion | undefined;
  }>;
}

export class QuestionUsecase implements IQuestionUsecase {
  onOptionSelect = async (
    optionId: string,
    qc?: QuestionCollection,
    selectedIndex?: number,
    testId?: string,
  ) => {
    if (qc) {
      const x = qc.updateCollection({
        index: selectedIndex,
        selectedOption: optionId,
        status: 'answered',
        testId,
      });

      return {
        qc: x,
        q: x.getByIndex(selectedIndex),
      };
    }

    throw new Error('Internal server error');
  };
  onQuestionClick = async (
    previousIndex?: number,
    testId?: string,
    quesctionCollection?: QuestionCollection,
    selectedIndex?: number,
  ) => {
    if (quesctionCollection && testId) {
      const qc = quesctionCollection.activateSelectedQuestion(
        selectedIndex ? selectedIndex : 0,
      );
      const q = qc.getByIndex(selectedIndex ? selectedIndex : 0);
      const duration = localStorage.getItem(`${testId}-duration`);
      const updatedCollection = qc.updateCollection(
        {
          index: previousIndex || 0, // selectedIndex should be the previous index incase to update the previous question duration
          duration,
          testId,
        },
        true,
      );

      return {
        q,
        qc: updatedCollection,
      };
    }

    throw new Error('Internal server error');
  };
}
