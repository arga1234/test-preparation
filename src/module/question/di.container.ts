import { QuestionController } from './controller';
import { QuestionCachingUsecase, QuestionDummyUsecase } from './usecase';

export class QuestionContainer {
  dummyQuestionController = () => {
    return new QuestionController(
      new QuestionDummyUsecase(new QuestionCachingUsecase()),
    );
  };
}
