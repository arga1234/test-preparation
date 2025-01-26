import { IDatabaseClient } from '@/module/db/repository';
import { IQuestion } from '../dto';
import { QuestionCollection } from '../entity';
export interface IQuestionUsecase {
  getQuestionCollection: (id: string) => Promise<QuestionCollection>;
  reportQuestion: (testId: string, questionId: string) => Promise<void>;
}

export class QuestionUsecase implements IQuestionUsecase {
  constructor(private x: IDatabaseClient<IQuestion>) {}

  getQuestionCollection = async (testId: string) => {
    const qc = localStorage.getItem(testId);
    if (qc) {
      return new QuestionCollection(JSON.parse(qc));
    }
    const res = await this.x.getList({ testId });
    return new QuestionCollection(
      res.map((el, index) => ({
        ...el,
        number: index + 1,
        duration: 0,
      })),
    );
  };

  reportQuestion = async (testId: string, questionId: string) => {
    console.log(testId, questionId);
    return;
  };
}
