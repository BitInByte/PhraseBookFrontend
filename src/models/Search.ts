import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../utils/axios-instance";
import { userType } from "./User";

export type searchResponse = {
  data: {
    users: userType[];
  };
};

class Search {
  private slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  public getSlug() {
    return this.slug;
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
