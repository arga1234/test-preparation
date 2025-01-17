import { IQuestionUsecase } from '../usecase';

export class QuestionController {
  constructor(private uc: IQuestionUsecase) {}
  getQuestionById = (id: string) => {
    return this.uc.getQuestionById(id);
  };
  getQuestionList = () => {
    return this.uc.getQuestionList();
  };
}
