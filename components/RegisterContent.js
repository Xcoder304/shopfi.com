import { useState } from "react";
import {
  TextInput,
  Button,
  NumberInput,
  PasswordInput,
  Checkbox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { At, Phone, Lock } from "tabler-icons-react";
import { RegisterTheUser } from "../utils/AuthFuntions";

const RegisterContent = ({ setIsLoginOpen, toast, setloading }) => {
  const [Status, setStatus] = useState({ success: false, message: "" });

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
      // phonenumber: (value) =>
      //   value.length == 0 ? "Phone number is required" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 5 ? "Password must be at least 5 characters" : null,
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords did not match" : null,
    },
  });

  const handleSignUp = async () => {
    if (
      (form.values.firstname === "" ||
        form.values.lastname === "" ||
        form.values.email === "" ||
        form.values.phonenumber === "" ||
        form.values.password === "" ||
        form.values.confirmPassword === "",
      form.values.termsOfService === false)
    ) {
      toast.error("fill all fields");
      setStatus({ success: false, message: "Please fill all fields" });
    } else {
      if (form.values.password == form.values.confirmPassword) {
        setloading(true);
        let data = {
          name: form.values.firstname + " " + form.values.lastname,
          email: form.values.email,
          phonenumber: form.values.phonenumber,
          profileImg: null,
          password: form.values.password,
          isAdmin: false,
          MainAdmin: false,
        };
        const reg = await RegisterTheUser(data);
        console.log("req", reg);

        setStatus(reg);
        setloading(false);
        if (Status.success) {
          toast.success("Your are Successfully registered");
          setStatus({ success: false, message: "" });
          setIsLoginOpen(true);
        }
      }
    }
  };

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
            error={Status?.success ? "" : Status?.message}
            radius="md"
            className="md:flex-1 w-full mx-auto"
            {...form.getInputProps("firstname")}
          />
          <TextInput
            required
            label="Last Name"
            placeholder="Your last name"
            size="md"
            error={Status?.success ? "" : Status?.message}
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
          error={Status?.success ? "" : Status?.message}
          radius="md"
          className="flex-1 mx-auto mt-4"
          {...form.getInputProps("email")}
        />

        <NumberInput
          icon={<Phone />}
          required
          placeholder="***********"
          label="Phone Number"
          size="md"
          radius="md"
          error={Status?.success ? "" : Status?.message}
          className="flex-1 mx-auto mt-3"
          hideControls
          {...form.getInputProps("phonenumber")}
        />

        <PasswordInput
          icon={<Lock />}
          label="Password"
          placeholder="Password"
          size="md"
          radius="md"
          error={Status?.success ? "" : Status?.message}
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
          error={Status?.success ? "" : Status?.message}
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          required
          className="mt-4 lg:mt-3 cursor-pointer"
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
            onClick={handleSignUp}
          >
            Register Now
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterContent;
