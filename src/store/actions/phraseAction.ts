import { AppThunk } from "../types/thunk";
import actionTypes from "./actionTypes";
import Phrase, {
  phraseType,
  pagination,
  paginationState,
} from "../../models/Phrase";

import {
  phraseStartAction,
  phraseSuccessAction,
  phraseAddNewSuccess,
  phraseError,
  phraseIncrementSuccessAction,
  phraseIncrementStartAction,
} from "./types/phraseTypes";

// const PHRASE = new Phrase();

const phraseStart = (): phraseStartAction => {
  return {
    type: actionTypes.PHRASE_START,
  };
};

const phraseIncrementStart = (): phraseIncrementStartAction => {
  return {
    type: actionTypes.PHRASE_INCREMENT_START,
  };
};

const phraseSuccess = (
  phrases: [phraseType],
  pagination: pagination
): phraseSuccessAction => {
  return {
    type: actionTypes.PHRASE_SUCCESS,
    payload: { phrases, pagination },
  };
};

const phraseIncrement = (
  phrases: [phraseType],
  pagination: pagination
): phraseIncrementSuccessAction => {
  return {
    type: actionTypes.PHRASE_INCREMENT_SUCCESS,
    payload: { phrases, pagination },
  };
};

const phraseErrorAction = (error: string): phraseError => {
  return {
    type: actionTypes.PHRASE_ERROR,
    payload: { error },
  };
};

const phraseAddNewSuccessAction = (phrase: phraseType): phraseAddNewSuccess => {
  return {
    type: actionTypes.PHRASE_ADD_NEW_SUCCESS,
    payload: { phrase },
  };
};

export const getPhrases = (
  token: string,
  page = 1,
  isIncrement = false
): AppThunk => {
  return async dispatch => {
    if (!isIncrement) {
      dispatch(phraseStart);
    } else {
      console.log("True@@@@");
      dispatch(phraseIncrementStart());
    }

    // const phrase = new Phrase();

    try {
      const phrases = await Phrase.getPhrases(token, page);
      if (phrases && phrases.data.phrases && phrases.pagination) {
        console.log("Im inside phrases action");
        if (!isIncrement) {
          if (phrases.pagination) {
            dispatch(phraseSuccess(phrases.data.phrases, phrases.pagination));
          }
        } else {
          if (phrases.pagination) {
            console.log("True2@@@@");
            dispatch(phraseIncrement(phrases.data.phrases, phrases.pagination));
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const createPhrase = (token: string, phrase: string): AppThunk => {
  return async dispatch => {
    dispatch(phraseStart);

    try {
      const phraseResponse = await Phrase.createPhrase(token, phrase);
      console.log("Create Phrase Response: ", phraseResponse);
      if (phraseResponse && "phrase" in phraseResponse) {
        dispatch(phraseAddNewSuccessAction(phraseResponse));
      } else {
        dispatch(phraseErrorAction(phraseResponse.message));
      }
    } catch (err) {
      console.log(err);
    }
  };
};
