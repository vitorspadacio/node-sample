import { faker } from '@faker-js/faker'

export default () => ({
  openGateResponse: {
    results: [{
      components: {
        city: faker.location.city(),
        state_code: faker.location.state(),
        country: faker.location.country(),
      },
      geometry: {
        lat: faker.number.int(),
        lng: faker.number.int(),
      },
    }],
  },

  create() {
    return this.openGateResponse
  },
})
