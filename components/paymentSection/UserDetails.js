import { useState, useEffect } from "react";
import {
  Button,
  NativeSelect,
  TextInput,
  Input,
  Checkbox,
  Textarea,
} from "@mantine/core";
import { At, Phone } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  NextPaymentStep,
  selectUserDetails,
} from "../../Redux/features/OtherStateteSlice";
import { AddTempData } from "../../utils/DatabaseFuntions";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const UserDetails = ({ countriesName, tempProductdata }) => {
  const [products, setproducts] = useState(tempProductdata);
  const userInfo = useSelector(selectUserDetails);
  const [Errors, setErrors] = useState({
    status: false,
    message: "",
    input: "",
    specMsg: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    initialValues: {
      userId: "",
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      region: "",
      address: "",
      termsOfService: false,
    },
  });

  useEffect(() => {
    if (Cookies.get("temp_cart")) {
      setproducts(JSON.parse(Cookies.get("temp_cart")));
    }
  }, []);

  useEffect(() => {
    if (products.length == 0) {
      router.back();
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      form.setValues({
        userId: userInfo._id,
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        email: userInfo.email,
        phonenumber: userInfo.phonenumber,
        address: userInfo?.address ? userInfo?.address : "",
      });
    }
  }, []);

  const NEXT_PAYMENT_SEC = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (
      form.values.termsOfService == false &&
      form.values.firstname == "" &&
      form.values.lastname == "" &&
      form.values.email == "" &&
      form.values.phonenumber == "" &&
      form.values.region == "Pick one" &&
      form.values.address == ""
    ) {
      setErrors({ status: true, message: "Please fill all fields" });
    } else if (
      !form.values.email ||
      form.values.email == null ||
      regex.test(form.values.email) == false ||
      regex.test(form.values.email) == null
    ) {
      setErrors({
        status: true,
        specMsg: "Please enter a valid email",
        input: "email",
      });
    } else {
      setErrors({ status: false, message: "", input: "", specMsg: "" });
      dispatch(NextPaymentStep());
      Cookies.set("user_details", JSON.stringify(form.values));
    }
  };

  const Remove_temp_Product = async (index) => {
    products.splice(index, 1);
    await AddTempData(products);
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/PaymentSection`);
  };

  return (
    <div className="mt-10">
      {products.map(({ images, name, userSelectedQty, price }, index) => {
        return (
          <div
            className="flex items-center justify-between bg-white py-4 pl-2 pr-5 mb-3 rounded-md shadow-mdt flex-wrap"
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
            <Button
              type="submit"
              className="bg-[#F03E3E] hover:bg-[#c91919] h-[47px] w-[76px] transition-all duration-200 ease-out rounded-lg"
              onClick={() => Remove_temp_Product(index)}
            >
              <MdDelete className="text-3xl" />
            </Button>
          </div>
        );
      })}

      <div className="w-[90vw] lg:w-[70vw]  mx-auto">
        <form
          onSubmit={form.onSubmit((values) => console.log("register done"))}
          className="w-full  mt-14"
        >
          <div className="w-full flex flex-col items-start md:flex-row space-y-3 md:space-x-3 md:space-y-0">
            <TextInput
              required
              label="First Name"
              placeholder="Your first name"
              size="lg"
              radius="md"
              error={Errors.status && Errors?.message}
              className="md:flex-1 w-full mx-auto"
              {...form.getInputProps("firstname")}
            />
            <TextInput
              required
              label="Last Name"
              placeholder="Your last name"
              size="lg"
              radius="md"
              error={Errors.status && Errors?.message}
              className="md:flex-1 w-full mx-auto"
              {...form.getInputProps("lastname")}
            />
          </div>

          <TextInput
            icon={<At />}
            required
            label="Email"
            placeholder="your@email.com"
            size="lg"
            radius="md"
            error={
              Errors.status && Errors.input == "email"
                ? Errors.specMsg
                : Errors.message
            }
            className="flex-1 mx-auto mt-4"
            {...form.getInputProps("email")}
          />

          <Input
            icon={<Phone />}
            required
            placeholder="***********"
            label="Phone Number"
            size="lg"
            radius="md"
            error={Errors.status && Errors?.message}
            className="flex-1 mx-auto mt-3"
            {...form.getInputProps("phonenumber")}
          />

          <NativeSelect
            data={countriesName}
            label="Select your Region"
            className="flex-1 mx-auto mt-3"
            size="md"
            radius="md"
            required
            {...form.getInputProps("region")}
          />
          <Textarea
            placeholder="abc#31311"
            label="Your address"
            className="flex-1 mx-auto mt-3"
            radius="md"
            size="md"
            autosize
            required
            error={Errors.status && Errors?.message}
            {...form.getInputProps("address")}
          />

          <Checkbox
            required
            className="mt-4 lg:mt-3 cursor-pointer"
            label="I agree to the All terms of service"
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <div className="w-full flex items-center justify-center space-x-3">
            <Button
              type="submit"
              onClick={() => router.back()}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 ease-out"
            >
              Go Back
            </Button>
            <Button
              type="submit"
              onClick={NEXT_PAYMENT_SEC}
              className="bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out"
            >
              Next step
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetails;
