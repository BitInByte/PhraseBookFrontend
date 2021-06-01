import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../utils/axios-instance";
import { userType } from "./User";

export type searchResponse = {
  data: {
    users: userType[];
  };
};

class Search {
  private id: string;
  private slug: string;
  private authorName: string;

  constructor(id: string, slug: string, firstName: string, lastName: string) {
    this.id = id;
    this.slug = slug;
    this.authorName = firstName + " " + lastName;
  }

  public getId() {
    return this.id;
  }

  public getSlug() {
    return this.slug;
  }

  public getAuthorName() {
    return this.authorName;
  }

  static async getSearch(
    token: string,
    slug: string
  ): Promise<AxiosResponse<searchResponse>> {
    let response: AxiosResponse<searchResponse>;
    try {
      response = await axiosInstance(token).get(
        `${process.env.REACT_APP_API_URL}/user/find/${slug}`
      );
      console.log("Search Response: ", response);
      // return response.data;
      return response;
    } catch (err) {
      const error = err as AxiosError;
      console.log(err);
      throw new Error(error.message);
    }
  }
}

export default Search;
