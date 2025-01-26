import { QuestionController } from './controller';
import { QuestionUsecase } from './usecase';

export class QuestionContainer {
  dummyQuestionController = () => {
    return new QuestionController(new QuestionUsecase());
  };
}
