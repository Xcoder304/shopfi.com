import React, { useState } from "react";
import { data } from "../utils/data";
import { useRouter } from "next/router";

const HomeLayout = () => {
  const [productData, setProductData] = useState(data.products);
  const router = useRouter();
  console.log(data.products);

  return (
    <section className="text-gray-600 body-font w-full bg-App_white_L">
      <div className="py-5">
        <div className="flex flex-wrap px-2 justify-center w-[95%] mx-auto">
          {/* product */}
          {productData.map((data) => {
            return (
              <>
                <div className="lg:w-1/4 w-[350px] m-2 h-[470px] bg-white !cursor-pointer rounded-lg shadow-md p-5 hover:scale-105 tranition-all duration-300 ease-out">
                  <div className="block overflow-hidden w-full h-[300px]">
                    <img
                      alt="ecommerce"
                      className="object-contain object-center block select-none w-full h-full mx-auto"
                      src="https://m.media-amazon.com/images/I/714s29JGWIL._AC_UY500_.jpg"
                    />
                  </div>

                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 select-none">
                      CATEGORY-
                      <span className="font-bold text-sm select-none text-App_blue_L">
                        Nike
                      </span>
                    </h3>
                    <h2 className="text-App_black_L title-font text-lg font-medium">
                      shit
                    </h2>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center">
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="w-4 h-4 text-indigo-500"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <span className="text-gray-600 ml-3">4 Reviews</span>
                      </span>
                      <p className="mt-1 select-none  text-App_blue_L font-bold text-xl">
                        $45
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;
