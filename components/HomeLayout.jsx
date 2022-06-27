import React from "react";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../Redux/features/OtherStateteSlice";
import { ManageProduct } from "../utils/DatabaseFuntions";
import { Toaster, toast } from "react-hot-toast";

const HomeLayout = ({ products }) => {
  const userDetails = useSelector(selectUserDetails);
  const router = useRouter();

  const Update_Product = (id) => {
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/createProduct/${id}`);
  };

  const Delete_Product = async (id) => {
    const res = await ManageProduct("delecteProduct", { id });
    if (res.success) {
      toast.success(res.message);
      router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}`);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <section className="text-gray-600 body-font w-full bg-App_white_L">
        <div className="py-5">
          <div className="flex flex-wrap px-2 justify-center w-[95%] mx-auto">
            {/* product */}
            {products.map(
              ({
                name,
                slug,
                images,
                price,
                brand,
                rating,
                numReviews,
                _id,
              }) => {
                return (
                  <div
                    className={`lg:w-1/4 w-[300px] m-2 ${
                      userDetails?.MainAdmin || userDetails?.isAdmin
                        ? "h-[520px]"
                        : "h-[470px]"
                    } bg-white rounded-lg shadow-md p-5 hover:scale-105 hover:shadow-lg tranition-all duration-300 ease-out`}
                    key={_id}
                  >
                    <div
                      className="w-full h-auto cursor-pointer "
                      onClick={() =>
                        router.push(
                          `${
                            process.env.NEXT_PUBLIC_HOSTING_URL
                          }/product/${slug}?id=${_id}?spm=${
                            _id + "-" + slug
                          } cursor-pointer`
                        )
                      }
                    >
                      <div className="block overflow-hidden w-full h-[300px]">
                        <img
                          alt="ecommerce"
                          className="object-contain object-center block select-none w-full h-full mx-auto"
                          src={images[0]?.imgURL || images[0]?.url}
                        />
                      </div>

                      <div className="mt-4 text-center md:text-left">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 uppercase   select-none">
                          brand-
                          <span className="font-bold text-sm select-none text-App_blue_L !normal-case">
                            {brand}
                          </span>
                        </h3>
                        <h2 className="text-App_black_L title-font text-lg font-medium">
                          {name}
                        </h2>
                        <div className="flex items-center justify-between mt-1">
                          <span className="flex items-center">
                            <svg
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <p className="ml-1 text-sm font-bold text-App_black_L">
                              {rating}
                            </p>
                            <span className="w-1 h-1 ml-2 bg-App_green_L rounded-full"></span>
                            <span className="text-App_black_L ml-3">
                              {numReviews} Reviews
                            </span>
                          </span>
                          <p className="mt-1 select-none  text-App_green_L font-bold text-xl">
                            ${price}
                          </p>
                        </div>
                      </div>
                    </div>

                    {userDetails?.MainAdmin || userDetails?.isAdmin ? (
                      <div className="flex items-center mt-4 gap-3">
                        <Button
                          className="w-[45%] h-10 text-white text-base font-medium bg-App_green_L hover:bg-App_green_D transition-all duration-200 ease-out capitalize shadow-md hover:shadow-lg rounded-md"
                          onClick={() => Update_Product(_id)}
                        >
                          update
                        </Button>

                        <Button
                          className="w-[45%] h-10 text-white text-base font-medium bg-red-600 hover:bg-red-700 transition-all duration-200 ease-out capitalize shadow-md hover:shadow-lg rounded-md"
                          onClick={() => Delete_Product(_id)}
                        >
                          delete
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeLayout;
