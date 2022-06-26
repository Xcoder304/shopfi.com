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

// get the user
export const GetTheUser = async (token) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/auth/getUser`,
    token
  );

  return data;
};

// change user details
export const ChangeUserDetails = async (userdata) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/auth/changeUserDetails`,
    userdata
  );

  return data;
};

// admin
export const GetAllUsers = async () => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/getUsers`
  );

  return data;
};

export const EditUserDetails = async (userdata) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/editUserDetails`,
    userdata
  );

  return data;
};

export const FetchTheUserByID = async (userId) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/getUserById`,
    { id: userId }
  );

  return data;
};

export const DeleteTheUserByID = async (userId) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/admin/deleteUserById`,
    { id: userId }
  );

  return data;
};
