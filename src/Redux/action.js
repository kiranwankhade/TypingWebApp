import { CALCULATE_ACCURACY, FINISH_PRACTICE, START_PRACTICE, UPDATE_TYPED_KEY } from "./actionTypes";

export const startPractice = () => ({
    type: START_PRACTICE,
  });
  
  export const finishPractice = () => ({
    type: FINISH_PRACTICE,
  });
  
  export const updateTypedKey = (key) => ({
    type: UPDATE_TYPED_KEY,
    payload: key,
  });
  
  export const calculateAccuracy = () => ({
    type: CALCULATE_ACCURACY,
  });
  
