import React from "react";

const CreatePaymentFeilds = ({ orderDetailsData }) => {
  return (
    <div className="flex items-start flex-col justify-start mt-3">
      {orderDetailsData?.paymentMethod == "Bank" && (
        <>
          <div className="w-full flex items-center space-x-3 mb-2">
            <div className="text-lg capitalize font-medium text-App_black_L">
              BankAccountNum
            </div>
            <span className="text-base font-medium capitalize text-gray-500">
              {orderDetailsData?.paymentInfo?.BankAccountNum}
            </span>
          </div>

          <div className="w-full flex items-center space-x-3 mb-2">
            <div className="text-lg capitalize font-medium text-App_black_L">
              IdCardNum
            </div>
            <span className="text-base font-medium capitalize text-gray-500">
              {orderDetailsData?.paymentInfo?.IdCardNum}
            </span>
          </div>
        </>
      )}

      {orderDetailsData?.paymentMethod == "Paypal" && (
        <div className="w-full flex items-center space-x-3 mb-2">
          <div className="text-lg capitalize font-medium text-App_black_L">
            paypalAccount:
          </div>
          <span className="text-base font-medium capitalize text-gray-500">
            {orderDetailsData?.paymentInfo?.paypalAccount}
          </span>
        </div>
      )}

      {orderDetailsData?.paymentMethod == "EasyPasia" && (
        <div className="w-full flex items-center space-x-3 mb-2">
          <div className="text-lg capitalize font-medium text-App_black_L">
            EasyPaisaAccountNumber:
          </div>
          <span className="text-base font-medium capitalize text-gray-500">
            {orderDetailsData?.paymentInfo?.EasyPaisaAccountNum}
          </span>
        </div>
      )}

      {orderDetailsData?.paymentMethod == "Credit/Debit" && (
        <>
          <div className="w-full flex items-center space-x-3 mb-2">
            <div className="text-lg capitalize font-medium text-App_black_L">
              cardNumber:
            </div>
            <span className="text-base font-medium capitalize text-gray-500">
              {orderDetailsData?.paymentInfo?.cardNum}
            </span>
          </div>

          <div className="w-full flex items-center space-x-3 mb-2">
            <div className="text-lg capitalize font-medium text-App_black_L">
              Name on Card:
            </div>
            <span className="text-base font-medium capitalize text-gray-500">
              {orderDetailsData?.paymentInfo?.cardName}
            </span>
          </div>

          <div className="w-full flex items-center space-x-3 mb-2">
            <div className="text-lg capitalize font-medium text-App_black_L">
              Expiration Date:
            </div>
            <span className="text-base font-medium capitalize text-gray-500">
              {orderDetailsData?.paymentInfo?.ExpirationDate}
            </span>
          </div>

          <div className="w-full flex items-center space-x-3 mb-2">
            <div className="text-lg capitalize font-medium text-App_black_L">
              Cvv:
            </div>
            <span className="text-base font-medium capitalize text-gray-500">
              {orderDetailsData?.paymentInfo?.cvv}
            </span>
          </div>
        </>
      )}

      {orderDetailsData?.paymentInfo?.isTransitionComfirm && (
        <div className="w-full flex items-center space-x-3 mb-2">
          <div className="text-lg capitalize font-medium text-App_black_L">
            isTransitionComfirm:
          </div>
          <span
            className={`text-base font-medium capitalize ${
              orderDetailsData?.paymentInfo?.isTransitionComfirm
                ? "text-blue-600"
                : "text-red-600"
            }`}
          >
            {orderDetailsData?.paymentInfo?.isTransitionComfirm
              ? "true"
              : "false"}
          </span>
        </div>
      )}
    </div>
  );
};

export default CreatePaymentFeilds;
