type HttpMethods = "GET" | "POST" | "DELETE" | "PUT"

export default class API {
  private getHeader(): Headers {
    const header = new Headers()
    header.append("Content-Type", "application/json")
    return header
  }

  private getFetchOptions(
    header: Headers,
    method: HttpMethods,
    body?: { [key: string]: any }
  ): RequestInit {
    return body
      ? { method: method, body: JSON.stringify(body), headers: header }
      : { method: method, headers: header }
  }

  public async registerUser(body: {
    username: string
    email: string
    password: string
  }) {
    const reqHeader = this.getHeader()
    const fetchOption = this.getFetchOptions(reqHeader, "POST", body)
    const URL = "/api/auth/register"
    const res = await fetch(URL, fetchOption)
    return res
  }

  public async loginUser(body: { email: string; password: string }) {
    const header = this.getHeader()
    const fetchOption = this.getFetchOptions(header, "POST", body)
    const URL = "/api/auth/login"
    const res = await fetch(URL, fetchOption)
    return res
  }

  public async logoutUser() {
    const header = this.getHeader()
    const fetchOption = this.getFetchOptions(header, "POST")
    const URL = "/api/auth/logout"
    const res = await fetch(URL, fetchOption)
    return res
  }
}
