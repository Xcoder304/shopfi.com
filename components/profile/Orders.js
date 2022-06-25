import React from "react";
import { MdDoneAll } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";

const Orders = ({ Orders }) => {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[100%] mx-auto xl:w-[60%] xl:m-0 2xl:w-[70%]">
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
                  onClick={() =>
                    router.push(
                      `${process.env.NEXT_PUBLIC_HOSTING_URL}/ordersdetails/${_id}?spm=${orderId} ${_id} ${orderId} ${orderId} ${_id} ${orderId}`
                    )
                  }
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap border-r border-slate-300  text-App_blue_L "
                  >
                    {_id}
                  </th>
                  <td className="px-6 py-4 border-r border-slate-300  text-gray-400">
                    {createdAt && new Date(createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 border-r border-slate-300 text-App_green_L font-bold">
                    ${total}
                  </td>
                  <td className="px-6 py-4 border-r border-slate-300">
                    {delivery ? (
                      <MdDoneAll className="mx-auto text-xl text-green-600" />
                    ) : (
                      <IoClose className="mx-auto text-xl text-red-600" />
                    )}
                  </td>
                  <td className="px-6 py-4 border-r border-slate-300 text-center">
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
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
