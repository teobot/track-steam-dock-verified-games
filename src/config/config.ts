const convict = require('convict');
const dotenv = require("dotenv").config();

export default convict({
  db: {
    cluster: {
      doc: "The cluster name",
      format: String,
      default: process.env.DB_CLUSTER
    },
    database: {
      doc: "The database name",
      format: String,
      default: process.env.DB_DATABASE
    },
    username: {
      doc: "The database username",
      format: String,
      default: process.env.DB_USERNAME
    },
    password: {
      doc: "The database password",
      format: String,
      default: process.env.DB_PASSWORD
    }
  }
})