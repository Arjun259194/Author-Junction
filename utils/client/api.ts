function getHeader(): Headers {
  const header = new Headers()
  header.append("Content-Type", "application/json")
  return header
}

type HttpMethods = "GET" | "POST" | "DELETE" | "PUT"
function getFetchOptions(
  header: Headers,
  method: HttpMethods,
  body: { [key: string]: any }
): RequestInit {
  return {
    method: method,
    body: JSON.stringify(body),
    headers: header,
  }
}

/**
 * make request to /api/auth/register end point
 */
export async function registerPost(body: {
  username: string
  email: string
  password: string
}) {
  const reqHeader = getHeader()
  const fetchOption = getFetchOptions(reqHeader, "POST", body)
  const res = await fetch("/api/auth/register", fetchOption)
  return res
}

/**
 * make request to /api/auth/ end point
 */
export async function loginPost(body: { email: string; password: string }) {
  const header = getHeader()
  const fetchOption = getFetchOptions(header, "POST", body)
  const res = await fetch("/api/auth/login", fetchOption)
  return res
}
