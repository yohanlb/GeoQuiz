jest.mock('@stores/game-store', () => ({
  getState: jest.fn(),
}));
jest.useFakeTimers();

describe('Sample Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
});
