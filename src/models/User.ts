import axios, { AxiosError, AxiosResponse } from "axios";
import axiosToken from "../utils/axios-instance";

type loginResponse = {
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

type loginReturn = {
  token: string;
  exp: number;
};

type signUpReturn = {
  token: string;
  exp: number;
};

type userSettingsReturn = {
  message: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

class User {
  private userId: string;
  private email: string;
  // private password;
  private firstName: string;
  private lastName: string;

  constructor(email = "", firstName = "", lastName = "") {
    this.email = email;
    this.userId = "";
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // public login(password: string): AxiosResponse<loginResponse> {}
  // public async login(password: string): Promise<loginReturn | string>  {
  public async login(password: string): Promise<loginReturn | string> {
    const email = this.email;
    let response: AxiosResponse<loginResponse>;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      this.userId = response.data.data.user.id;
      this.firstName = response.data.data.user.firstName;
      this.lastName = response.data.data.user.lastName;

      return {
        token: response.data.token,
        exp: response.data.exp,
      };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      console.log(error.response);
      // Send the error
      return error.response!.data.message;
    }
  }

  public async signUp(password: string): Promise<signUpReturn | string> {
    let response: AxiosResponse<signupResponse>;
    try {
      response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password,
        }
      );
      this.userId = response.data.data.user.id;
      this.firstName = response.data.data.user.firstName;
      this.lastName = response.data.data.user.lastName;
      return {
        token: response.data.token,
        exp: response.data.exp,
      };
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return error.response!.data.message;
    }
  }

  public static async fetchUserSettings(token: string) {
    let response: AxiosResponse<userSettingsReturn>;
    let newUser;
    try {
      response = await axiosToken(token).get("/user/me");
      newUser = new User(
        response.data.user.email,
        response.data.user.firstName,
        response.data.user.lastName
      );
      return newUser;
      // console.log(response);
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      return error.response!.data.message;
    }
  }

  public getUserId() {
    return this.userId;
  }
  public getFirstName() {
    return this.firstName;
  }
  public getLastName() {
    return this.lastName;
  }
  public getEmail() {
    return this.email;
  }
}

export default User;
