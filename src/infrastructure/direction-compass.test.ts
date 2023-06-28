import { faker } from '@faker-js/faker'
import { CompassDirections, degreesToCompass } from './direction-compass'

describe('DirectionCompass', () => {
  test.each([
    [faker.number.int({ min: 0, max: 29 }), CompassDirections.East],
    [faker.number.int({ min: 30, max: 59 }), CompassDirections.NorthEast],
    [faker.number.int({ min: 60, max: 119 }), CompassDirections.North],
    [faker.number.int({ min: 120, max: 149 }), CompassDirections.NorthWest],
    [faker.number.int({ min: 150, max: 209 }), CompassDirections.West],
    [faker.number.int({ min: 210, max: 239 }), CompassDirections.SouthWest],
    [faker.number.int({ min: 240, max: 299 }), CompassDirections.South],
    [faker.number.int({ min: 300, max: 329 }), CompassDirections.SouthEast],
    [faker.number.int({ min: 330, max: 359 }), CompassDirections.East],
    [361, CompassDirections.North],
  ])('deve exibir a direção correta no compasso para o angulo fornecido', (input, expected) => {
    const direction = degreesToCompass(input)
    expect(direction).toEqual(expected)
  })
})
