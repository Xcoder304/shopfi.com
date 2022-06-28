import { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "@mantine/form";
import { Button, Checkbox, Input } from "@mantine/core";
import { Id, BuildingBank } from "tabler-icons-react";
import { AddOrder } from "../../utils/DatabaseFuntions";
import { CreateRamdomOrderID } from "../../utils/UtilsFuntions";
import { useDispatch, useSelector } from "react-redux";
import { NextPaymentStep } from "../../Redux/features/OtherStateteSlice";
import {
  ChangeCartValue,
  selectecart,
} from "../../Redux/features/ProductSlice";

const Bank = ({ open, setopen, totalPrice, UserDetails, products }) => {
  const [loading, setlaoding] = useState(false);
  const theme = useMantineTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectecart);

  const form = useForm({
    initialValues: {
      BankAccountNum: "",
      IdCardNum: "",
      isTransitionComfirm: false,
    },
  });

  const AddTheOrder = async () => {
    setlaoding(true);
    const orderID = CreateRamdomOrderID();

    let data = {
      orderId: orderID,
      userDatils: {
        ...UserDetails,
        Name: `${UserDetails.firstname} ${UserDetails.lastname}`,
      },
      paymentMethod: "Bank",
      paymentInfo: form.values,
      products: products,
      total: totalPrice,
      delivery: false,
    };

    await AddOrder(data);
    //remove from the data state
    let newCartArr;
    products.forEach((data) => {
      newCartArr = cartItems.filter((item) => item?._id !== data?._id);
    });

    dispatch(ChangeCartValue(newCartArr));

    setlaoding(false);
    setopen(false);
    toast.success("Order Placed Successfully");
    dispatch(NextPaymentStep());
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        opened={open}
        onClose={() => setopen(false)}
        title={"Bank Payment"}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.7}
        overlayBlur={7}
        zIndex={400}
        centered
      >
        <h3 className="capitalize text-3xl text-orange-600 italic font-bold">
          Your Bank Account
        </h3>

        <form
          onSubmit={form.onSubmit((values) => console.log("register done"))}
          className="w-[90%] mx-auto mt-6"
        >
          <Input
            icon={<BuildingBank />}
            required
            placeholder="***********"
            label="Bank Account Number"
            size="lg"
            radius="md"
            className="flex-1 mx-auto mt-2"
            hideControls
            {...form.getInputProps("BankAccountNum")}
          />

          <Input
            icon={<Id />}
            required
            placeholder="***********"
            label="Your Id Card Number"
            size="lg"
            radius="md"
            className="flex-1 mx-auto mt-4"
            hideControls
            {...form.getInputProps("IdCardNum")}
          />

          <Checkbox
            required
            className="mt-6 lg:mt-5 cursor-pointer"
            label="Do you comfirm this transitions ?"
            {...form.getInputProps("isTransitionComfirm", { type: "checkbox" })}
          />

          <div className="w-full flex items-center justify-center">
            <Button
              type="submit"
              disabled={loading ? true : false}
              className="bg-orange-600 text-white text-lg mt-5 transition-all duration-200 ease-out hover:bg-orange-700 hover:shadow-md lg:w-[80%]  w-[100%] h-12"
              onClick={AddTheOrder}
            >
              Pay ${totalPrice}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Bank;
