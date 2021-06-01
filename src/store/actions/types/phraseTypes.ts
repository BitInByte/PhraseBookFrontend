import Phrase, { pagination } from "../../../models/Phrase";
import actionTypes from "../actionTypes";

export type phraseStartAction = {
  type: actionTypes.PHRASE_START;
};

export type phraseIncrementStartAction = {
  type: actionTypes.PHRASE_INCREMENT_START;
};

export type phraseSuccessAction = {
  type: actionTypes.PHRASE_SUCCESS;
  // payload: { phrases: [phraseType]; pagination: pagination };
  payload: { phrases: Phrase[]; pagination: pagination };
};

export type phraseClearAction = {
  type: actionTypes.PHRASE_CLEAR;
};

export type phraseIncrementSuccessAction = {
  type: actionTypes.PHRASE_INCREMENT_SUCCESS;
  // payload: { phrases: [phraseType]; pagination: pagination };
  payload: { phrases: Phrase[]; pagination: pagination };
};

export type phraseActionSuccessAction = {
  type: actionTypes.PHRASE_ACTION;
  // payload: { phraseId: string; isLike: boolean; message: string };
  payload: { phraseId: string; isLike: boolean };
};

export type phraseError = {
  type: actionTypes.PHRASE_ERROR;
  payload: { error: string };
};

export type phraseClearError = {
  type: actionTypes.PHRASE_CLEAR_ERROR;
};

export type phraseAddNewSuccess = {
  type: actionTypes.PHRASE_ADD_NEW_SUCCESS;
  // payload: { phrase: phraseType };
  payload: { phrase: Phrase };
};

type phraseActions =
  | phraseStartAction
  | phraseSuccessAction
  | phraseActionSuccessAction
  | phraseClearError
  | phraseError
  | phraseAddNewSuccess
  | phraseIncrementSuccessAction
  | phraseIncrementStartAction
  | phraseClearAction;

export default phraseActions;
