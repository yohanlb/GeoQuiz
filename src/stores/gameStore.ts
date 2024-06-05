import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStoreState {
  currentQuestionIndex: number;
  incrementQuestionIndex: () => void;
  questionType: QuestionType;
  toggleQuestionType: () => void;
  isShowingAnswer: boolean;
  setIsShowingAnswer: (isShowingAnswer: boolean) => void;
  userAnswers: string[];
  resetUserAnswers: () => void;
  addToUserAnswers: (userAnswer: string) => void;
  userResults: UserResults;
  addToUserResults: (userResult: UserResultsStatus, index: number) => void;
  resetUserResults: () => void;
}

const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      questionType: 'CountryToCapital',
      isShowingAnswer: false,
      userAnswers: [],
      userResults: [],

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
    }),
    {
      partialize: (state) => ({ questionType: state.questionType }),
      name: 'game-settings', // name of the item in the storage
    },
  ),
);

export default useGameStore;
