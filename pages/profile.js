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
import { useSelector } from "react-redux";
import { selectUserDetails } from "../Redux/features/OtherStateteSlice";
import { ChangeUserDetails } from "../utils/AuthFuntions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { UploadImage } from "../utils/UtilsFuntions";

const Profile = () => {
  const userInfo = useSelector(selectUserDetails);
  const [userProfile, setuserProfile] = useState(null);
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

  useEffect(() => {
    if (userInfo) {
      form.setValues({
        name: userInfo.name,
        email: userInfo.email,
        phonenumber: userInfo.phonenumber,
        address: userInfo?.address ? userInfo?.address : "",
      });

      setuserProfile(userInfo.profileImg);
    }
  }, []);

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

  const haddleAvatar = async (e) => {
    const file = e.target.files[0];
    const uploadedImg = await UploadImage([file]);

    setuserProfile(null);

    setuserProfile(uploadedImg ? uploadedImg[0].imgURL : null);
  };

  console.log(userProfile);

  return (
    <>
      <Head>
        <title> User Profile - Shopfi </title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="py-3 px-3 flex items-start justify-between bg-App_white_L">
        {/* user profile */}

        <div className="px-5 w-[40%] py-3 bg-white rounded-md shadow-md">
          <div className="flex items-start justify-center flex-col ">
            <h2 className="text-3xl text-App_black_L font-bold capitalize select-none">
              user profile
            </h2>

            <img
              src={
                userProfile
                  ? userProfile
                  : "https://cdn-icons.flaticon.com/png/512/552/premium/552721.png?token=exp=1655886045~hmac=95b8b8195f24a9761dec731f73ce8ffe"
              }
              alt="user profie"
              className="w-[160px] h-[160px] object-cover rounded-full object-center mt-4"
            />

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
              onChange={haddleAvatar}
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
        <div className="w-[60%] py-2"></div>
      </div>
    </>
  );
};

export default Profile;
