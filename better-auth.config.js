module.exports = {
    providers: [
      {
        id: 'credentials',
        type: 'credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        authorize: async (credentials) => {
          // This is a simple check; replace it with your own logic later
          if (credentials.username === 'admin' && credentials.password === 'password') {
            return { id: '1', name: 'Admin', role: 'admin' };
          }
          return null;
        },
      },
    ],
    pages: {
      signIn: '/auth/login',
    },
  };