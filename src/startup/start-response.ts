import response from 'koa-response2'

export default () => response({
  format: (code, payload, message) => ({ code, data: payload, message }),
})
