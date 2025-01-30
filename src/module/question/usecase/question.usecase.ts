import { IDatabaseClient } from '@/module/db/repository';
import { IQuestion, IQuestionAnswer } from '../dto';
import { QuestionCollection } from '../entity';
export interface IQuestionUsecase {
  getQuestionCollection: (id: string) => Promise<QuestionCollection>;
  getUserAnsweredQuestionCollection: (
    id: string,
    userId: string,
  ) => Promise<QuestionCollection>;
  reportQuestion: (testId: string, questionId: string) => Promise<void>;
}

export class QuestionUsecase implements IQuestionUsecase {
  constructor(private x: IDatabaseClient) {}
  getUserAnsweredQuestionCollection = async (testId: string, tryId: string) => {
    const qc = await this.getQuestionCollection(testId);
    const cachedAnswer = localStorage.getItem(`tryId-${tryId}`);
    const userAnswer = cachedAnswer
      ? (JSON.parse(cachedAnswer) as IQuestionAnswer[])
      : (
          await this.x.getList<IQuestionAnswer>(
            'questionAnswer',
            { limit: 100, offset: 0 },
            [{ column: 'tryId', operator: '=', value: tryId }],
          )
        ).data;
    return new QuestionCollection(
      qc.questions.map((el) => {
        const x = userAnswer.find((el2) => el2.questionId === el.id);
        return x
          ? {
              ...el,
              duration: x.duration,
              selectedOption: x.selectedOption,
              status: x.selectedOption
                ? x.selectedOption === el.correctOption
                  ? 'correct'
                  : 'incorrect'
                : 'unanswered',
            }
          : { ...el };
      }),
    );
  };

  getQuestionCollection = async (testId: string) => {
    const qc = localStorage.getItem(`testId-${testId}`);
    if (qc) {
      return new QuestionCollection(JSON.parse(qc));
    }
    const res = await this.x.getList<IQuestion>(
      'question',
      { limit: 100, offset: 0 },
      [{ column: 'testId', operator: '=', value: testId }],
    );
    return new QuestionCollection(
      res.data.map((el, index) => ({
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
