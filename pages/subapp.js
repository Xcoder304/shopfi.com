import { useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { ChangeCartValue } from "../Redux/features/ProductSlice";
import { fetchCartDataWithApi } from "../utils/DatabaseFuntions";
import { setUser, setUserDetails } from "../Redux/features/OtherStateteSlice";
import { GetTheUser } from "../utils/AuthFuntions";

const Subapp = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await fetchCartDataWithApi();
    Cookies.remove("cart");
    Cookies.set("cart", JSON.stringify(data));
    dispatch(ChangeCartValue(data));
  };

  useEffect(() => {
    fetchData();
    if (Cookies.get("token")) {
      dispatch(setUser(Cookies.get("token")));
    }
  });

  useEffect(() => {
    const fetch = async () => {
      const data = {
        token: Cookies.get("token"),
      };
      const userInfo = await GetTheUser(data);
      dispatch(setUserDetails(userInfo));
    };
    fetch();
  }, []);
};

export default Subapp;
