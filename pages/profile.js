import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Button,
  TextInput,
  Input,
  Textarea,
  PasswordInput,
} from "@mantine/core";
import { At, Phone, Lock } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { ChangeUserDetails } from "../utils/AuthFuntions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { UploadImage } from "../utils/UtilsFuntions";
import { selectUserDetails } from "../Redux/features/OtherStateteSlice";
import { useSelector } from "react-redux";
import { Loader } from "@mantine/core";
import cookie from "cookie";

import axios from "axios";

// icons
import { MdDoneAll } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const Profile = ({ orderData }) => {
  const userInfo = useSelector(selectUserDetails);
  const [userProfile, setuserProfile] = useState(null);
  const [laoding, setlaoding] = useState(false);
  const [isDelivere, setisDelivere] = useState(true);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      phonenumber: "",
      address: "",
      password: "",
      newPasswod: "",
    },
  });

  console.log("orderData", orderData);

  useEffect(() => {
    if (userInfo) {
      form.setValues({
        name: userInfo.name,
        email: userInfo.email,
        phonenumber: userInfo.phonenumber,
        address: userInfo?.address ? userInfo?.address : "",
      });

      setuserProfile(userInfo?.profileImg);
    }
  }, [userInfo]);

  useEffect(() => {
    form.values.password = "";
    form.values.newPasswod = "";
  }, []);

  const ChangeTheUserDetails = async () => {
    const data = {
      token: Cookies.get("token"),
      name: form.values.name,
      phonenumber: form.values.phonenumber,
      address: form.values.address,
      password: form.values.password,
      newPasswod: form.values.newPasswod,
      profileImg: userProfile,
    };
    const user = await ChangeUserDetails(data);
    if (user.success) {
      router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/profile`);
      toast.success(user.message);
    } else {
      toast.error(user.message);
    }
  };

  const haddleUserProfile = async (e) => {
    setlaoding(true);
    const file = e.target.files[0];
    const uploadedImg = await UploadImage([file]);
    setlaoding(false);
    setuserProfile(null);
    setuserProfile(uploadedImg ? uploadedImg[0]?.imgURL : null);
  };

  return (
    <>
      <Head>
        <title> User Profile - Shopfi </title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-3 px-3 flex items-start xl:flex-row flex-col w-full justify-between xl:space-x-3 xl:space-y-0 space-y-4 space-x-0 bg-App_white_L">
        {/* user profile */}
        <div className="px-5 w-[98%] md:w-[70%] lg:w-[50%] mx-auto xl:m-0 xl:w-[40%] 2xl:w-[30%] py-3 bg-white rounded-md shadow-md">
          <h2 className="text-3xl text-App_black_L font-bold capitalize select-none">
            user profile
          </h2>
          <div className="flex items-start justify-center flex-col ">
            <div className="w-[160px] h-[160px] rounded-full mt-4 relative select-none">
              <img
                src={
                  userProfile
                    ? userProfile
                    : "https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1655886045~hmac=95b8b8195f24a9761dec731f73ce8ffe"
                }
                alt="user profie"
                className="object-cover rounded-full object-center w-full h-full"
              />

              {laoding && (
                <div className="w-full h-full rounded-full bg-[#f8f8f8a2] absolute top-0 left-0 flex justify-center items-center">
                  <Loader />
                </div>
              )}
            </div>

            <label
              htmlFor="filebutton"
              className="w-44 h-12 text-white bg-App_green_L hover:bg-App_green_D rounded-md text-lg capitalize transition-all duration-150 ease-out mt-4 mx-0 p-0 font-medium cursor-pointer text-center leading-[47px]"
            >
              change profile
            </label>

            <input
              type="file"
              id="filebutton"
              accept="image/*"
              style={{ visibility: "hidden", width: "0px", height: "0px" }}
              onChange={haddleUserProfile}
            />
          </div>

          <form
            onSubmit={form.onSubmit((values) => console.log("register done"))}
            className="w-full mt-9"
            method="POST"
          >
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              size="lg"
              radius="md"
              className="md:flex-1 w-full mx-auto"
              {...form.getInputProps("name")}
            />

            <TextInput
              icon={<At />}
              required
              label="Email"
              placeholder="your@email.com"
              description="You cant change your default email"
              disabled
              size="lg"
              radius="md"
              className="flex-1 mx-auto mt-4 select-none"
              {...form.getInputProps("email")}
            />

            <Input
              icon={<Phone />}
              required
              placeholder="***********"
              label="Phone Number"
              size="lg"
              radius="md"
              className="flex-1 mx-auto mt-3"
              {...form.getInputProps("phonenumber")}
            />

            <Textarea
              type="number"
              placeholder="abc#31311"
              label="Your address"
              className="flex-1 mx-auto mt-3"
              radius="md"
              size="md"
              autosize
              required
              {...form.getInputProps("address")}
            />

            <h3 className="capitalize my-5 text-xl text-blue-800 select-none font-medium">
              change password
            </h3>

            <PasswordInput
              icon={<Lock />}
              label="Your Old Password"
              placeholder="Your Old Password"
              size="lg"
              radius="md"
              className="flex-1 mx-auto mt-3"
              {...form.getInputProps("password")}
            />

            <PasswordInput
              icon={<Lock />}
              size="lg"
              radius="md"
              className="flex-1 mx-auto mt-3"
              label="New Password"
              placeholder="New Password"
              {...form.getInputProps("newPasswod")}
            />

            <Button
              type="submit"
              className="w-42 h-11 text-white bg-App_green_L hover:bg-App_green_D rounded-md text-lg capitalize transition-all duration-150 ease-out mt-4"
              onClick={ChangeTheUserDetails}
            >
              Change Details
            </Button>
          </form>
        </div>

        {/* orders  */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%] mx-auto xl:w-[60%] xl:m-0 2xl:w-[70%]">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="capitalize space-x-2 bg-gray-200 h-10 select-none">
              <tr>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  order id
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  date
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  total
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  Delivere status
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  payment method
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.orders.map(
                ({ _id, createdAt, total, delivery, paymentMethod }, index) => {
                  return (
                    <tr
                      className="cursor-pointer border-b  bg-white border-slate-300 hover:bg-slate-100 transition-all duration-200 ease-out"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap border-r border-slate-300  text-App_blue_L "
                      >
                        {_id}
                      </th>
                      <td className="px-6 py-4 border-r border-slate-300  text-gray-400">
                        {createdAt && new Date(createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-300 text-App_green_L font-bold">
                        ${total}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-300">
                        {delivery ? (
                          <MdDoneAll className="mx-auto text-xl text-green-600" />
                        ) : (
                          <IoClose className="mx-auto text-xl text-red-600" />
                        )}
                      </td>
                      <td className="px-6 py-4 border-r border-slate-300 text-center">
                        <span
                          className={`capitalize ${
                            paymentMethod == "EasyPasia" && "text-App_green_L"
                          } ${paymentMethod == "Paypal" && "text-blue-600"} ${
                            paymentMethod == "Credit/Debit" && "text-red-600"
                          } ${
                            paymentMethod == "Bank" && "text-orange-600"
                          } font-bold select-none`}
                        >
                          {paymentMethod}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const mycookie = cookie.parse(
    (context.req && context.req.headers.cookie) || ""
  );

  let cookieNameData = {};
  if (mycookie.token) {
    cookieNameData = mycookie.token;
  }

  const info = {
    token: cookieNameData,
  };

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_HOSTING_URL}/api/order/getorders`,
    info
  );

  return {
    props: { orderData: data },
  };
};

export default Profile;
