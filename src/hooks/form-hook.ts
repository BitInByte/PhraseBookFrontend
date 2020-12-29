import React, { useReducer, useCallback } from "react";

enum Actions {
  "CHANGE_VALUE",
}

const formStateReducer: React.Reducer<IState<any>, ActionsType> = <T>(
  state: IState<T>,
  action: ActionsType
): IState<T> => {
  switch (action.type) {
    case Actions.CHANGE_VALUE:
      // const element = action.payload!.inputName;
      // const val = "firstName";
      console.log(action.payload!.value);
      // console.log("STATE");
      // const val = action.payload!.inputName;
      // console.log(val);
      // console.log(action.payload!.inputName);
      // console.log("FIRST NAME");

      // console.log(state.inputs[val]);
      // console.log(state.inputs[action.payload!.inputName]);

      // console.log(state.inputs[element].value);

      // console.log("Index");
      // let element;
      // for (const index in state.inputs) {
      //   console.log(index === action.payload?.inputName);
      //   console.log(index.value);
      // if (index === action.payload!.inputName) element = index;
      // }

      // if (Array.isArray(state.inputs)) {
      //   //  Get the index of the element
      //   // let inputIndex;
      //   // for (const inputId in state.inputs) {
      //   //   if (inputId === action.payload!.inputName) {
      //   //   }
      //   // }
      //   const values = [...state.inputs];
      //
      //   values.map(e => {
      //     if (e.id === action.payload!.inputName) {
      //       e.value = action.payload!.value;
      //     }
      //     return e;
      //   });
      //
      //   return {
      //     ...state,
      //     inputs: values,
      //     // inputs: {
      //     //   ...state.inputs,
      //     //   [action.payload!.inputName!]: {
      //     //     ...[action.payload!.inputName],
      //     //     value: action.payload!.value,
      //     //   },
      //     // },
      //   };
      // } else {
      //   return {
      //     ...state,
      //     inputs: {
      //       ...state.inputs,
      //       value: action.payload!.value,
      //     },
      //   };
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload!.inputName]: {
            ...[action.payload!.inputName],
            value: action.payload!.value,
          },
        },
      };
    default:
      return state;
  }
};

type InputElement = {
  id: string;
  value: string;
  isValid: boolean;
};

type Payload = {
  value: string;
  inputName: string;
};

type ActionsType = {
  payload?: Payload;
  type: Actions;
};

export enum stateTypes {
  "firstName",
  "lastName",
  "email",
  "password",
  "repeatPassword",
}

interface ILoginState {
  email: {
    value: string;
    isValid: boolean;
  };
  password: {
    value: string;
    isValid: boolean;
  };
}

interface IRegisterState extends ILoginState {
  firstName: {
    value: string;
    isValid: boolean;
  };
  lastName: {
    value: string;
    isValid: boolean;
  };
  // email: {
  //   value: string;
  //   isValid: boolean;
  // };
  // password: {
  //   value: string;
  //   isValid: boolean;
  // };
  repeatPassword: {
    value: string;
    isValid: boolean;
  };
}

export interface IState<T> {
  // inputs: IRegisterState | ILoginState;
  inputs: T;
  isFormValid: boolean;
}

// export const useForm = (initialInputs: IRegisterState) => {
export const useForm = <T>(initialInputs: T) => {
  //    Create a reducer
  const [formState, dispatch] = useReducer(formStateReducer, {
    inputs: initialInputs,
    isFormValid: false,
  });

  const inputValueHandler = useCallback((id: string, value: string) => {
    // console.log("Value");
    // console.log(value);
    dispatch({
      type: Actions.CHANGE_VALUE,
      payload: { value, inputName: id },
    });
  }, []);

  return { formState, inputValueHandler };
};
