import db from "./db";
import axios from "axios";

export const LoginTheUser = async (userInfo) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/auth/login`,
      userInfo
    );
    console.log(data);
    alert("login successfully completed");
  } catch (err) {
    alert(err.message);
  }
};
