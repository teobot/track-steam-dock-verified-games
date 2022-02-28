import convict from 'convict';
require('dotenv').config()

export default convict({
  github: {
    token: {
      format: String,
      default: process.env.GITHUB_TOKEN,
    },
    gist_id: {
      format: String,
      default: process.env.GIST_ID,
    },
  },
});