import { QuestionController } from './controller';
import { QuestionUsecase } from './usecase';

export class QuestionContainer {
  questionController = () => {
    return new QuestionController(new QuestionUsecase());
  };
}
