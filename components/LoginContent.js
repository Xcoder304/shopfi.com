import React from "react";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import { At } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { LoginTheUser } from "../utils/AuthFuntions";

const LoginContent = ({ setIsLoginOpen }) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 5 ? "Password must be at least 5 characters" : null,
    },
  });

  const handleLogin = async () => {
    const data = {
      email: form.values.email,
      password: form.values.password,
    };

    await LoginTheUser(data);
  };

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => console.log("login done"))}
        method="POST"
        className="w-full mx-auto"
      >
        <TextInput
          icon={<At />}
          required
          label="Email"
          placeholder="your@email.com"
          size="md"
          radius="md"
          className="!w-[96%] mx-auto"
          {...form.getInputProps("email")}
        />

        <PasswordInput
          placeholder="Password"
          label="Password"
          size="md"
          radius="md"
          required
          className="!w-[96%] mx-auto mt-4"
          {...form.getInputProps("password")}
        />

        <div className="flex justify-between items-center mt-10 flex-col space-x-2 md:flex-row">
          <p
            className="font-normal text-base text-gray-500 hover:underline cursor-pointer capitalize select-none"
            onClick={() => setIsLoginOpen(false)}
          >
            i Dont have any account.Register Now
          </p>
          <Button
            type="submit"
            className="text-base bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out md:m-0 mx-auto mt-2 w-[60%] md:w-auto"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginContent;
