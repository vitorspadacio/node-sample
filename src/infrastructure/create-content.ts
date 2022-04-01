export default (code: number, payload: unknown, message?: string) => (
  { code, data: payload, message })
