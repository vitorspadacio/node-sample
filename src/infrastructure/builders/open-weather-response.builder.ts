import { faker } from '@faker-js/faker'

function createWeather() {
  return {
    dt: faker.number.int(),
    weather: [
      { main: faker.word.noun(), icon: faker.number.hex() },
    ],
    main: {
      temp: faker.number.int(2),
      humidity: faker.number.int(),
      pressure: faker.number.int(),
    },
    wind: {
      speed: faker.number.int(),
      deg: faker.number.int(360),
    },
  }
}

export default () => ({
  weather: createWeather(),
  forecast: { list: Array(10).fill(null).map(() => (createWeather())) },

  createWeatherForecast() {
    return [this.weather, this.forecast]
  },
})
