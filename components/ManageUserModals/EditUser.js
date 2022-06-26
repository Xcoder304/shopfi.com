import { useState, useEffect } from "react";
import { Button, TextInput, Textarea, PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { At, Lock } from "tabler-icons-react";
import { EditUserDetails, FetchTheUserByID } from "../../utils/AuthFuntions";
import { useRouter } from "next/router";

const EditUser = ({ UserID, toast }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      password: "",
      newPasswod: "",
    },
  });

  useEffect(() => {
    const fetchUser = async () => {
      const UserInfo = await FetchTheUserByID(UserID);
      setUserInfo(UserInfo.user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userInfo) {
      form.setValues({
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        name: userInfo.name,
        email: userInfo.email,
        phonenumber: userInfo.phonenumber,
        address: userInfo?.address ? userInfo?.address : "",
      });
    }
  }, [userInfo]);

  useEffect(() => {
    form.values.password = "";
    form.values.newPasswod = "";
  }, []);

  const Edit_User_Details = async () => {
    setloading(true);
    const data = {
      id: UserID,
      firstname: form.values.firstname,
      lastname: form.values.lastname,
      name: `${form.values.firstname} ${form.values.lastname}`,
      phonenumber: form.values.phonenumber,
      address: form.values.address,
      password: form.values.password,
      newPasswod: form.values.newPasswod,
    };
    const user = await EditUserDetails(data);
    setloading(false);
    if (user.success) {
      router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/manageUserAndAdmin`);
      toast.success(user.message);
    } else {
      toast.error(user.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => console.log("register done"))}
        className="w-full mt-9"
        method="POST"
      >
        <TextInput
          required
          label="First Name"
          placeholder="User First Name"
          size="lg"
          radius="md"
          className="md:flex-1 w-full mx-auto"
          {...form.getInputProps("firstname")}
        />

        <TextInput
          required
          label="Last Name"
          placeholder="User Last Name"
          size="lg"
          radius="md"
          className="md:flex-1 w-full mx-auto mt-2"
          {...form.getInputProps("lastname")}
        />

        <TextInput
          icon={<At />}
          required
          label="Email"
          placeholder="User@email.com"
          description="You cant change your default email"
          size="lg"
          radius="md"
          className="flex-1 mx-auto mt-4 select-none"
          {...form.getInputProps("email")}
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
          label="User Old Password"
          placeholder="User Old Password"
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
          label="User New Password"
          placeholder="User New Password"
          {...form.getInputProps("newPasswod")}
        />

        <Button
          type="submit"
          className="w-42 h-11 text-white bg-App_green_L hover:bg-App_green_D rounded-md text-lg capitalize transition-all duration-150 ease-out mt-4"
          onClick={Edit_User_Details}
          disabled={loading && true}
        >
          Change Details
        </Button>
      </form>
    </div>
  );
};

export default EditUser;
