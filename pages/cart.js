import { useState, useEffect } from "react";
import Image from "next/image";
import Head from "next/head";
import { MdDelete } from "react-icons/md";
import { Button } from "@mantine/core";
import { NativeSelect } from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
import { fetchCartData } from "../utils/DatabaseFuntions";

const Cart = ({ products }) => {
  const [Products, setProducts] = useState(products);

  return (
    <>
      <Head>
        <title>Cart - Shopfi</title>
      </Head>
      <div className="flex  p-7 bg-App_white_L lg:items-start items-center justify-start lg:justify-between flex-col-reverse lg:flex-row gap-3">
        <div className="w-[96%] lg:w-[75%]">
          {Products.map(({ name, image, price, countInStock, slug, _id }) => {
            return (
              <div
                className="flex items-center justify-between bg-white py-4 pl-2 pr-5 mb-3 rounded-md shadow-mdt flex-wrap"
                key={_id}
              >
                <div className="flex items-center space-x-2 select-none py-2 px-4 lg:py-0">
                  <img
                    src={image}
                    className="w-[130px] h-[100px] object-contain "
                  />
                  <h2 className="font-bold text-lg text-App_black_L">
                    {name.substr(0, 35)}...
                  </h2>
                </div>
                <div className="text-center py-2 px-4 lg:py-0">
                  <h4 className="font-medium text-lg select-none text-App_black_L capitalize">
                    price
                  </h4>
                  <span className="font-medium text-base text-App_green_L select-none">
                    ${price}
                  </span>
                </div>
                <div className="text-center flex flex-col items-center py-2 px-4 lg:py-0">
                  <h4 className="font-medium text-lg select-none text-App_black_L capitalize">
                    select Qty
                  </h4>

                  <NativeSelect
                    data={[...Array(countInStock).keys()].map((x) => {
                      const num = x + 1;
                      return String(num);
                    })}
                    className="select-none"
                    rightSection={<ChevronDown size={14} />}
                    rightSectionWidth={25}
                  />
                </div>
                <Button className="bg-App_green_L border hover:border-App_green_L hover:bg-white hover:text-App_green_L h-[47px] w-[120px] transition-all duration-200 ease-out rounded-lg my-3 py-2 px-4 lg:py-0text-base">
                  Buy Now
                </Button>

                <Button className="bg-[#F03E3E] hover:bg-[#c91919] h-[47px] w-[76px] transition-all px-4duration-200 ease-out rounded-lg py-2 px-4 lg:py-0">
                  <MdDelete className="text-3xl" />
                </Button>
              </div>
            );
          })}
        </div>

        {/* subtotal */}
        <div className="w-[80%] md:w-[50%] lg:w-[25%] h-[200px] bg-white rounded-md py-3 px-4 flex flex-col items-start justify-center space-y-2">
          <h3 className="font-medium text-lg text-App_black_L capitalize select-none">
            total item <span className="text-App_blue_L">4</span>
          </h3>

          <h2 className="text-xl font-bold text-App_black_L capitalize select-none">
            subtotal <span className="text-App_blue_L">$32</span>
          </h2>

          <Button className="bg-App_green_L hover:bg-App_green_D h-[47px] text-base  w-[100%] transition-all duration-200 ease-out rounded-lg capitalize">
            buy all products
          </Button>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const products = await fetchCartData();

  return {
    props: { products: products },
  };
}

export default Cart;
