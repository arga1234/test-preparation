import { IQuestion, IQuestionStatus } from '../dto';
interface IUpdateCollectionParams {
  selectedOption?: string;
  status?: IQuestionStatus;
  index?: number;
  previousIndex?: number;
  duration?: string | null;
  testId?: string;
}
export class QuestionCollection {
  constructor(questions: IQuestion[]) {
    this.questions = questions;
  }
  questions!: IQuestion[];
  getByIndex = (index?: number) => {
    return this.questions.find((el, indexEl) => indexEl === index);
  };
  updateCollection = (params: IUpdateCollectionParams) => {
    const { selectedOption, status, index, duration, testId } = params;
    if (index !== undefined && testId !== undefined) {
      const question = this.getByIndex(index);
      const qc = this.questions.map((el) => {
        if (question && el.id === question.id) {
          return {
            ...question,
            status: status ? status : el.status,
            selectedOption: selectedOption ? selectedOption : el.selectedOption,
            duration: duration ? parseInt(duration) : el.duration,
          };
        }

        return el;
      });
      localStorage.setItem(testId, JSON.stringify(qc));
      return new QuestionCollection(qc);
    } else {
      throw new Error('Test Id and index are not defined');
    }
  };

  activateSelectedQuestion = (index: number) => {
    return new QuestionCollection(
      this.questions.map((el, i) => ({
        ...el,
        isActive: index === i ? true : false,
      })),
    );
  };
}
