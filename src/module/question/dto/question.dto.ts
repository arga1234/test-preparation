export type IQuestionOptionId = 'a' | 'b' | 'c' | 'd' | 'e';

export interface IQuestionOption {
  id: IQuestionOptionId;
  text: string;
  points: number;
}

export interface IQuestion {
  id: string;
  category: string;
  question: string;
  option: IQuestionOption[];
}

export interface IQuestionItemList {
  id: string;
  status: 'correct' | 'incorrect' | 'unanswered' | 'active';
}

export class QuestionItemList implements IQuestionItemList {
  constructor(data: { id: string; status: string }) {
    Object.assign(this, data);
  }
  id!: string;
  status!: 'correct' | 'incorrect' | 'unanswered' | 'active';
}
