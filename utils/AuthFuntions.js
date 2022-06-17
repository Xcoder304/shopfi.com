import axios from "axios";

// login the user
export const LoginTheUser = async (userInfo) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/auth/login`,
    userInfo
  );

  return data;
};

// registering the user
export const RegisterTheUser = async (userInfo) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/auth/register`,
    userInfo
  );

  return data;
};
