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
import { MdPersonAddAlt, MdOutlineManageAccounts } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { Pencil, Plus, Search } from "tabler-icons-react";
import HeaderMenu from "./HeaderMenu";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { selectecart, setProducts } from "../Redux/features/ProductSlice";
import {
  selecteUser,
  setOpenLoginModal,
  setUser,
  selectUserDetails,
  selectOpenNavbar,
  setOpenNavbar,
} from "../Redux/features/OtherStateteSlice";
import Cookies from "js-cookie";
import { Toaster, toast } from "react-hot-toast";
import { FetchTheData } from "../utils/DatabaseFuntions";

const Header = () => {
  const [searchInput, setsearchInput] = useState("");
  const [openModal, handleModal] = useDisclosure(false);
  const OpenNavbar = useSelector(selectOpenNavbar);
  const userDetails = useSelector(selectUserDetails);
  const user = useSelector(selecteUser);
  const cart = useSelector(selectecart);
  const dispatch = useDispatch();
  const router = useRouter();

  const LoginOutTheUser = () => {
    Cookies.remove("token");
    dispatch(setUser(null));
    window.location.reload(false);
    toast.success("Logout Successfully");
  };

  const haddleSearchInput = async (e) => {
    setsearchInput(e.target.value);

    if (e.target.value.length == 0) {
      const nproduct = await FetchTheData("product/getProducts");
      dispatch(setProducts(nproduct));
    }
  };

  const Search_The_keyword = async (e) => {
    e.preventDefault();
    const newProducts = await FetchTheData(
      `product/getProducts?keyword=${searchInput}`
    );
    dispatch(setProducts(newProducts));
  };

  return (
    <header className="w-full flex items-center justify-between py-4 px-2 md:px-5 shadow-md overflow-x-hidden sticky top-0 z-30 bg-white">
      <Toaster position="top-center" reverseOrder={false} />
      <HeaderMenu open={OpenNavbar} />
      <div className="flex items-center justify-center space-x-2 md:space-x-5">
        <h1
          className="font-bold capitalize text-App_green_L select-none text-5xl cursor-pointer px-0 hidden sm:inline-block"
          onClick={() => router.push("/")}
        >
          shopfi
          <span className="font-bold text-App_blue_L text-5xl">.</span>
        </h1>
        <form
          className="w-[180px] md:w-[380px] lg:w-[500px] relative focus-within:-translate-y-1 transition-all duration-300 ease-out"
          onSubmit={Search_The_keyword}
        >
          <input
            type="text"
            placeholder="Search....."
            className="w-full px-3 py-2 focus-within:placeholder:opacity-0 placeholder:transition-all placeholder:duration-100 placeholder:ease-in  focus-within:shadow-md shadow-slate-400 font-bold text-App_green_L placeholder:font-medium rounded-full bg-componets_white text-[22px] placeholder:text-[18px] placeholder:text-gray-600 transition-all duration-300 ease-out outline-none"
            value={searchInput}
            onChange={haddleSearchInput}
          />
          <Button
            type="submit"
            className="w-10 h-10 p-0 m-0 rounded-full bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out absolute right-2 top-[4px]"
          >
            <Search className="text-2xl text-white" />
          </Button>
        </form>
      </div>

      <div className="flex items-center space-x-1 md:space-x-4 lg:space-x-7">
        <div className="mx-0 md:mx-2">
          {!OpenNavbar && (
            <Button
              className="bg-[#E0F2FF] hover:bg-[#bfe3fc] transition-all duration-200 ease-out outline-none w-12 p-0 m-0"
              onClick={() => dispatch(setOpenNavbar(true))}
            >
              <FiMenu className="text-blue-500 !text-[20px]" />
            </Button>
          )}
        </div>
        {user && (
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
        )}
        {user ? (
          <Menu
            opened={openModal}
            onOpen={handleModal.open}
            onClose={handleModal.close}
            size="lg"
            control={
              <div className="hover:bg-slate-200 rounded-full transition-all duration-200 ease-out">
                <Avatar
                  radius="xl"
                  src={userDetails?.profileImg}
                  className="cursor-pointer hover:scale-90 transition-all duration-150 ease-out"
                />
              </div>
            }
          >
            <Menu.Item
              icon={<FcSettings size={14} />}
              className="hover:bg-slate-100"
              onClick={() =>
                router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/profile`)
              }
            >
              {userDetails?.isAdmin || userDetails?.MainAdmin
                ? "Profile & Manage Orders"
                : "Profile & Orders"}
            </Menu.Item>
            {!userDetails?.isAdmin && !userDetails?.MainAdmin && (
              <Menu.Item
                icon={<AiOutlineMessage size={14} />}
                className="hover:bg-blue-100"
              >
                Contact us
              </Menu.Item>
            )}

            {userDetails?.MainAdmin && (
              <Menu.Item
                icon={<MdOutlineManageAccounts size={14} />}
                className="hover:bg-blue-100"
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_HOSTING_URL}/manageUserAndAdmin`
                  )
                }
              >
                Manage Users & Admin
              </Menu.Item>
            )}

            {userDetails?.isAdmin || userDetails?.MainAdmin ? (
              <>
                <Menu.Item
                  icon={<Pencil size={14} />}
                  className="hover:bg-blue-100"
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_HOSTING_URL}/manageCategories`
                    )
                  }
                >
                  Manage Categroys
                </Menu.Item>

                <Menu.Item
                  icon={<Plus size={14} />}
                  className="hover:bg-blue-100"
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_HOSTING_URL}/createProduct`
                    )
                  }
                >
                  Create Product
                </Menu.Item>
              </>
            ) : (
              ""
            )}

            <Menu.Item
              icon={<MdPersonAddAlt size={14} />}
              className="hover:bg-green-100"
              onClick={() => dispatch(setOpenLoginModal(true))}
            >
              Add Another Account
            </Menu.Item>

            <Divider />
            <Menu.Item
              icon={<BiHelpCircle size={14} />}
              className="hover:bg-yellow-100"
            >
              Need Help?
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
