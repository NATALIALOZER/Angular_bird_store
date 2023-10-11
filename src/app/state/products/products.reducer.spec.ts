import { initialProductsState, productsReducer } from './products.reducer';

describe('Products Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = productsReducer(initialProductsState, action);

      expect(result).toBe(initialProductsState);
    });
  });
});
