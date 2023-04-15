import { Post } from "@/database/model/Post"
import { User } from "@/database/model/User"

export type HttpMethods = "GET" | "POST" | "DELETE" | "PUT"

interface CreatePostInput {
  title: Post["title"]
  description: Post["description"]
  content: Post["content"]
}

interface LoginUserInput {
  email: User["email"]
  password: User["password"]
}

interface RegisterUserInput {
  username: string
  email: string
  password: string
}

export default class API {
  private header: Headers
  constructor() {
    this.header = new Headers()
    this.header.append("Content-Type", "application/json")
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
      : { method: method, headers: this.header }
  }

  // Authorization
  public async registerUser(body: RegisterUserInput): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST", body)
    const URL = "/api/auth/register"
    const response = await fetch(URL, fetchOption)
    return response
  }

  public async loginUser(body: LoginUserInput): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST", body)
    const URL = "/api/auth/login"
    const response = await fetch(URL, fetchOption)
    return response
  }

  public async logoutUser(): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST")
    const URL = "/api/auth/logout"
    const response = await fetch(URL, fetchOption)
    return response
  }

  // Post
  public async createPost(body: CreatePostInput): Promise<Response> {
    const fetchOption = this.getFetchOptions("POST", body)
    const URL = "/api/post"
    const response = await fetch(URL, fetchOption)
    return response
  }

  public async getPosts(): Promise<Response> {
    const fetchOption = this.getFetchOptions("GET")
    const URL = "/api/post"
    const response = await fetch(URL, fetchOption)
    return response
  }

  public async getPost(id: string): Promise<Response> {
    const fetchOption = this.getFetchOptions("GET")
    const URL = `/api/post/${id}`
    const response = await fetch(URL, fetchOption)
    return response
  }

  public async likePost(id: string): Promise<Response> {
    const fetchOption = this.getFetchOptions("PUT")
    const URL = `/api/post/like/${id}`
    const response = await fetch(URL, fetchOption)
    return response
  }

  public async likedPost(): Promise<Response> {
    const fetchOption = this.getFetchOptions("GET")
    const URL = "/api/user/liked"
    const response = await fetch(URL, fetchOption)
    return response
  }

  public async getAuthorPost(): Promise<Response> {
    const fetchOption = this.getFetchOptions("GET")
    const URL = "/api/user/posts"
    const response = await fetch(URL, fetchOption)
    return response
  }
}
