import { Post } from "@/database/model/Post";

type HttpMethods = "GET" | "POST" | "DELETE" | "PUT";

export default class API {
  private header: Headers;

  constructor() {
    this.header = new Headers();
    this.header.append("Content-Type", "application/json");
  }

  private getFetchOptions(method: HttpMethods, body?: { [key: string]: any }): RequestInit {
    return body ? { method: method, body: JSON.stringify(body), headers: this.header } : { method: method, headers: this.header };
  }

  // Authorization
  public async registerUser(body: { username: string; email: string; password: string }) {
    const fetchOption = this.getFetchOptions("POST", body);
    const URL = "/api/auth/register";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  public async loginUser(body: { email: string; password: string }) {
    const fetchOption = this.getFetchOptions("POST", body);
    const URL = "/api/auth/login";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  public async logoutUser() {
    const fetchOption = this.getFetchOptions("POST");
    const URL = "/api/auth/logout";
    const res = await fetch(URL, fetchOption);
    return res;
  }

  // Post
  public async createPost(body: { title: Post["title"]; content: Post["content"] }) {
    const fetchOption = this.getFetchOptions("POST", body);
    const URL = "/api/post";
    const res = await fetch(URL, fetchOption);
    return res;
  }
}
