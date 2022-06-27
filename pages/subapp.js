import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { ChangeCartValue } from "../Redux/features/ProductSlice";
import { fetchCartDataWithApi } from "../utils/DatabaseFuntions";
import { setUser, setUserDetails } from "../Redux/features/OtherStateteSlice";
import axios from "axios";

const Subapp = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const info = {
      token: Cookies.get("token"),
    };
    const data = await fetchCartDataWithApi(info);
    Cookies.remove("cart");
    Cookies.set("cart", JSON.stringify(data.items));
    dispatch(ChangeCartValue(data.items));
  };

  useEffect(() => {
    fetchData();
    if (Cookies.get("token")) {
      dispatch(setUser(Cookies.get("token")));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/auth/getUser`,
        {
          token: Cookies.get("token"),
        }
      );
      dispatch(setUserDetails(data));
    };

    fetchData();
  }, []);
};

export default Subapp;
