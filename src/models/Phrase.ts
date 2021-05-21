import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../utils/axios-instance";

type phraseAuthor = {
  firstName: string;
  lastName: string;
  _id: string;
};
export type phraseType = {
  // author: {
  // firstName: string;
  // lastName: string;
  // _id: string;
  // };
  author: phraseAuthor;
  countLikes: number;
  createdAt: string;
  isLiked: boolean;
  isShared: boolean;
  isOwnPhrase: boolean;
  phrase: string;
  _id: string;
  isPhraseAuthorOnFriendsList: boolean;
};

export type pagination = {
  hasNextPage: boolean | null;
  page: number | null;
};

export type paginationState = pagination & {
  loading: boolean;
};

type phraseResponse = {
  data: {
    phrases: [phraseType];
  };
  pagination: pagination;
};

type phraseAddNewResponse = {
  data: {
    phrase: phraseType;
  };
};

type phraseActionResponse = {
  status: string;
  message: string;
};

class Phrase {
  static async getPhrases(token: string, page = 1) {
    let response: AxiosResponse<phraseResponse>;
    try {
      response = await axiosInstance(token).get(
        `${process.env.REACT_APP_API_URL}/timeline?page=${page}&limit=4`
      );
      console.log("Phrase Response: ", response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  static async createPhrase(token: string, phrase: string) {
    let response: AxiosResponse<phraseAddNewResponse>;
    try {
      response = await axiosInstance(token).post(
        `${process.env.REACT_APP_API_URL}/phrase`,
        {
          phrase,
        }
      );
      console.log("Phrase Response: ", response);
      return {
        ...response.data.data.phrase,
        isLiked: false,
        countLikes: 0,
        isShared: true,
        countShare: 1,
        isOwnPhrase: true,
        isPhraseAuthorOnFriendsList: false,
      };
      // return response.data.data.phrase;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError<phraseActionResponse>;
      return error;
    }
  }

  static async likePhrase(token: string, phraseId: string) {
    let response: AxiosResponse<phraseActionResponse>;
    try {
      response = await axiosInstance(token).post(
        `${process.env.REACT_APP_API_URL}/phrase/like/${phraseId}`
      );
      console.log("Response Like: ", response);
      return response;
    } catch (err) {
      const error = err as AxiosError<phraseActionResponse>;
      console.log(err);
      return error;
    }
  }

  static async sharePhrase(token: string, phraseId: string) {
    let response: AxiosResponse<phraseActionResponse>;
    try {
      response = await axiosInstance(token).post(
        `${process.env.REACT_APP_API_URL}/phrase/share/${phraseId}`
      );
      console.log("Response Share: ", response);
      return response;
    } catch (err) {
      const error = err as AxiosError<phraseActionResponse>;
      console.log(error);
      return error;
    }
  }
}

export default Phrase;
