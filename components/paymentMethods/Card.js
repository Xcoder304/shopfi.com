import { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "@mantine/form";
import { Button, Checkbox, NumberInput, TextInput } from "@mantine/core";
import { CreditCard, Key } from "tabler-icons-react";
import Image from "next/image";
import { AddOrder } from "../../utils/DatabaseFuntions";
import { CreateRamdomOrderID } from "../../utils/UtilsFuntions";
import { useRouter } from "next/router";

const Card = ({ open, setopen, totalPrice, UserDetails, products }) => {
  const [loading, setlaoding] = useState(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      cardNum: "",
      cardName: "",
      ExpirationDate: "",
      cvv: "",
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
      paymentMethod: "Credit/Debit",
      paymentInfo: form.values,
      products: products,
      total: totalPrice,
      delivery: false,
    };

    await AddOrder(data);
    setlaoding(false);
    setopen(false);
    toast.success("Order Placed Successfully");
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/PaymentSection`);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Modal
        opened={open}
        onClose={() => setopen(false)}
        title={"Credit/Debit Card Payment"}
        overlayColor={theme.colors.dark[9]}
        overlayOpacity={0.7}
        overlayBlur={7}
        zIndex={400}
        centered
      >
        <h3 className="capitalize text-3xl text-red-600 italic font-bold">
          you card details
        </h3>
        <div className="flex items-start">
          <Image
            src="/assist/mastercart-logo-sm.png"
            alt="user profile image"
            width="50"
            height="50"
          ></Image>
          <Image
            src="/assist/visa-logo-sm.png"
            alt="user profile image"
            width="50"
            height="50"
          ></Image>
        </div>

        <form
          onSubmit={form.onSubmit((values) => console.log("register done"))}
          className="w-[90%] mx-auto mt-6"
        >
          <NumberInput
            icon={<Key />}
            required
            placeholder="***********"
            label="Card Number"
            size="lg"
            radius="md"
            className="flex-1 mx-auto mt-2"
            hideControls
            maxLength={20}
            {...form.getInputProps("cardNum")}
          />

          <TextInput
            icon={<CreditCard />}
            required
            placeholder="abcd"
            label="Name on Card"
            size="lg"
            radius="md"
            className="flex-1 mx-auto mt-4"
            hideControls
            {...form.getInputProps("cardName")}
          />

          <div className="w-full flex flex-col items-start md:flex-row space-y-3 md:space-x-3 md:space-y-0 mt-4">
            <div className="md:flex-1 w-full mx-auto">
              <label
                className="block text-gray-700 text-sm font-bold mb-1 md:mb-2"
                htmlFor="nameoncard"
              >
                Expirationdate
              </label>
              <input
                type="date"
                required
                id="Expirationdate"
                className="mb-3 block px-2.5 py-2 md:py-4  w-full text-sm text-gray-900 bg-gray-50 rounded-md border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="Expirationdate"
                {...form.getInputProps("ExpirationDate")}
              />
            </div>
            <NumberInput
              required
              placeholder="Cvv"
              label="Cvv"
              size="lg"
              radius="md"
              className="md:flex-1 w-full mx-auto"
              hideControls
              maxLength={5}
              {...form.getInputProps("cvv")}
            />
          </div>

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
              className="bg-red-600 text-white text-lg mt-5 transition-all duration-200 ease-out hover:bg-red-700 hover:shadow-md lg:w-[80%]  w-[100%] h-12"
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

export default Card;
