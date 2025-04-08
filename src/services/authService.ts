import { FAKE_TOKEN, FAKE_USER } from "@/contants/constants";

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
