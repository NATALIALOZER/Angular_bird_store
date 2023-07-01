import { cartReducer, initialCartState } from './cart.reducer';

describe('Cart Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = cartReducer(initialCartState, action);

      expect(result).toBe(initialCartState);
    });
  });
});
