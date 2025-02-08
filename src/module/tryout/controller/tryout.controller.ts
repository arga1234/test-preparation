import { TryoutUsecase } from '../usecase';

export class TryoutController {
  constructor(private x: TryoutUsecase) {}
  getTryoutCategory = () => {
    return this.x.getTryoutCategory();
  };
  getTryoutItem = (categoryId: string) => {
    return this.x.getTryoutList(categoryId);
  };
  getTryoutTest = (testId: string) => {
    return this.x.getTryoutTest(testId);
  };
  getTryoutAnswerByTryId = (testId: string, tryId: string) => {
    return this.x.getTryoutAnswerByTryId(testId, tryId);
  };
}
