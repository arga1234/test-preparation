import { IQuestionUsecase } from '../usecase';

export class QuestionController {
  constructor(private uc: IQuestionUsecase) {}
  getQuestionCollection = async (id: string) => {
    return this.uc.getQuestionCollection(id);
  };

  reportQuestion = (testId: string, id: string) => {
    return this.uc.reportQuestion(testId, id);
  };
}
