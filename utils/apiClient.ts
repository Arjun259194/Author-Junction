import { Post } from "@/database/model/Post";
import { User } from "@/database/model/User";
import { Schema } from "mongoose";

export type HttpMethods = "GET" | "POST" | "DELETE" | "PUT";

type IdT = Schema.Types.ObjectId;

interface CreatePostInput {
  title: Post["title"];
  content: Post["content"];
}

interface LoginUserInput {
  email: User["email"];
  password: User["password"];
}

interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
}

export default class API {
  private header: Headers;
  constructor() {
    this.header = new Headers();
    this.header.append("Content-Type", "application/json");
  }

  private getFetchOptions(
    method: HttpMethods,
    body?: { [key: string]: any }
  ): RequestInit {
    return body
      ? {
          method: method,
          body: JSON.stringify(body),
          headers: this.header,
        }
      : { method: method, headers: this.header };
  }

  // Authorization
  public async registerUser(
    body: RegisterUserInput
  ): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST", body);
    const URL = "/api/auth/register";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  public async loginUser(
    body: LoginUserInput
  ): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST", body);
    const URL = "/api/auth/login";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  public async logoutUser(): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST");
    const URL = "/api/auth/logout";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  // Post
  public async createPost(
    body: CreatePostInput
  ): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST", body);
    const URL = "/api/post";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  public async getPosts(): Promise<Response> {
    const fetchOption = this.getFetchOptions("GET");
    const URL = "/api/post";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  public async getPost(id: IdT): Promise<Response> {
    const fetchOption = this.getFetchOptions("GET");
    const URL = `/api/post/${id}`;
    const res = await fetch(URL, fetchOption);
    return res;
  }
}
