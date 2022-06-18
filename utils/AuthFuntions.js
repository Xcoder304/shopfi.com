import axios from "axios";
import Cookies from "js-cookie";

// login the user
export const LoginTheUser = async (userInfo) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/auth/login`,
    userInfo
  );

  if (data.success) {
    Cookies.remove("token");
    Cookies.remove("cart");
    Cookies.set("token", data.token);
  }

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
