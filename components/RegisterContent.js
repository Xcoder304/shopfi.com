import React from "react";
import {
  TextInput,
  Button,
  NumberInput,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { At, Phone, Lock } from "tabler-icons-react";

const RegisterContent = ({ setIsLoginOpen }) => {
  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  return (
    <div>
      <form
        onSubmit={form.onSubmit((values) => console.log("register done"))}
        className="w-full mx-auto"
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
          className="flex-1 mx-auto mt-4"
          {...form.getInputProps("email")}
        />

        <NumberInput
          icon={<Phone />}
          placeholder="***********"
          label="Phone Number"
          size="md"
          radius="md"
          className="flex-1 mx-auto mt-3"
          required
          hideControls
          {...form.getInputProps("phonenumber")}
        />

        <PasswordInput
          icon={<Lock />}
          label="Password"
          placeholder="Password"
          size="md"
          radius="md"
          className="flex-1 mx-auto mt-3"
          required
          {...form.getInputProps("password")}
        />

        <PasswordInput
          icon={<Lock />}
          size="md"
          radius="md"
          className="flex-1 mx-auto mt-3"
          required
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          required
          className="mt-4 lg:mt-3"
          label="I agree to the All terms of service"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <div className="flex justify-between items-center mt-5 flex-col space-x-2 md:flex-row">
          <p
            className="font-normal text-base text-gray-500 hover:underline cursor-pointer capitalize select-none"
            onClick={() => setIsLoginOpen(true)}
          >
            i have an account.Login Now
          </p>
          <Button
            type="submit"
            className="text-base bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out md:m-0 mx-auto mt-2"
          >
            Register Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterContent;
