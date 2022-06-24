import { useState } from "react";
import { Chips, Chip } from "@mantine/core";
import { useDispatch } from "react-redux";
import {
  NextPaymentStep,
  PrevPaymentSection,
} from "../../Redux/features/OtherStateteSlice";
import { Button } from "@mantine/core";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";

const PaymentMethod = () => {
  const [UserDetails, setUserDetails] = useState(
    JSON.parse(Cookies.get("user_details"))
  );
  const [value, setValue] = useState("");

  const dispatch = useDispatch();

  const NEXT_PAYMENT_SEC = () => {
    if (value == "") {
      toast.error("Please select a payment method");
    } else {
      Cookies.remove("user_details");
      Cookies.set(
        "user_details",
        JSON.stringify({ ...UserDetails, paymentMethod: value })
      );
      dispatch(NextPaymentStep());
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center mt-7">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[90vw] md:w-[80%] lg:w-[60%] py-3 pb-12 px-4 bg-white rounded-md shadow-md">
        <h1 className="text-App_black_L text-xl font-medium capitalize">
          select your Payment Method
        </h1>

        <div className="w-full flex items-center justify-center mt-7">
          <Chips
            color="green"
            spacing="md"
            size="lg"
            value={value}
            onChange={setValue}
          >
            <Chip value="paypal">Paypal</Chip>
            <Chip value="bank">Bank Account</Chip>
            <Chip value="card">Credit/Debit Card</Chip>
            <Chip value="easypasia">Easypasia</Chip>
          </Chips>
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-8 space-x-3">
        <Button
          variant="default"
          onClick={() => dispatch(PrevPaymentSection())}
        >
          Back
        </Button>
        <Button
          type="submit"
          onClick={NEXT_PAYMENT_SEC}
          className="bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out"
        >
          Next step
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethod;
