import { IQuestion } from '../dto';

export interface IQuestionCachingUsecase {
  setQuestion: (question: IQuestion) => void;
  getQuestion: (id: string) => IQuestion;
  // setActiveQuestion: (question: IQuestion, no: number) => void;
  // getActiveQuestion: () => { question: IQuestion; no: number };
}

export class QuestionCachingUsecase implements IQuestionCachingUsecase {
  private activeKey = 'question-active';
  setQuestion = (question: IQuestion) => {
    localStorage.setItem(question.id, JSON.stringify(question));
  };
  getQuestion = (id: string) => {
    const x = localStorage.getItem(id);
    if (x) {
      return JSON.parse(x);
    }

    return null;
  };
}
