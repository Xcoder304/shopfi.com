import React, { useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import {
  ActionIcon,
  Avatar,
  Menu,
  Divider,
  Button,
  Indicator,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// icons
import { FcSettings } from "react-icons/fc";
import { AiOutlineMessage } from "react-icons/ai";
import { BiHelpCircle } from "react-icons/bi";
import { MdPersonAddAlt } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
// import HeaderMenu from "./HeaderMenu";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectecart } from "../Redux/features/ProductSlice";
import {
  selecteUser,
  setOpenLoginModal,
  setUser,
} from "../Redux/features/OtherStateteSlice";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";

const Header = () => {
  const [openModal, handleModal] = useDisclosure(false);
  const [openMenu, setOpenMenu] = useState(false);
  const user = useSelector(selecteUser);
  const cart = useSelector(selectecart);
  const dispatch = useDispatch();
  const router = useRouter();

  const LoginOutTheUser = () => {
    Cookies.remove("token");
    dispatch(setUser(null));
    toast.success("Logout Successfully");
  };

  return (
    <header className="w-full flex items-center justify-between py-4 px-2 md:px-5 shadow-md overflow-x-hidden sticky top-0 z-30 bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      {/* <HeaderMenu open={openMenu} setOpen={setOpenMenu} /> */}
      <div className="flex items-center justify-center space-x-2 md:space-x-5">
        <h1
          className="font-bold capitalize text-App_green_L select-none text-5xl cursor-pointer px-0 hidden sm:inline-block"
          onClick={() => router.push("/")}
        >
          shopfi
          <span className="font-bold text-App_blue_L text-5xl">.</span>
        </h1>
        <input
          type="text"
          placeholder="Search....."
          className="w-[180px] md:w-[380px] lg:w-[500px] px-3 py-2 focus-within:placeholder:opacity-0 placeholder:transition-all placeholder:duration-100 placeholder:ease-in focus-within:-translate-y-1 focus-within:shadow-md shadow-slate-400 font-bold text-App_green_L placeholder:font-medium rounded-full bg-componets_white text-[22px] placeholder:text-[18px] placeholder:text-gray-600 transition-all duration-300 ease-out outline-none"
        />
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-7">
        <div className="mx-2">
          {!openMenu && (
            <Button
              className="bg-[#E0F2FF] hover:bg-[#bfe3fc] transition-all duration-200 ease-out outline-none w-12 p-0 m-0"
              onClick={() => setOpenMenu(!openMenu)}
            >
              <FiMenu className="text-blue-500 !text-[20px]" />
            </Button>
          )}
        </div>
        <Indicator inline label={cart.length} size={16} color="green">
          <ActionIcon
            color="blue"
            size="xl"
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/cart`)
            }
          >
            <MdShoppingCart className="text-blue-600 text-3xl" />
          </ActionIcon>
        </Indicator>
        {user ? (
          <Menu
            opened={openModal}
            onOpen={handleModal.open}
            onClose={handleModal.close}
            control={
              <div className="hover:bg-slate-200 rounded-full transition-all duration-200 ease-out">
                <Avatar
                  radius="xl"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                  className="cursor-pointer hover:scale-90 transition-all duration-150 ease-out"
                />
              </div>
            }
          >
            <Menu.Item
              icon={<FcSettings size={14} />}
              className="hover:bg-slate-100"
            >
              Account Settings
            </Menu.Item>
            <Menu.Item
              icon={<AiOutlineMessage size={14} />}
              className="hover:bg-blue-100"
            >
              Contact us
            </Menu.Item>
            <Menu.Item
              icon={<BiHelpCircle size={14} />}
              className="hover:bg-yellow-100"
            >
              Help
            </Menu.Item>

            <Divider />

            <Menu.Item
              icon={<MdPersonAddAlt size={14} />}
              className="hover:bg-green-100"
            >
              Add Another Account
            </Menu.Item>
            <Menu.Item
              color="red"
              icon={<CgLogOut size={14} />}
              className="hover:bg-red-100"
              onClick={LoginOutTheUser}
            >
              Logout
            </Menu.Item>
          </Menu>
        ) : (
          <Button
            variant="filled"
            className="bg-App_green_L hover:bg-App_green_D text-base transition-all duration-200 ease-out outline-none"
            onClick={() => dispatch(setOpenLoginModal(true))}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
