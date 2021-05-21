import actionTypes from "../actions/actionTypes";
import phraseActions from "../actions/types/phraseTypes";

const initialState: IPhraseState = {
  phrases: null,
  error: null,
  loading: false,
  pagination: {
    page: null,
    hasNextPage: null,
    loading: false,
  },
};

const phraseStart = (state: IPhraseState, _: phraseActions): IPhraseState => {
  return {
    ...state,
    loading: true,
    error: null,
  };
};

const phraseIncrementStart = (
  state: IPhraseState,
  _: phraseActions
): IPhraseState => {
  return {
    ...state,
    pagination: {
      ...state.pagination,
      loading: true,
    },
  };
};

const phraseSuccess = (
  state: IPhraseState,
  action: phraseActions
): IPhraseState => {
  let phrases = null;
  let pagination = null;
  if ("payload" in action) {
    if ("phrases" in action.payload) phrases = action.payload.phrases;
    if ("pagination" in action.payload) pagination = action.payload.pagination;
    // console.log("Im inside it ===========", action.payload.phrases);
  }
  return {
    ...state,
    phrases,
    loading: false,
    pagination: {
      ...state.pagination,
      ...pagination,
    },
  };
};

const phraseIncrement = (
  state: IPhraseState,
  action: phraseActions
): IPhraseState => {
  let phrases = null;
  let pagination = null;
  if (state.phrases) {
    phrases = [...state.phrases];
  }
  console.log("Phrase Before Payload Actions: ", phrases);

  if ("payload" in action) {
    if ("phrases" in action.payload && phrases) {
      console.log("I have payload@@@@", action.payload.phrases);
      phrases = phrases.concat(action.payload.phrases);
      pagination = action.payload.pagination;
    }
  }

  console.log("Phrases Payload Actions: ", phrases);

  return {
    ...state,
    phrases,
    pagination: {
      ...state.pagination,
      loading: false,
      ...pagination,
    },
  };
};

const phraseAddNewSuccess = (
  state: IPhraseState,
  action: phraseActions
): IPhraseState => {
  if ("payload" in action) {
    if ("phrase" in action.payload) {
      if (state.phrases) {
        state.phrases.unshift(action.payload.phrase);
      }
    }
  }

  return {
    ...state,
  };
};

const phraseAction = (
  state: IPhraseState,
  action: phraseActions
): IPhraseState => {
  let phraseId: string | null = null;
  let isLike = false;
  if ("payload" in action) {
    if ("phraseId" in action.payload) {
      phraseId = action.payload.phraseId;
      isLike = action.payload.isLike;
      // state.error = action.payload.message;
    }
  }

  // let phraseIndex;
  if (phraseId && state.phrases) {
    const phraseIndex = state.phrases.findIndex(
      e => phraseId && e._id.toString() === phraseId.toString()
    );

    if (phraseIndex && state.phrases) {
      const phrase = state.phrases[phraseIndex];
      // console.log("Changing Like");
      // console.log("PhraseIndex: ", phraseIndex);
      // console.log("Phrase State: ", state.phrases[phraseIndex]);
      // if (
      // !phrase.isLiked &&
      // !phrase.isShared &&
      // !phrase.isPhraseAuthorOnFriendsList
      // ) {
      // console.log("Deleting this element");
      // // TODO: I am working here
      // // Delete this phrase from the list
      // state.phrases = state.phrases.filter(
      // phrase => phraseId && phrase._id.toString() === phraseId.toString()
      // );
      // } else if (isLike) {
      if (isLike) {
        // state.phrases[phraseIndex].isLiked = !state.phrases[phraseIndex]
        state.phrases[phraseIndex].isLiked = !phrase.isLiked;
      } else {
        // state.phrases[phraseIndex].isShared = !state.phrases[phraseIndex]
        state.phrases[phraseIndex].isShared = !phrase.isShared;
      }

      if (
        !phrase.isLiked &&
        !phrase.isShared &&
        !phrase.isPhraseAuthorOnFriendsList
      ) {
        // Delete this phrase from the list
        state.phrases = state.phrases.filter(
          phrase => phraseId && phrase._id.toString() !== phraseId.toString()
        );
      }
    }
  }

  return {
    ...state,
  };
};

const phraseError = (
  state: IPhraseState,
  action: phraseActions
): IPhraseState => {
  if ("payload" in action && "error" in action.payload) {
    state.error = action.payload.error;
  }

  return {
    ...state,
  };
};

const clearError = (state: IPhraseState, _: phraseActions): IPhraseState => {
  return {
    ...state,
    error: null,
  };
};

// const phraseShare = (state: IPhraseState, action: phraseActions) => {};

const phraseReducer = (state = initialState, action: phraseActions) => {
  switch (action.type) {
    case actionTypes.PHRASE_START:
      return phraseStart(state, action);
    case actionTypes.PHRASE_INCREMENT_START:
      return phraseIncrementStart(state, action);
    case actionTypes.PHRASE_SUCCESS:
      return phraseSuccess(state, action);
    case actionTypes.PHRASE_ACTION:
      return phraseAction(state, action);
    case actionTypes.PHRASE_ERROR:
      return phraseError(state, action);
    case actionTypes.PHRASE_ADD_NEW_SUCCESS:
      return phraseAddNewSuccess(state, action);
    case actionTypes.PHRASE_INCREMENT_SUCCESS:
      return phraseIncrement(state, action);
    case actionTypes.PHRASE_CLEAR_ERROR:
      return clearError(state, action);
    default:
      return state;
  }
};

export default phraseReducer;
