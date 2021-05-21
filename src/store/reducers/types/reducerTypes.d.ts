import { phraseType, paginationState } from "../../../models/Phrase";

declare global {
  interface IAuthState {
    token: string | null;
    // userId: string | null;
    error: string | null;
    loading: boolean | null;
    userInitials: string | null;
  }

  interface IPhraseState {
    phrases: phraseType[] | null;
    error: string | null;
    loading: boolean;
    pagination: paginationState;
  }
}
