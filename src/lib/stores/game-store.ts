import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStoreState {
  //Game Status
  gameState: GameStatus; //TODO: rename game status
  setGameState: (gameState: GameStatus) => void;
  isGameStoreInitialized: boolean;
  setIsGameStoreInitialized: (isGameStoreInitialized: boolean) => void;
  resetGame: () => void;

  // Game Questions
  currentQuestionIndex: number;
  incrementQuestionIndex: () => void;
  questionType: QuestionType;
  toggleQuestionType: () => void;
  setQuestionType: (questionType: QuestionType) => void;
  isShowingAnswer: boolean;
  userAnswers: string[];
  setIsShowingAnswer: (isShowingAnswer: boolean) => void;
  resetUserAnswers: () => void;
  addToUserAnswers: (userAnswer: string) => void;
  answeredQuestions: AnsweredQuestion[];
  addToAnsweredQuestions: (answeredQuestion: AnsweredQuestion) => void;

  // Results
  userCountryResults: UserCountryResult[];
  addToUserCountryResults: (
    countryId: CountryRecord['id'],
    result: UserResultsStatus,
    questionIndex: number,
  ) => void;

  // Deck Management
  deck: DeckRecord | null;
  setDeck: (deck: DeckRecord) => void;

  // User Scores For current series
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
