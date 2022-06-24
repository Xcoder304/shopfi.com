import React from "react";
import { Stepper } from "@mantine/core";
import Head from "next/head";
import { useSelector } from "react-redux";
import { selecteActivePaymentSection } from "../Redux/features/OtherStateteSlice";
import axios from "axios";
import UserDetails from "../components/paymentSection/UserDetails";
import PaymentMethod from "../components/paymentSection/PaymentMethod";
import ComfirmOrder from "../components/paymentSection/ComfirmOrder";
import { fetchTempData } from "../utils/DatabaseFuntions";
import ThanksForOrder from "../components/paymentMethods/ThanksForOrder";

const PaymentSec = ({ countriesName, tempdata }) => {
  const active = useSelector(selecteActivePaymentSection);

  return (
    <>
      <Head>
        <title>Payment Section - Shopfi</title>
      </Head>
      <div className="pt-10 pb-5 px-16 bg-App_white_L">
        <Stepper
          active={active}
          breakpoint="sm"
          className="select-none"
          color="green"
        >
          <Stepper.Step label="First step" description="Create an account">
            Step 1 content: Create an account
          </Stepper.Step>

          <Stepper.Step
            label="Second step"
            description="Verify Your order & Enter your details"
          >
            <UserDetails
              countriesName={countriesName}
              tempProductdata={tempdata}
            />
          </Stepper.Step>

          <Stepper.Step
            label="Third step"
            description="Selected Payment method"
          >
            <PaymentMethod />
          </Stepper.Step>

          <Stepper.Step label="Final step" description="Comfirm Your order">
            <ComfirmOrder tempProductdata={tempdata} />
          </Stepper.Step>

          <Stepper.Completed>
            <ThanksForOrder />
          </Stepper.Completed>
        </Stepper>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  // fetching the countries data from the API
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  const res = data.map((data) => data.name.common);

  // fetching the temp data from the server
  const tempdata = await fetchTempData();

  return {
    props: {
      countriesName: res,
      tempdata,
    },
  };
};

export default PaymentSec;
