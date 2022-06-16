import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { ChangeCartValue } from "../Redux/features/ProductSlice";
import { fetchApiData } from "../utils/DatabaseFuntions";

const Subapp = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    const data = await fetchApiData("getCartProduct");
    Cookies.remove("cart");
    Cookies.set("cart", JSON.stringify(data));

    dispatch(ChangeCartValue(data));
  };

  useEffect(() => {
    fetchData();
  });
};
export default Subapp;
