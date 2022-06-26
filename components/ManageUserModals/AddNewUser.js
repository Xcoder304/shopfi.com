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
import { RegisterTheUser } from "../../utils/AuthFuntions";
import { useRouter } from "next/router";

const AddNewUser = ({ toast, setopenModal }) => {
  const [Status, setStatus] = useState({ success: false, message: "" });
  const [laoding, setloading] = useState(false);
  const router = useRouter();

  const form = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      password: "",
      confirmPassword: "",
      isUserAdmin: false,
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

  const Create_A_New_User = async () => {
    if (
      form.values.firstname === "" ||
      form.values.lastname === "" ||
      form.values.email === "" ||
      form.values.phonenumber === "" ||
      form.values.password === "" ||
      form.values.confirmPassword === ""
    ) {
      toast.error("fill all fields");
      setStatus({ success: false, message: "Please fill all fields" });
    } else {
      if (form.values.password == form.values.confirmPassword) {
        setloading(true);
        let data = {
          firstname: form.values.firstname,
          lastname: form.values.lastname,
          name: form.values.firstname + " " + form.values.lastname,
          email: form.values.email,
          phonenumber: form.values.phonenumber,
          profileImg: null,
          password: form.values.password,
          isAdmin: form.values.isUserAdmin,
          MainAdmin: false,
        };
        const reg = await RegisterTheUser(data);

        setStatus(reg);
        setloading(false);
        if (reg.success) {
          router.push(
            `${process.env.NEXT_PUBLIC_HOSTING_URL}/manageUserAndAdmin`
          );
          setopenModal(false);
          toast.success("Your are Successfully registered");
          setStatus({ success: false, message: "" });
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
            label="User First Name"
            placeholder="User first name"
            size="md"
            radius="md"
            className="md:flex-1 w-full mx-auto"
            {...form.getInputProps("firstname")}
          />
          <TextInput
            required
            label="User Last Name"
            placeholder="User last name"
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
          label="User Email"
          placeholder="User@email.com"
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
          label="User Phone Number"
          size="md"
          error={Status?.success ? "" : Status?.message}
          radius="md"
          className="flex-1 mx-auto mt-3"
          hideControls
          {...form.getInputProps("phonenumber")}
        />

        <PasswordInput
          icon={<Lock />}
          label="User Password"
          placeholder="User Password"
          size="md"
          error={Status?.success ? "" : Status?.message}
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
          error={Status?.success ? "" : Status?.message}
          label="Confirm password"
          placeholder="Confirm password"
          {...form.getInputProps("confirmPassword")}
        />

        <Checkbox
          className="mt-4 lg:mt-3 cursor-pointer"
          label="Do You wanna Make This User An Admin"
          {...form.getInputProps("isUserAdmin", { type: "checkbox" })}
        />

        <div className="flex justify-between items-center mt-5 flex-col space-x-2 md:flex-row">
          <Button
            type="submit"
            className="text-base bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out md:m-0 mx-auto mt-2"
            onClick={Create_A_New_User}
            disabled={laoding ? true : false}
          >
            Create User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddNewUser;
