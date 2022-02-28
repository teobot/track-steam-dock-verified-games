import convict from 'convict';
require('dotenv').config()

export default convict({
  jwt_secret: {
    format: String,
    default: process.env.JWT_SECRET,
  },
  version: {
    format: String,
    default: "v1",
  },
  db: {
    username: {
      format: String,
      default: process.env.MONGODB_USERNAME,
    },
    password: {
      format: String,
      default: process.env.MONGODB_PASSWORD,
    },
    database: {
      format: String,
      default: process.env.MONGODB_DATABASE,
    },
  },
});