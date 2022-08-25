import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
  passValid:true
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched, passValid:state.passValid };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value, passValid:state.passValid };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "", passValid:state.passValid };
  }
  if(action.type==="COMPARE"){
    if(action.compValue!==action.value){
        return {isTouched:state.isTouched,value: state.value,passValid:false }
    }
    else{
        return {isTouched:state.isTouched,value: state.value,passValid:true }
    }
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initialInputState
  );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const passConfirmHandler = (event, password) => {
    dispatch({ type: "COMPARE", value: event.target.value, compValue: password});
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    passValid:inputState.passValid,
    valueChangeHandler,
    inputBlurHandler,
    passConfirmHandler,
    reset,
  };
};

export default useInput;
