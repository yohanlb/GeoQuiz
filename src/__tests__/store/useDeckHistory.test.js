import { AVAILABLE_QUESTION_TYPES } from '@lib/data/consts';
import {
  initializeDeckResults,
  useDeckHistory,
} from '@stores/deck-history-store';
import useGameStore from '@stores/game-store';
import { act, renderHook } from '@testing-library/react';

jest.mock('@stores/game-store', () => ({
  getState: jest.fn(),
}));
jest.useFakeTimers();

describe('useDeckHistory', () => {
  beforeEach(() => {
    useGameStore.getState.mockReturnValue({
      questionType: AVAILABLE_QUESTION_TYPES[0],
    });
  });

  it('should initialize with default deck results data', () => {
    const { result } = renderHook(() => useDeckHistory());
    expect(result.current.deckResultsData).toEqual(initializeDeckResults());
  });

  it('should clear all deck scores', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.addNewDeckResult(1, 100);
    });

    act(() => {
      result.current.clearAllDeckScores();
    });

    expect(result.current.deckResultsData).toEqual(initializeDeckResults());
  });

  it('should get deck score', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.addNewDeckResult(1, 100);
    });

    const score = result.current.getDeckScore(1);
    expect(score).toBe(100);
  });

  it('should get all played deck ids', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.addNewDeckResult(1, 100);
      result.current.addNewDeckResult(2, 20);
    });

    const ids = result.current.getPlayedDeckIds();
    expect(ids).toEqual([1, 2]);
  });

  it('should get last played deck ids', () => {
    const { result } = renderHook(() => useDeckHistory());

    act(() => {
      result.current.addNewDeckResult(1, 100);
      jest.advanceTimersByTime(1000);
      result.current.addNewDeckResult(2, 20);
    });

    const ids = result.current.getLastNDecksPlayed(5);
    expect(ids).toEqual([2, 1]);
  });
});
