import knex from 'knex'

export const getConfig = (withoutDatabase = false) => ({
  client: 'mysql2',
  connection: () => ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: withoutDatabase ? undefined : process.env.DB_NAME,
  }),
  migrations: { tableName: 'migrations' },
  debug: false,
})

export default knex(getConfig())
