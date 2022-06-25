import React from "react";
import {
  Button,
  TextInput,
  Input,
  Textarea,
  PasswordInput,
} from "@mantine/core";
import { At, Phone, Lock } from "tabler-icons-react";
import { Loader } from "@mantine/core";

const UserProfile = ({
  laoding,
  userProfile,
  haddleUserProfile,
  ChangeTheUserDetails,
  form,
  userInfo,
}) => {
  return (
    <div className="px-5 w-[98%] md:w-[70%] lg:w-[50%] mx-auto xl:m-0 xl:w-[40%] 2xl:w-[30%] py-3 bg-white rounded-md shadow-md">
      <h2 className="text-3xl text-App_black_L font-bold capitalize select-none">
        {userInfo?.isAdmin ? "admin profile" : "user profile"}
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

        {!userInfo?.isAdmin && (
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
        )}

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
  );
};

export default UserProfile;
