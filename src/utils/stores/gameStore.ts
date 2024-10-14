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
  userCountryResults: UserCountryResult[];
  addToUserCountryResults: (
    countryId: CountryRecord['id'],
    result: UserResultsStatus,
    questionIndex: number,
  ) => void;
  deck: Deck | null;
  setDeck: (deck: Deck) => void;
  resetGame: () => void;
  isGameStoreInitialized: boolean;
  setIsGameStoreInitialized: (isGameStoreInitialized: boolean) => void;
  answeredQuestions: AnsweredQuestion[];
  addToAnsweredQuestions: (answeredQuestion: AnsweredQuestion) => void;
  userCountryScoresForCurrentSeries: CountryScoreHistory;
  setUserCountryScoresForCurrentSeries: (
    userCountryScoresForCurrentSeries: CountryScoreHistory,
  ) => void;
  getUseCountryScoreForCountryId: (countryId: CountryRecord['id']) => boolean[];
}

const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      currentQuestionIndex: 0,
      gameState: 'playing',
      questionType: 'CountryToCapital',
      isShowingAnswer: false,
      userAnswers: [], // TODO rename userGuesses / userQuestionGuesses
      userCountryResults: [],
      deck: null,
      isGameStoreInitialized: false,
      answeredQuestions: [],
      userCountryScoresForCurrentSeries: [],

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
      addToUserAnswers: (userAnswer: string) => {
        set((state) => {
          return {
            userAnswers: [...state.userAnswers, userAnswer],
          };
        });
      },

      addToUserCountryResults: (
        countryId: CountryRecord['id'],
        result: UserResultsStatus,
        questionIndex: number,
      ) =>
        set((state) => {
          const newResults = [...state.userCountryResults];
          newResults[questionIndex] = {
            countryId,
            result,
            questionIndex,
          };
          return { userCountryResults: newResults };
        }),

      resetGame() {
        set(() => ({
          currentQuestionIndex: 0,
          gameState: 'playing',
          isShowingAnswer: false,
          userAnswers: [],
          userCountryResults: [],
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

      setUserCountryScoresForCurrentSeries(userCountryScoresForCurrentSeries) {
        set(() => ({ userCountryScoresForCurrentSeries }));
      },
      getUseCountryScoreForCountryId(countryId: CountryRecord['id']) {
        const { userCountryScoresForCurrentSeries } = get();
        return userCountryScoresForCurrentSeries[countryId] ?? [];
      },
    }),
    {
      partialize: (state) => ({
        questionType: state.questionType,
        isGameStoreInitialized: state.isGameStoreInitialized,
        answeredQuestions: state.answeredQuestions,
        userCountryResults: state.userCountryResults,
        userCountryScoresForCurrentSeries:
          state.userCountryScoresForCurrentSeries,
        deck: state.deck,
      }),
      name: 'game', // name of the item in the storage
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setIsGameStoreInitialized(true);
        }
      },
    },
  ),
);

export default useGameStore;
