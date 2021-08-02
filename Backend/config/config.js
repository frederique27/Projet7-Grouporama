module.exports = {
    development: {
      username: "root",
      password: "TESTtest1234!",
      database: "groupomaniap7",
      host: "127.0.0.1",
      dialect: "mysql",
      pool: {
              max: 5,
              min: 0,
              acquire: 30000,
              idle: 10000
            }
    },
    test: {
      username: "root",
      password: "TESTtest1234!",
      database: "groupomania_test",
      host: "127.0.0.1",
      dialect: "mysql"
    },
    production: {
      username: "root",
      password: "TESTtest1234!",
      database: "groupomania_production",
      host: "127.0.0.1",
      dialect: "mysql"
    }

  };