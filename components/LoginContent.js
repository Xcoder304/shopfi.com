import { useState } from "react";
import { TextInput, Button, PasswordInput } from "@mantine/core";
import { At } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { LoginTheUser } from "../utils/AuthFuntions";
import { useDispatch } from "react-redux";
import { setOpenLoginModal } from "../Redux/features/OtherStateteSlice";

const LoginContent = ({ setIsLoginOpen, toast, setloading }) => {
  const [Status, setStatus] = useState({ success: false, message: "" });
  const dispatch = useDispatch();

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
    if (form.values.email === "" || form.values.password === "") {
      setStatus({ success: false, message: "Please fill all fields" });
    } else {
      setloading(true);
      const data = {
        email: form.values.email,
        password: form.values.password,
      };

      const loginRes = await LoginTheUser(data);
      setStatus(loginRes);

      setloading(false);
      if (loginRes.success) {
        toast.success("Your are Successfully logged in");
        setStatus({ success: false, message: "" });
        dispatch(setOpenLoginModal(false));
      }
    }
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
          error={Status?.success ? "" : Status?.message}
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
          error={Status?.success ? "" : Status?.message}
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
