import { CALCULATE_ACCURACY, FINISH_PRACTICE, START_PRACTICE, UPDATE_TYPED_KEY } from "./actionTypes";

const initialState = {
  isPracticing: false,
  typedKeys: [],
  accuracy: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_PRACTICE:
      return {
        ...state,
        typedKeys:[],
        isPracticing: true,
      };

    case FINISH_PRACTICE:
      return {
        ...state,
        isPracticing: false,
      };

    case UPDATE_TYPED_KEY:
      return {
        ...state,
        typedKeys: [...state.typedKeys, action.payload],
      };

      
    case CALCULATE_ACCURACY:
      const totalKeys = state.typedKeys.length;
      const correctKeys = state.typedKeys.filter((key) => key !== '').length;
      const accuracy = ((correctKeys / totalKeys) * 100 || 0).toFixed(2);
      return {
        ...state,
        accuracy,
      };
    default:
      return state;
  }
};

export default reducer;
