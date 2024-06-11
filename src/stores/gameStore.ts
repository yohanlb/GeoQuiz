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
  isGameStoreInitialized: boolean;
  setIsGameStoreInitialized: (isGameStoreInitialized: boolean) => void;
  answeredQuestions: AnsweredQuestion[];
  addToAnsweredQuestions: (answeredQuestion: AnsweredQuestion) => void;
}

const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      gameState: 'playing',
      questionType: 'CountryToCapital',
      isShowingAnswer: false,
      userAnswers: [],
      userResults: [], // TODO deprecate this, use answeredQuestions instead
      deck: null,
      isGameStoreInitialized: false,
      answeredQuestions: [],

      addToAnsweredQuestions: (answeredQuestion: AnsweredQuestion) =>
        set((state) => ({
          answeredQuestions: [...state.answeredQuestions, answeredQuestion],
        })),

      setIsGameStoreInitialized(isGameStoreInitialized) {
        set(() => ({ isGameStoreInitialized }));
      },

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
          answeredQuestions: [],
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
      partialize: (state) => ({
        questionType: state.questionType,
        isGameStoreInitialized: state.isGameStoreInitialized,
        answeredQuestions: state.answeredQuestions,
        deck: state.deck,
      }),
      name: 'game-settings', // name of the item in the storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsGameStoreInitialized(true);
        }
      },
    },
  ),
);

export default useGameStore;
