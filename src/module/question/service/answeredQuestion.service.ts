import { IDatabaseClient, IWhereClause } from '@/module/db/repository';
import { IQuestionAnswer } from '../dto';

export class AnsweredQuestionService
  implements IDatabaseClient<IQuestionAnswer>
{
  private dataDummy: { tryId: string; questionAnswer: IQuestionAnswer[] }[] = [
    {
      tryId: '1',
      questionAnswer: [
        { questionId: '1', selectedOption: 'a', duration: 12 },
        { questionId: '2', selectedOption: 'b', duration: 20 },
        { questionId: '3', selectedOption: 'c', duration: 15 },
        { questionId: '4', selectedOption: 'd', duration: 10 },
        { questionId: '5', selectedOption: 'a', duration: 25 },
        { questionId: '6', selectedOption: 'b', duration: 18 },
        { questionId: '7', selectedOption: 'c', duration: 30 },
        { questionId: '8', selectedOption: 'd', duration: 22 },
        { questionId: '9', selectedOption: '', duration: 16 },
        { questionId: '10', selectedOption: '', duration: 28 },
      ],
    },
  ];
  getSingle(
    where: IWhereClause,
    columns?: (keyof IQuestionAnswer)[] | undefined,
  ): Promise<IQuestionAnswer | null> {
    console.log(where, columns);
    throw new Error('Method not implemented.');
  }
  getList = async (
    where: IWhereClause,
    columns?: (keyof IQuestionAnswer)[] | undefined,
  ) => {
    const { tryId } = where;
    const q = this.dataDummy.find((el) => el.tryId === tryId);
    if (q) {
      return q.questionAnswer.map((el) => {
        if (columns) {
          return columns.reduce((acc, el2) => {
            return {
              ...acc,
              [el2]: el[el2 as keyof IQuestionAnswer],
            };
          }, {} as IQuestionAnswer);
        }
        return el;
      });
    }

    return [];
  };
}
