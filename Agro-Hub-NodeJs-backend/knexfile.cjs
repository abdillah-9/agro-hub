// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'phpmyadmin',
      password: 'Sabdillah@1999',
      database: 'agrohub'
    },
    migrations: {
      directory: './migrations'
    }
  },

  staging: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'phpmyadmin',
      password: 'Sabdillah@1999',
      database: 'agrohub'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'phpmyadmin',
      password: 'Sabdillah@1999',
      database: 'agrohub'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }

};
