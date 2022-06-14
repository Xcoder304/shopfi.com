import React, { useState } from "react";
import { data } from "../utils/data";
import { useRouter } from "next/router";
import { RatingStarNumber } from "../utils/Funtions";

const HomeLayout = () => {
  const [productData, setProductData] = useState(data.products);
  const router = useRouter();
  const rating = RatingStarNumber(5);

  console.log("rating", rating.props);

  return (
    <section className="text-gray-600 body-font w-full bg-App_white_L">
      <div className="py-5">
        <div className="flex flex-wrap px-2 justify-center w-[95%] mx-auto">
          {/* product */}
          {productData.map(
            (
              { name, slug, image, price, brand, rating, numReviews },
              index
            ) => {
              return (
                <>
                  <div
                    className="lg:w-1/4 w-[350px] m-2 h-[470px] bg-white !cursor-pointer rounded-lg shadow-md p-5 hover:scale-105 tranition-all duration-300 ease-out"
                    key={index}
                    onClick={() => router.push(`/product/${slug}`)}
                  >
                    <div className="block overflow-hidden w-full h-[300px]">
                      <img
                        alt="ecommerce"
                        className="object-contain object-center block select-none w-full h-full mx-auto"
                        src={image}
                      />
                    </div>

                    <div className="mt-4 text-center md:text-left">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1 select-none">
                        CATEGORY-
                        <span className="font-bold text-sm select-none text-App_blue_L">
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
                </>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeLayout;
