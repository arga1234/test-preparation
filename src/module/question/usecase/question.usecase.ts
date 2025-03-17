import { IQuestion } from '../dto';
import { QuestionCollection } from '../entity';

export interface IQuestionUsecase {
  onQuestionClick: (
    previousIndex?: number,
    testId?: string,
    quesctionCollection?: QuestionCollection,
    selectedIndex?: number,
  ) => Promise<{ qc: QuestionCollection; q: IQuestion | undefined }>;
}

export class QuestionUsecase implements IQuestionUsecase {
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
