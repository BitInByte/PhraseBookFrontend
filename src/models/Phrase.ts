import { AxiosError, AxiosResponse } from "axios";
// import Author, { authorType } from "./Author";
import Author, { userType } from "./User";
import axiosInstance from "../utils/axios-instance";

type phraseType = {
  // author: authorType;
  author: userType;
  countLikes: number;
  countShares: number;
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
    user: userType;
  };
  pagination: pagination;
};

type phraseActionResponse = {
  status: string;
  message: string;
};

class Phrase {
  private id: string;
  private author: Author;
  private countLikes: number;
  private countShares: number;
  private createdAt: string;
  private isLiked: boolean;
  private isShared: boolean;
  private isOwnPhrase: boolean;
  private phrase: string;
  private isPhraseAuthorOnFriendsList: boolean;

  constructor(
    _id: string,
    // author: authorType,
    author: userType,
    countLikes: number,
    countShares: number,
    createdAt: string,
    isLiked: boolean,
    isShared: boolean,
    isOwnPhrase: boolean,
    phrase: string,
    isPhraseAuthorOnFriendsList: boolean
  ) {
    this.id = _id;
    // this.author = new Author(author._id, author.firstName, author.lastName);
    this.author = new Author(
      author._id,
      author.email,
      author.firstName,
      author.lastName,
      author.authorName,
      author.isFriend,
      author.slug,
      author.isLoggedInUser
    );
    this.countLikes = countLikes;
    this.countShares = countShares;
    this.createdAt = createdAt;
    this.isLiked = isLiked;
    this.isShared = isShared;
    this.isOwnPhrase = isOwnPhrase;
    this.phrase = phrase;
    this.isPhraseAuthorOnFriendsList = isPhraseAuthorOnFriendsList;
  }

  public toggleIsLiked() {
    this.isLiked = !this.isLiked;
  }

  public toggleIsShared() {
    this.isShared = !this.isShared;
  }

  public getId() {
    return this.id.toString();
  }

  public getAuthor() {
    return this.author;
  }

  public getCountLikes() {
    return this.countLikes;
  }

  public getCountShares() {
    return this.countShares;
  }

  public getCreatedAt() {
    return this.createdAt;
  }

  public getIsLiked() {
    return this.isLiked;
  }

  public getIsShared() {
    return this.isShared;
  }

  public getIsOwnPhrase() {
    return this.isOwnPhrase;
  }

  public getPhrase() {
    return this.phrase;
  }

  public getIsPhraseAuthorOnFriendsList() {
    return this.isPhraseAuthorOnFriendsList;
  }

  public getAuthorFirstName() {
    return this.author.getFirstName();
  }

  public getAuthorLastName() {
    return this.author.getLastName();
  }

  // static async getPhrases(token: string, page = 1) {
  static async getPhrases(uid: string | undefined, token: string, page = 1) {
    let response: AxiosResponse<phraseResponse>;
    try {
      if (uid) {
        response = await axiosInstance(token).get(
          `${process.env.REACT_APP_API_URL}/phrase/${uid}?page=${page}&limit=4`
        );
      } else {
        response = await axiosInstance(token).get(
          `${process.env.REACT_APP_API_URL}/timeline?page=${page}&limit=4`
        );
      }
      console.log("Phrase Response: ", response);
      return response.data;
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;
      throw new Error(error.message);
    }
  }

  static async createPhrase(token: string, phrase: string) {
    type phraseAddNewResponse = {
      data: {
        phrase: phraseType;
      };
    };
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
      // return error;
      throw new Error(error.message);
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
      // return error;
      throw new Error(error.message);
    }
  }

  static async sharePhrase(
    token: string,
    phraseId: string
  ): Promise<AxiosResponse<phraseActionResponse>> {
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
      // return error;
      throw new Error(error.message);
    }
  }
}

export default Phrase;
