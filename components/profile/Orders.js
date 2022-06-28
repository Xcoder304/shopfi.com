import React from "react";
import { MdDoneAll } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import { MarkAsDelivered } from "../../utils/DatabaseFuntions";

const Orders = ({ Orders, userInfo }) => {
  const router = useRouter();

  const Route_To_Next_Page = (id, orderID) => {
    router.push(
      `${process.env.NEXT_PUBLIC_HOSTING_URL}/ordersdetails/${id}?spm=${orderID}-${id}`
    );
  };

  const Mark_As_Delivered = async (id) => {
    await MarkAsDelivered(id, true);
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/profile`);
  };
  const UnMark_As_Delivered = async (id) => {
    await MarkAsDelivered(id, false);
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/profile`);
  };

  return (
    <>
      {Orders.length == 0 ? (
        <h2 className="capitalize text-3xl text-App_green_L font-bold mr-10">
          no order founded
        </h2>
      ) : (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%] mx-auto xl:w-[60%] xl:m-0 2xl:w-[70%]">
          <h2 className="text-3xl text-App_black_L font-bold capitalize select-none mb-4">
            {userInfo?.isAdmin ? "Manage orders" : "Your Orders"}
          </h2>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="capitalize space-x-2 bg-gray-200 h-10 select-none">
              <tr>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  order id
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  date
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  total
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  Delivere status
                </th>
                <th scope="col" className="px-6 py-3 border-r border-slate-300">
                  payment method
                </th>
                {userInfo?.isAdmin || userInfo?.MainAdmin ? (
                  <th
                    scope="col"
                    className="px-6 py-3 border-r border-slate-300"
                  >
                    Admin Action
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody>
              {Orders.map(
                (
                  { _id, createdAt, total, delivery, paymentMethod, orderId },
                  index
                ) => {
                  return (
                    <tr
                      className="cursor-pointer border-b  bg-white border-slate-300 hover:bg-slate-100 transition-all duration-200 ease-out"
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap border-r border-slate-300  text-App_blue_L "
                        onClick={() => Route_To_Next_Page(_id, orderId)}
                      >
                        {_id}
                      </th>
                      <td
                        className="px-6 py-4 border-r border-slate-300  text-gray-400"
                        onClick={() => Route_To_Next_Page(_id, orderId)}
                      >
                        {createdAt && new Date(createdAt).toLocaleDateString()}
                      </td>
                      <td
                        className="px-6 py-4 border-r border-slate-300 text-App_green_L font-bold"
                        onClick={() => Route_To_Next_Page(_id, orderId)}
                      >
                        ${total}
                      </td>
                      <td
                        className="px-6 py-4 border-r border-slate-300"
                        onClick={() => Route_To_Next_Page(_id, orderId)}
                      >
                        {delivery ? (
                          <MdDoneAll className="mx-auto text-xl text-green-600" />
                        ) : (
                          <IoClose className="mx-auto text-xl text-red-600" />
                        )}
                      </td>
                      <td
                        className="px-6 py-4 border-r border-slate-300 text-center"
                        onClick={() => Route_To_Next_Page(_id, orderId)}
                      >
                        <span
                          className={`capitalize ${
                            paymentMethod == "EasyPasia" && "text-App_green_L"
                          } ${paymentMethod == "Paypal" && "text-blue-600"} ${
                            paymentMethod == "Credit/Debit" && "text-red-600"
                          } ${
                            paymentMethod == "Bank" && "text-orange-600"
                          } font-bold select-none`}
                        >
                          {paymentMethod}
                        </span>
                      </td>

                      {userInfo?.isAdmin || userInfo?.MainAdmin ? (
                        <td className="px-6 py-4 border-r border-slate-300 text-center flex items-start flex-col 2xl:flex-row gap-2">
                          <span
                            className="text-blue-600 underline cursor-pointer select-none hover:text-blue-700 transition-all duration-150 ease-in capitalize"
                            onClick={() => Mark_As_Delivered(_id)}
                          >
                            mark as delivered
                          </span>
                          <span
                            className="text-blue-600 underline cursor-pointer select-none hover:text-blue-700 transition-all duration-150 ease-in capitalize"
                            onClick={() => UnMark_As_Delivered(_id)}
                          >
                            unMark as delivered
                          </span>
                        </td>
                      ) : (
                        ""
                      )}
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Orders;
