import axios, { AxiosError, AxiosResponse } from "axios";
import axiosToken from "../utils/axios-instance";

export type userType = {
  firstName: string;
  lastName: string;
  email: string;
  isFriend: boolean;
  slug: string;
  _id: string;
  authorName: string;
};

type loginResponse = {
  token: string;
  message: string;
  exp: number;
  data: {
    user: userType;
  };
};

type signupResponse = {
  token: string;
  message: string;
  exp: number;
  data: {
    user: {
      authorName: string;
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
};

// type loginReturn = {
// token: string;
// exp: number;
// data: {
// user: userType,
// }
// };

type signUpReturn = {
  token: string;
  exp: number;
};

interface userSettingsReturn {
  message: string;
  user: userType;
}

interface userPatchSettingsReturn {
  status: string;
  data: {
    user: userType;
  };
}

type userPatchBody = {
  firstName: string;
  lastName: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
};

class User {
  private id: string;
  private email: string;
  // private password;
  private firstName: string;
  private lastName: string;
  private authorName: string;
  private isFriend: boolean;
  private slug: string;
  // private initials: string;

  constructor(
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    authorName: string,
    isFriend: boolean,
    slug: string
  ) {
    this.id = id;
    this.email = email;
    // this.userId = "";
    this.firstName = firstName;
    this.lastName = lastName;
    this.authorName = authorName;
    this.isFriend = isFriend;
    this.slug = slug;
    // this.initials = firstName.split("")[0] + lastName.split("")[0];
  }

  // get getId() {
  // return this.id;
  // }

  // get getFirstName() {
  // return this.firstName;
  // }

  public getId() {
    return this.id;
  }

  public getEmail() {
    return this.email;
  }

  public getFirstName() {
    return this.firstName;
  }
  public getLastName() {
    return this.lastName;
  }

  public getAuthorName() {
    return this.authorName;
  }

  public getIsFriend() {
    return this.isFriend;
  }

  public getSlug() {
    return this.slug;
  }

  public getInitials() {
    return (
      this.firstName.split("")[0] + this.lastName.split("")[0]
    ).toUpperCase();
  }

  // public login(password: string): AxiosResponse<loginResponse> {}
  // public async login(password: string): Promise<loginReturn | string>  {
  // static async login(email: string, password: string): Promise<loginReturn | string> {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<loginResponse>> {
    // const email = this.email;
    let response: AxiosResponse<loginResponse>;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      // this.userId = response.data.data.user.id;
      // this.firstName = response.data.data.user.firstName;
      // this.lastName = response.data.data.user.lastName;
      // console.log("User Response: ", response);

      // return {
      // token: response.data.token,
      // exp: response.data.exp,
      // };
      return response;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error.response);
      // Send the error
      // return error.response!.data.message;
      if (error.response) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message);
      }
    }
  }

  static async signUp(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<AxiosResponse<loginResponse>> {
    // let response: AxiosResponse<signupResponse>;
    // let response: AxiosResponse<loginResponse>;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      // this.userId = response.data.data.user.id;
      // this.firstName = response.data.data.user.firstName;
      // this.lastName = response.data.data.user.lastName;
      // return {
      // token: response.data.token,
      // exp: response.data.exp,
      // };
      return response;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      // return error.response!.data.message;
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  }

  static async fetchUserSettings(
    token: string
  ): Promise<AxiosResponse<userSettingsReturn>> {
    // let response: AxiosResponse<userSettingsReturn>;
    // let newUser;
    try {
      const response = await axiosToken(token).get("/user/me");
      return response;
      // newUser = new User(
      // response.data.user.email,
      // response.data.user.firstName,
      // response.data.user.lastName
      // );
      // return newUser;
      // console.log(response);
    } catch (e) {
      console.log(e);
      const error = e as AxiosError<{ message: string }>;
      // return error.response!.data.message;
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  }

  static async patchUserSettings(
    token: string,
    oldPassword = "",
    newPassword = "",
    firstName: string,
    lastName: string,
    email: string
  ): Promise<AxiosResponse<userPatchSettingsReturn>> {
    // let response: AxiosResponse<userPatchSettingsReturn>;
    const bodyData: userPatchBody = {
      firstName,
      lastName,
      email,
    };
    // bodyData.firstName = this.firstName;
    // bodyData.lastName = this.lastName;
    // bodyData.email = this.email;
    if (oldPassword.length > 0) bodyData.oldPassword = oldPassword;
    if (newPassword.length > 0) bodyData.newPassword = newPassword;
    try {
      const response = await axiosToken(token).patch("/user/me", bodyData);
      return response;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      // return error.response!.data.message;
      if (error.response) {
        throw new Error(error.response.data.message);
      }
      throw new Error(error.message);
    }
  }
}

export default User;
