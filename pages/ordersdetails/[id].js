import {
  GetTheOrderDetails,
  MarkAsDelivered,
} from "../../utils/DatabaseFuntions";
import Head from "next/head";
import CreatePaymentFeilds from "../../components/profile/CreatePaymentFeilds";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { ArrowLeft } from "tabler-icons-react";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../../Redux/features/OtherStateteSlice";
import { MdDoneAll } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const OrdersDetails = ({ orderDetailsData }) => {
  const userInfo = useSelector(selectUserDetails);
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const Mark_As_Delivered = async (id) => {
    setloading(true);
    await MarkAsDelivered(id, true);
    router.replace(
      `${process.env.NEXT_PUBLIC_HOSTING_URL}/ordersdetails/${router.query.id}?spm=${router.query.spm} ${router.query.id} ${router.query.spm} ${router.query.spm} ${router.query.id} ${router.query.spm}`
    );
    setloading(false);
  };
  const UnMark_As_Delivered = async (id) => {
    setloading(true);
    await MarkAsDelivered(id, false);
    router.replace(
      `${process.env.NEXT_PUBLIC_HOSTING_URL}/ordersdetails/${router.query.id}?spm=${router.query.spm}-${router.query.spm}`
    );
    setloading(false);
  };

  return (
    <>
      <Head>
        <title>orders Details - Shopfi</title>
      </Head>
      <div className="w-full bg-App_white_L relative">
        <div className="fixed top-[90px] md:top-[120px] left-2 lg:left-14 z-10">
          <Button
            className="w-12 h-12 !p-0 cursor-pointer !m-0 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full"
            onClick={() =>
              router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/profile`)
            }
          >
            <ArrowLeft strokeWidth={2} />
          </Button>
        </div>
        {/* order details */}
        <div className="w-full flex items-center justify-center flex-col py-5">
          <h3 className="text-3xl text-App_black_L select-none font-medium mt-10 mb-5">
            Order #{orderDetailsData?.orderId}
          </h3>

          <div className="w-auto max-w-[97%] min-w-[45%] bg-white shadow-md rounded-md py-3 px-4">
            {/* items */}
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                order id:
              </span>
              <span className="text-base font-medium text-App_blue_L">
                #{orderDetailsData?.orderId}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-xl capitalize font-medium text-App_green_L underline mb-3">
                user details
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                user name:
              </span>
              <span className="text-base  font-medium text-gray-500">
                {orderDetailsData?.userDatils?.Name}
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                user email:
              </span>
              <span className="text-base  font-medium text-gray-500">
                {orderDetailsData?.userDatils?.email}
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                user phonenumber:
              </span>
              <span className="text-base  font-medium text-gray-500">
                {orderDetailsData?.userDatils?.phonenumber}
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                user region:
              </span>
              <span className="text-base  font-medium capitalize text-gray-500">
                {orderDetailsData?.userDatils?.region}
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                user address:
              </span>
              <span className="text-base font-medium capitalize text-gray-500">
                {orderDetailsData?.userDatils?.address}
              </span>
            </div>

            <div className="flex items-center mt-6">
              <span className="text-xl capitalize font-medium text-App_green_L underline">
                payment info
              </span>
            </div>

            <CreatePaymentFeilds orderDetailsData={orderDetailsData} />

            <div className="flex items-center mt-6">
              <span className="text-xl capitalize font-medium text-App_green_L underline mb-3">
                other details
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                total:
              </span>
              <span className="text-base font-medium text-gray-500">
                ${orderDetailsData?.total}
              </span>
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                is delivered:
              </span>
              {orderDetailsData?.delivery ? (
                <MdDoneAll className="mx-auto text-2xl text-green-600" />
              ) : (
                <IoClose className="mx-auto text-2xl text-red-600" />
              )}
            </div>

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                order date:
              </span>
              <span className="text-base font-medium capitalize text-gray-500">
                {orderDetailsData?.createdAt &&
                  new Date(orderDetailsData?.createdAt).toLocaleDateString()}
              </span>
            </div>

            {userInfo?.isAdmin || userInfo?.MainAdmin ? (
              <div className="mt-6">
                <div className="flex items-center">
                  <span className="text-2xl capitalize font-medium text-blue-600 underline mb-3">
                    admin actions
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    className="w-44 h-10 capitalize text-base text-white bg-App_blue_L hover:bg-App_blue_D transition-all duration-200 ease-out"
                    onClick={() => Mark_As_Delivered(orderDetailsData?._id)}
                    disabled={loading ? true : false}
                  >
                    mark as delivered
                  </Button>
                  <Button
                    className="w-46 h-10 capitalize text-base text-white bg-red-600 hover:bg-red-700 transition-all duration-200 ease-out"
                    onClick={() => UnMark_As_Delivered(orderDetailsData?._id)}
                    disabled={loading ? true : false}
                  >
                    unmark as delivered
                  </Button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* product */}
        <div className="w-full pb-20">
          <h3 className="text-3xl text-App_black_L select-none font-medium capitalize mt-10 mb-5 mx-auto text-center">
            Products
          </h3>

          {orderDetailsData.products.map(
            ({ images, _id, slug, price, name, userSelectedQty }, index) => {
              return (
                <div
                  className="flex items-center justify-between w-[95%] mx-auto bg-white py-4 pl-2 pr-5 rounded-md shadow-mdt flex-wrap mb-5"
                  key={index}
                >
                  <div
                    className="flex items-center space-x-2 select-none py-2 px-4 lg:py-0 cursor-pointer"
                    onClick={() =>
                      router.push(
                        `${
                          process.env.NEXT_PUBLIC_HOSTING_URL
                        }/product/${slug}?id=${_id}?spm=${_id + "-" + slug}`
                      )
                    }
                  >
                    <img
                      src={images[0]?.imgURL || images[0]?.url}
                      className="w-[130px] h-[100px] object-contain "
                    />
                    <h2 className="font-bold text-lg text-App_black_L">
                      {name}
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

                    <span className="font-bold text-xl text-App_green_L">
                      {userSelectedQty}
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const data = await GetTheOrderDetails(ctx.query.id);

  return {
    props: { orderDetailsData: data },
  };
};

export default OrdersDetails;
