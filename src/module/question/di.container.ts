import { QuestionController } from './controller';
import { AnsweredQuestionService, QuestionService } from './service';
import { QuestionUsecase } from './usecase';

export class QuestionContainer {
  questionController = () => {
    return new QuestionController(
      new QuestionUsecase(new QuestionService(), new AnsweredQuestionService()),
    );
  };
}
