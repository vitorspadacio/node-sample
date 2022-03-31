import knex from 'knex'

export default knex({
  client: 'mysql2',
  connection: () => ({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
  migrations: { tableName: 'migrations' },
  debug: Boolean(process.env.DB_DEBUG),
})
