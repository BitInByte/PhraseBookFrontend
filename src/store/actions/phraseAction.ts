import { AppThunk } from "../types/thunk";
import actionTypes from "./actionTypes";
import Phrase, {
  // phraseType,
  pagination,
  // paginationState,
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
  // phrases: [phraseType],
  phrases: Phrase[],
  pagination: pagination
): phraseSuccessAction => {
  return {
    type: actionTypes.PHRASE_SUCCESS,
    payload: { phrases, pagination },
  };
};

const phraseIncrement = (
  // phrases: [phraseType],
  phrases: Phrase[],
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

// const phraseAddNewSuccessAction = (phrase: phraseType): phraseAddNewSuccess => {
const phraseAddNewSuccessAction = (phrase: Phrase): phraseAddNewSuccess => {
  return {
    type: actionTypes.PHRASE_ADD_NEW_SUCCESS,
    payload: { phrase },
  };
};

export const phraseErrorClear = () => {
  return {
    type: actionTypes.PHRASE_CLEAR_ERROR,
  };
};

export const getPhrases = (
  // token: string,
  page = 1,
  isIncrement = false
): AppThunk => {
  return async (dispatch, getState) => {
    if (!isIncrement) {
      dispatch(phraseStart);
    } else {
      console.log("True@@@@");
      dispatch(phraseIncrementStart());
    }

    const token = getState().auth.token;
    // const phrase = new Phrase();

    try {
      if (token) {
        const phrases = await Phrase.getPhrases(token, page);
        if (phrases && phrases.data.phrases && phrases.pagination) {
          const phrasesArray = phrases.data.phrases.map(phrase => {
            return new Phrase(
              phrase._id,
              phrase.author,
              phrase.countLikes,
              phrase.countShares,
              phrase.createdAt,
              phrase.isLiked,
              phrase.isShared,
              phrase.isOwnPhrase,
              phrase.phrase,
              phrase.isPhraseAuthorOnFriendsList
            );
          });
          console.log("Im inside phrases action");
          if (!isIncrement) {
            if (phrases.pagination) {
              // dispatch(phraseSuccess(phrases.data.phrases, phrases.pagination));
              dispatch(phraseSuccess(phrasesArray, phrases.pagination));
            }
          } else {
            if (phrases.pagination) {
              console.log("True2@@@@");
              // dispatch(phraseIncrement(phrases.data.phrases, phrases.pagination));
              dispatch(phraseIncrement(phrasesArray, phrases.pagination));
            }
          }
        }
      }
    } catch (err) {
      console.log(err);
      dispatch(phraseErrorAction(err.message));
    }
  };
};

// export const createPhrase = (token: string, phrase: string): AppThunk => {
export const createPhrase = (phrase: string): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    dispatch(phraseStart);

    try {
      if (token) {
        const phraseResponse = await Phrase.createPhrase(token, phrase);
        console.log("Create Phrase Response: ", phraseResponse);
        if (phraseResponse && "phrase" in phraseResponse) {
          const phraseModel = new Phrase(
            phraseResponse._id,
            phraseResponse.author,
            phraseResponse.countLikes,
            phraseResponse.countShares,
            phraseResponse.createdAt,
            phraseResponse.isLiked,
            phraseResponse.isShared,
            phraseResponse.isOwnPhrase,
            phraseResponse.phrase,
            phraseResponse.isOwnPhrase
          );

          // dispatch(phraseAddNewSuccessAction(phraseResponse));
          dispatch(phraseAddNewSuccessAction(phraseModel));
          // } else {
        }
      }
    } catch (err) {
      dispatch(phraseErrorAction(err.message));
      console.log(err);
    }
  };
};
