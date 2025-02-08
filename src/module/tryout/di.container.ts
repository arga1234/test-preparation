import { TryoutController } from './controller';
import { TryoutService } from './service';
import { TryoutUsecase } from './usecase';

export class TryoutContainer {
  tryoutController = () => {
    return new TryoutController(new TryoutUsecase(new TryoutService()));
  };
}
