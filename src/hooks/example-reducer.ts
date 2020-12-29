import { useReducer } from "react";

const formStateReducer = (state: IState, action: ActionsType): IState => {
  switch (action.type) {
    default:
      return state;
  }
};

enum actions {}

type InputElement = {
  value: string;
  isValid: boolean;
};

type ActionsType = {
  payload: InputElement | undefined;
  type: actions;
};

interface IState {
  inputs: InputElement[] | InputElement;
  isFormValid: boolean;
}

export const useForm = (initialInputs: InputElement[] | InputElement) => {
  //    Create a reducer
  const [formState, dispatch] = useReducer(formStateReducer, {
    inputs: initialInputs,
    isFormValid: false,
  });

  return [formState];
};
