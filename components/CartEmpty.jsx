import React from "react";
import Image from "next/image";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";

const CartEmpty = () => {
  const router = useRouter();
  return (
    <div className="py-4 px-4 flex items-center justify-center flex-col space-y-3 select-none">
      <Image
        src="/assist/cart-empty.svg"
        alt="cart-empty"
        width={420}
        height={420}
      />
      <h1 className="capitalize font-bold text-4xl text-App_green_L">
        looks like your cart is empty
      </h1>

      <Button
        className="w-32 h-12 text-white bg-App_blue_L hover:bg-App_blue_D text-lg capitalize cursor-pointer transition-all duration-200 ease-in-out rounded-md"
        onClick={() => router.push("/")}
      >
        explore
      </Button>
    </div>
  );
};

export default CartEmpty;
