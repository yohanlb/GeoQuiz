import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameStoreState {
  currentQuestionIndex: number;
  incrementQuestionIndex: () => void;
  questionType: QuestionType;
  toggleQuestionType: () => void;
}

const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      currentQuestionIndex: 0,
      questionType: 'CountryToCapital',

      incrementQuestionIndex: () =>
        set((state) => ({
          currentQuestionIndex: state.currentQuestionIndex + 1,
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
