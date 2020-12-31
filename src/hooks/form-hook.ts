import React, { useReducer, useCallback } from "react";

enum Actions {
  "CHANGE_VALUE",
  "CHANGE_FORM_VALIDATION",
  "CHANGE_TOUCHED_ELEMENT",
}

type stateElement = {
  value: string;
  isValid: boolean;
  isTouched: boolean;
};

// const formStateReducer: React.Reducer<IState<any>, ActionsType> = <T>(
// It's a type that we don't know the elements inside of it but we know that will always be an object
// So we extend the type we're receiving to a record to be able to use a string to find the object property
const createFormReducer = <
  // T extends Record<string, stateElement>
  T extends Record<string, stateElement>
>(): React.Reducer<IState<T>, ActionsType> => (state, action): IState<T> => {
  switch (action.type) {
    case Actions.CHANGE_VALUE:
      //  Object destructuring for type safety
      const { value, validation, inputName } = action.payload as Payload;
      return {
        ...state,
        inputs: {
          ...state.inputs,
          // [action.payload!.inputName]: {
          [inputName]: {
            // ...[action.payload!.inputName],
            ...state.inputs[inputName],

            // value: action.payload!.value as Payload,
            value: value,

            // isValid: action.payload!.validation,
            isValid: validation,
          },
        },
      };
    case Actions.CHANGE_FORM_VALIDATION:
      //  Object destructuring for type safety
      const { validator } = action.payload as Payload2;

      return {
        ...state,

        // isFormValid: action.payload!.validator,
        isFormValid: validator,
      };
    case Actions.CHANGE_TOUCHED_ELEMENT:
      const { inputNameId } = action.payload as Payload3;
      console.log("Input name id");
      console.log(inputNameId);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [inputNameId]: {
            ...state.inputs[inputNameId],
            isTouched: true,
          },
        },
      };
    default:
      return state;
  }
};

// type InputElement = {
//   id: string;
//   value: string;
//   isValid: boolean;
// };

type Payload3 = {
  inputNameId: string;
};

type Payload2 = {
  validator: boolean;
};

type Payload =
  // | { validator: boolean }
  {
    value: string;
    inputName: string;
    validation: boolean;
  };

interface ActionsType {
  payload?: Payload | Payload2 | Payload3;
  type: Actions;
}

// export enum stateTypes {
//   "firstName",
//   "lastName",
//   "email",
//   "password",
//   "repeatPassword",
// }
export interface IState<T> {
  // inputs: IRegisterState | ILoginState;
  inputs: T;
  isFormValid: boolean;
}

// export const useForm = (initialInputs: IRegisterState) => {
export const useForm = <T extends Record<string, stateElement>>(
  initialInputs: T
) => {
  const formReducer = createFormReducer<T>();
  //    Create a reducer
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isFormValid: false,
  });

  const inputValueHandler = useCallback(
    (id: string, value: string, validation: boolean) => {
      // console.log("Value");
      // console.log(value);
      dispatch({
        type: Actions.CHANGE_VALUE,
        payload: { value, inputName: id, validation },
      });
    },
    []
  );

  const formValidationHandler = useCallback((validation: boolean) => {
    dispatch({
      type: Actions.CHANGE_FORM_VALIDATION,
      payload: { validator: validation },
    });
  }, []);

  const inputTouchedHandler = useCallback((id: string) => {
    dispatch({
      type: Actions.CHANGE_TOUCHED_ELEMENT,
      payload: { inputNameId: id },
    });
  }, []);

  return {
    formState,
    inputValueHandler,
    formValidationHandler,
    inputTouchedHandler,
  };
};
