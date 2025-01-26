import { QuestionController } from './controller';
import { QuestionService } from './service';
import { QuestionUsecase } from './usecase';

export class QuestionContainer {
  dummyQuestionController = () => {
    return new QuestionController(new QuestionUsecase(new QuestionService()));
  };
}
