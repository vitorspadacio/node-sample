export default (code: number, payload: unknown, message?: string) => {
  let response: any = { code, data: payload }
  if (message) response = { ...response, message }
  return response
}
