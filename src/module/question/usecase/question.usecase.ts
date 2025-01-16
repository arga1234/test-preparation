import { IQuestion, IQuestionItemList } from '../dto';

export interface IQuestionUsecase {
  getQuestionById: (id: string) => Promise<IQuestion>;
  getQuestionList: () => Promise<IQuestionItemList[]>;
}
