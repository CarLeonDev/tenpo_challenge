

const FAKE_TOKEN = "fdc32567-4567-4567-4567-456745674567";
export const FAKE_USER = {
  name: "Test User",
  email: "test@test.com",
  password: "test",
};

export const login = async ({email, password} :{email: string, password: string}) => {
  if (email === FAKE_USER.email && password === FAKE_USER.password) {
    return {
      status: 200,
      data: {
        token: FAKE_TOKEN,
        user: FAKE_USER,
      },
    };
  }

  return {
    status: 401,
    data: {
      message: "Invalid email or password",
    },
  };
};

export const authToken = async (token: string) => {
  if (token === FAKE_TOKEN) {
    return {
      status: 200,
      data: { user: FAKE_USER },
    };
  }

  return {
    status: 401,
    data: {
      message: "Invalid token",
    },
  };
};

export default {
  login,
  authToken,
};
