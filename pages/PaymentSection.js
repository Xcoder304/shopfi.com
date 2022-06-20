import { useState } from "react";
import { Stepper, Button, Group } from "@mantine/core";
import Head from "next/head";
import UserDetails from "../components/paymentSection/UserDetails";
import { useSelector, useDispatch } from "react-redux";
import {
  selecteActivePaymentSection,
  NextPaymentStep,
  PrevPaymentSection,
} from "../Redux/features/OtherStateteSlice";
import axios from "axios";

const PaymentSec = ({ countriesName }) => {
  const active = useSelector(selecteActivePaymentSection);
  const dispatch = useDispatch();
  // const nextStep = () =>
  //   setActive((current) => (current < 4 ? current + 1 : current));
  // const prevStep = () =>
  //   setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Head>
        <title>Payment Section - Shopfi</title>
      </Head>
      <div className="pt-10 pb-5 px-16 bg-App_white_L">
        <Stepper active={active} breakpoint="sm" className="select-none">
          <Stepper.Step label="First step" description="Create an account">
            Step 1 content: Create an account
          </Stepper.Step>
          <Stepper.Step
            label="Second step"
            description="Verify Your order & Enter your details"
          >
            <UserDetails countriesName={countriesName} />
          </Stepper.Step>
          <Stepper.Step
            label="Third step"
            description="Selected Payment method"
          >
            Step 3 content: Get full access
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Comfirm Your order">
            Step 4 content: Verify email
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>

        <Group position="center" mt="xl">
          {active > 1 && (
            <Button
              variant="default"
              onClick={() => dispatch(PrevPaymentSection())}
            >
              Back
            </Button>
          )}
        </Group>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { data } = await axios.get("https://restcountries.com/v3.1/all");
  const res = data.map((data) => data.name.common);

  return {
    props: {
      countriesName: res,
    },
  };
};

export default PaymentSec;
