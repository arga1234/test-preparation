import { QuestionCollection } from '../entity';
import { IQuestionUsecase } from '../usecase';

export class QuestionController {
  constructor(private uc: IQuestionUsecase) {}
  onQuestionClick = (
    previuosIndex?: number,
    testId?: string,
    quesctionCollection?: QuestionCollection,
    selectedIndex?: number,
  ) => {
    return this.uc.onQuestionClick(
      previuosIndex,
      testId,
      quesctionCollection,
      selectedIndex,
    );
  };
}
