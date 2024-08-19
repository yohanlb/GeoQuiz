export const FPS = 30;

export const TIMINGS_TIMER = {
  timer_start_delay: FPS * 0.5,
  timer_duration: FPS * 5,
  timer_end_delay: FPS * 0.5,
};

export const TIMINGS_QUESTION = {
  show_question: FPS * 0,
  answer_reveal: TIMINGS_TIMER.timer_start_delay + TIMINGS_TIMER.timer_duration,
  answerDuration: FPS * 1.0,
};

export const TIMINGS_GLOBAL = {
  question_duration:
    TIMINGS_TIMER.timer_start_delay +
    TIMINGS_TIMER.timer_duration +
    TIMINGS_QUESTION.answerDuration,
  questions_start: FPS * 2,
  questions_end: FPS * 9,
};
