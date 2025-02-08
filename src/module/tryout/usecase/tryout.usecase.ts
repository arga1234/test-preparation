import { IDatabaseClient } from '@/module/db/repository';
import {
  IQuestion,
  IQuestionAnswer,
  QuestionCollection,
} from '@/module/question';
import { ITryoutCategoryDto, ITryoutItemDto } from '../dto';

export class TryoutUsecase {
  constructor(private x: IDatabaseClient) {}
  getTryoutCategory = async () => {
    const x = localStorage.getItem('tryoutCategory');
    if (x) return JSON.parse(x) as ITryoutCategoryDto[];
    console.log('hai');
    return (
      await this.x.getList<ITryoutCategoryDto>('tryout-category', {
        limit: 100,
        offset: 0,
      })
    ).data;
  };

  getTryoutList = async (tryoutCategoryId: string) => {
    const x = localStorage.getItem(`tryoutList-${tryoutCategoryId}`);
    if (x) return JSON.parse(x) as ITryoutItemDto[];
    return (
      await this.x.getList<ITryoutItemDto>(
        'tryout-item',
        {
          limit: 100,
          offset: 0,
        },
        [{ column: 'categoryId', operator: '=', value: tryoutCategoryId }],
      )
    ).data;
  };

  getTryoutTest = async (testId: string) => {
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

  getTryoutAnswerByTryId = async (testId: string, tryId: string) => {
    const qc = await this.getTryoutTest(testId);
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
}
