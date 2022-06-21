import { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  NativeSelect,
  TextInput,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { At, Phone } from "tabler-icons-react";
import { useDispatch } from "react-redux";
import { PrevPaymentSection } from "../../Redux/features/OtherStateteSlice";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import Paypal from "../paymentMethods/Paypal";
import Bank from "../paymentMethods/Bank";
import EasyPasia from "../paymentMethods/EasyPasia";
import Card from "../paymentMethods/Cart";

const ComfirmOrder = ({ tempProductdata }) => {
  const [products, setproducts] = useState(tempProductdata);
  const [UserDetails, setuserDetails] = useState(null);
  const [isModalOpen, setisModalOpen] = useState(false);

  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      region: "",
      address: "",
      paymentMethod: "",
      isOrderComfirm: false,
    },
  });

  useEffect(() => {
    if (Cookies.get("user_details")) {
      setuserDetails(JSON.parse(Cookies.get("user_details")));
    }
  }, []);

  useEffect(() => {
    if (UserDetails) {
      form.setValues({
        firstname: UserDetails.firstname,
        lastname: UserDetails.lastname,
        email: UserDetails.email,
        phonenumber: UserDetails.phonenumber,
        region: UserDetails.region,
        address: UserDetails.address,
        paymentMethod: UserDetails.paymentMethod,
      });
    }
  }, [UserDetails]);

  const Comfirm_The_Order = () => {
    if (form.values.isOrderComfirm == false) {
      toast.error("Please Comfirm the Order");
    }
    if (form.values.isOrderComfirm == true) {
      setisModalOpen(true);
    }
  };

  return (
    <div className="w-full">
      {UserDetails?.paymentMethod == "paypal" && (
        <Paypal
          open={isModalOpen}
          setopen={setisModalOpen}
          totalPrice={products
            .map((data) => data.price * data.userSelectedQty)
            .reduce((a, b) => a + b, 0)}
        />
      )}
      {UserDetails?.paymentMethod == "bank" && (
        <Bank
          open={isModalOpen}
          setopen={setisModalOpen}
          totalPrice={products
            .map((data) => data.price * data.userSelectedQty)
            .reduce((a, b) => a + b, 0)}
        />
      )}
      {UserDetails?.paymentMethod == "easypasia" && (
        <EasyPasia
          open={isModalOpen}
          setopen={setisModalOpen}
          totalPrice={products
            .map((data) => data.price * data.userSelectedQty)
            .reduce((a, b) => a + b, 0)}
        />
      )}
      {UserDetails?.paymentMethod == "card" && (
        <Card
          open={isModalOpen}
          setopen={setisModalOpen}
          totalPrice={products
            .map((data) => data.price * data.userSelectedQty)
            .reduce((a, b) => a + b, 0)}
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex mt-7 items-start justify-start flex-col space-y-7 space-x-0 lg:flex-row lg:space-x-7 lg:space-y-0 lg:justify-between">
        <div className="w-[90vw] lg:w-[70%]">
          {products.map(({ images, name, userSelectedQty, price }, index) => {
            return (
              <div
                className="flex items-center sm:justify-between bg-white py-3 pl-2 pr-5 mb-3 rounded-md shadow-md sm:flex-wrap  w-full"
                key={index}
              >
                <div className="flex items-center space-x-2 select-none py-2 px-4 lg:py-0">
                  <img
                    src={images[0].url}
                    className="w-[130px] h-[100px] object-contain "
                  />
                  <h2 className="font-bold text-lg text-App_black_L">{name}</h2>
                </div>
                <div className="text-center py-2 px-4 lg:py-0">
                  <h4 className="font-medium text-lg select-none text-App_black_L capitalize">
                    price
                  </h4>
                  <span className="font-medium text-base text-App_green_L select-none">
                    ${price}
                  </span>
                </div>
                <div className="text-center flex flex-col items-center py-2 px-4 lg:py-0">
                  <h4 className="font-medium text-lg select-none text-App_black_L capitalize">
                    select Qty
                  </h4>

                  <span className="font-bold text-xl text-App_green_L">
                    {userSelectedQty}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white w-[90vw] sm:w-[60%] lg:w-[30%] py-6 px-4 rounded-md shadow-md">
          <form
            onSubmit={form.onSubmit((values) => console.log("register done"))}
            className="w-full"
          >
            <div className="w-full flex flex-col items-start md:flex-row space-y-3 md:space-x-3 md:space-y-0">
              <TextInput
                required
                label="First Name"
                placeholder="Your first name"
                size="md"
                radius="md"
                className="md:flex-1 w-full mx-auto"
                {...form.getInputProps("firstname")}
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Your last name"
                size="md"
                radius="md"
                className="md:flex-1 w-full mx-auto"
                {...form.getInputProps("lastname")}
              />
            </div>

            <TextInput
              icon={<At />}
              required
              label="Email"
              placeholder="your@email.com"
              size="md"
              radius="md"
              className="flex-1 mx-auto mt-2"
              {...form.getInputProps("email")}
            />

            <NumberInput
              icon={<Phone />}
              required
              placeholder="***********"
              label="Phone Number"
              size="md"
              radius="md"
              className="flex-1 mx-auto mt-2"
              hideControls
              {...form.getInputProps("phonenumber")}
            />

            <NativeSelect
              data={[form.values.region]}
              placeholder="Pick one"
              label="Select your Region"
              className="flex-1 mx-auto mt-2"
              size="md"
              radius="md"
              required
              {...form.getInputProps("region")}
            />
            <Textarea
              placeholder="abc#31311"
              label="Your address"
              className="flex-1 mx-auto mt-2"
              radius="md"
              size="md"
              autosize
              required
              {...form.getInputProps("address")}
            />

            <TextInput
              placeholder="Payment method"
              label="Your Payment method"
              disabled
              required
              className="flex-1 mx-auto mt-2"
              radius="md"
              size="md"
              {...form.getInputProps("paymentMethod")}
            />

            <Checkbox
              required
              className="mt-6 lg:mt-3 cursor-pointer"
              label="Do you comfirm your order ?"
              {...form.getInputProps("isOrderComfirm", { type: "checkbox" })}
            />
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                className="bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out mt-4 w-[80%] h-12 text-lg"
                onClick={Comfirm_The_Order}
              >
                Proceed to Payment
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-full flex items-center justify-center mt-8 space-x-3">
        <Button
          variant="default"
          onClick={() => dispatch(PrevPaymentSection())}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ComfirmOrder;
