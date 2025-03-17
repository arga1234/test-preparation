import { QuestionContainer } from './question';
import { TryoutContainer } from './tryout';

export class ModuleContainer {
  tryoutContainer = new TryoutContainer();
  questionContainer = new QuestionContainer();
}
