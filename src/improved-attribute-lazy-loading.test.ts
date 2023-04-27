import { ImprovedAttributeLazyLoading } from './improved-attribute-lazy-loading';

describe('ImprovedAttributeLazyLoading', () => {
  let improvedAttributeLazyLoading: ImprovedAttributeLazyLoading;

  beforeEach(() => {
    improvedAttributeLazyLoading = new ImprovedAttributeLazyLoading();
  });

  it('should determine the instance', () => {
    const instance: ImprovedAttributeLazyLoading = new ImprovedAttributeLazyLoading();

    expect(instance).toBeDefined();
  });

});
