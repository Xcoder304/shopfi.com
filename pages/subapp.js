import { useEffect, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { ChangeCartValue } from "../Redux/features/ProductSlice";
import { fetchCartDataWithApi } from "../utils/DatabaseFuntions";
import { setUser } from "../Redux/features/OtherStateteSlice";

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
};

export default Subapp;
