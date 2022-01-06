const { Pool } = require('pg')
import config from '../config'

const pool = new Pool({
  user: config.db_POSTGRES.user,
  host: config.db_POSTGRES.host,
  database: config.db_POSTGRES.database,
  password: config.db_POSTGRES.password,
  port: config.db_POSTGRES.port,
})


module.exports=pool