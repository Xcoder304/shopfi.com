import { GetTheOrderDetails } from "../../utils/DatabaseFuntions";
import Head from "next/head";
import CreatePaymentFeilds from "../../components/profile/CreatePaymentFeilds";

const OrdersDetails = ({ orderDetailsData }) => {
  console.log(orderDetailsData);

  return (
    <>
      <Head>
        <title>orders Details - Shopfi</title>
      </Head>
      <div className="w-full bg-App_white_L">
        {/* order details */}
        <div className="w-full flex items-center justify-center flex-col">
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
                {orderDetailsData?.orderId}
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

            <div className="flex items-center space-x-3 mb-3">
              <span className="text-lg capitalize font-medium text-App_black_L">
                paymentMethod:
              </span>
              <span className="text-base font-medium capitalize text-gray-500">
                {orderDetailsData?.userDatils?.paymentMethod}
              </span>
            </div>

            <div className="flex items-center">
              <span className="text-xl capitalize font-medium text-App_green_L underline">
                payment info
              </span>
            </div>

            <CreatePaymentFeilds orderDetailsData={orderDetailsData} />

            <div className="flex items-center">
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
              <span className="text-base font-medium capitalize text-red-600">
                {orderDetailsData?.delivery ? "true" : "false"}
              </span>
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
                  <div className="flex items-center space-x-2 select-none py-2 px-4 lg:py-0">
                    <img
                      src={images[0].url}
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
