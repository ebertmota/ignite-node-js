const authConfig = {
  jwt: {
    secret_token: process.env.APP_SECRET_TOKEN || 'test',
  },
};

export { authConfig };
