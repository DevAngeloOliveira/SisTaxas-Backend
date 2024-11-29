module.exports = {
  database: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true
    }
  },
  jwt: {
    secret: 'sistaxas2024test',
    expiresIn: '1d'
  },
  server: {
    port: 5001
  }
}; 