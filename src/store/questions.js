/* eslint-disable indent */
// import axios from 'axios';

const initialState = {
  questions: [],
  activeQuestion: {
    category: '',
    id: '',
    questionAnswer: '{"question": "", "answer":""}',
  },
  showModal: false,
};

// ACTIONS

export const selectQuestion = question => {
  return {
    type: 'SELECT_QUESTION',
    payload: question,
  };
};

export const closeQuestion = () => {
  return {
    type: 'CLOSE_QUESTION',
    payload: null,
  };
};

// REDUCER
export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_CATEGORY':
      return { ...state, questions: payload };

    case 'SELECT_QUESTION':
      return { ...state, activeQuestion: payload, showModal: true };

    case 'CLOSE_QUESTION':
      return {
        ...state,
        activeQuestion: {
          category: '',
          id: '',
          questionAnswer: '{"question": "", "answer":""}',
        },
        showModal: false,
      };

    default:
      return state;
  }
};
