import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useForm } from "@mantine/form";
import { ChangeUserDetails } from "../utils/AuthFuntions";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { UploadImage } from "../utils/UtilsFuntions";
import { selectUserDetails } from "../Redux/features/OtherStateteSlice";
import { useSelector } from "react-redux";
import cookie from "cookie";
import axios from "axios";
import { Button } from "@mantine/core";
// icons
import { ArrowLeft } from "tabler-icons-react";
import UserProfile from "../components/profile/UserProfile";
import Orders from "../components/profile/Orders";

const Profile = ({ orderData }) => {
  const userInfo = useSelector(selectUserDetails);
  const [userProfile, setuserProfile] = useState(null);
  const [laoding, setlaoding] = useState(false);
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
      <div className="flex items-center justify-center w-full bg-App_white_L pt-5 pb-3">
        <Button
          className="w-44 h-12 !p-0 cursor-pointer !m-0 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full"
          onClick={() => router.back()}
          leftIcon={<ArrowLeft strokeWidth={2} />}
        >
          Go Back
        </Button>
      </div>
      <div className="py-3 px-3 flex items-start xl:flex-row flex-col w-full justify-between xl:space-x-3 xl:space-y-0 space-y-4 space-x-0 bg-App_white_L">
        {/* user profile */}

        <UserProfile
          laoding={laoding}
          userProfile={userProfile}
          haddleUserProfile={haddleUserProfile}
          ChangeTheUserDetails={ChangeTheUserDetails}
          form={form}
        />

        {/* orders  */}
        <Orders Orders={orderData.orders} />
      </div>
      <div className="flex items-center justify-center w-full bg-App_white_L pt-5 pb-3">
        <Button
          className="w-44 h-12 !p-0 cursor-pointer !m-0 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full"
          onClick={() => router.back()}
          leftIcon={<ArrowLeft strokeWidth={2} />}
        >
          Go Back
        </Button>
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
