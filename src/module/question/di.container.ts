import { QuestionController } from './controller';
import { QuestionDummyUsecase } from './usecase';

export class QuestionContainer {
  dummyQuestionController = () => {
    return new QuestionController(new QuestionDummyUsecase());
  };
}
