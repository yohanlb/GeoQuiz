import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStoreState {
  currentQuestionIndex: number;
  gameState: GameState;
  setGameState: (gameState: GameState) => void;
  incrementQuestionIndex: () => void;
  questionType: QuestionType;
  toggleQuestionType: () => void;
  setQuestionType: (questionType: QuestionType) => void;
  isShowingAnswer: boolean;
  setIsShowingAnswer: (isShowingAnswer: boolean) => void;
  userAnswers: string[];
  resetUserAnswers: () => void;
  addToUserAnswers: (userAnswer: string) => void;
  userResults: UserResults;
  addToUserResults: (userResult: UserResultsStatus, index: number) => void;
  resetUserResults: () => void;
  deck: Deck | null;
  setDeck: (deck: Deck) => void;
  resetGame: () => void;
}

const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      gameState: 'playing',
      questionType: 'CountryToCapital',
      isShowingAnswer: false,
      userAnswers: [],
      userResults: [],
      deck: null,

      setDeck(deck) {
        set(() => ({ deck }));
      },

      setGameState(gameState) {
        set(() => ({ gameState }));
      },

      resetUserAnswers: () => set(() => ({ userAnswers: [] })),
      addToUserAnswers: (userAnswer: string) =>
        set((state) => ({
          userAnswers: [...state.userAnswers, userAnswer],
        })),

      addToUserResults: (resultToAdd: UserResultsStatus, index: number) =>
        set((state) => {
          const newUserResults = [...state.userResults];
          newUserResults[index] = resultToAdd;
          return { userResults: newUserResults };
        }),

      resetUserResults() {
        set(() => ({ userResults: [] }));
      },

      resetGame() {
        set(() => ({
          currentQuestionIndex: 0,
          gameState: 'playing',
          isShowingAnswer: false,
          userAnswers: [],
          userResults: [],
        }));
      },

      incrementQuestionIndex: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
        })),

      setIsShowingAnswer: (newIsShowingAnswer: boolean) =>
        set(() => ({
          isShowingAnswer: newIsShowingAnswer,
        })),

      toggleQuestionType: () => {
        set((state) => ({
          questionType:
            state.questionType === 'CountryToCapital'
              ? 'CountryToFlag'
              : 'CountryToCapital',
        }));
      },

      setQuestionType: (questionType: QuestionType) =>
        set(() => ({ questionType })),
    }),
    {
      partialize: (state) => ({ questionType: state.questionType }),
      name: 'game-settings', // name of the item in the storage
    },
  ),
);

export default useGameStore;
