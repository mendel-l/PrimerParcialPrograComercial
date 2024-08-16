
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: null,
    DB: "recursos_humanos",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  