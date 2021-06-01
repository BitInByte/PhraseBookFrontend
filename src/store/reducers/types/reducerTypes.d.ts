import Phrase, { phraseType, paginationState } from "../../../models/Phrase";
import User from "../../../models/User";

declare global {
  interface IAuthState {
    token: string | null;
    // userId: string | null;
    error: string | null;
    loading: boolean | null;
    userInitials: string | null;
  }

  interface IPhraseState {
    phrases: Phrase[] | null;
    error: string | null;
    loading: boolean;
    pagination: paginationState;
  }

  interface IUserState {
    user: User | null;
    error: string | null;
    loading: boolean;
  }
}
