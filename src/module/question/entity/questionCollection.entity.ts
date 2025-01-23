import { IQuestion } from '../dto';

export class QuestionCollection {
  constructor(questions: IQuestion[]) {
    this.questions = questions;
  }
  questions!: IQuestion[];
  getByIndex = (index: number) => {
    return this.questions.find((el, indexEl) => indexEl === index);
  };
  updateCollection = (question: IQuestion, testId: string) => {
    const qc = this.questions.map((el) => {
      if (el.id === question.id) {
        return question;
      }

      return el;
    });
    localStorage.setItem(testId, JSON.stringify(qc));
    return new QuestionCollection(qc);
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
