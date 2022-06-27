import { useEffect } from "react";
import Head from "next/head";
import { MdDelete } from "react-icons/md";
import { Button, NativeSelect } from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
import {
  fetchCartDataWithApi,
  RemoveProductFromCart,
  ClearTheCart,
  AddTempData,
} from "../utils/DatabaseFuntions";
import { useRouter } from "next/router";
import CartEmpty from "../components/CartEmpty";
import { useDispatch } from "react-redux";
import {
  setOpenLoginModal,
  setPaymentSection,
} from "../Redux/features/OtherStateteSlice";
import { setproductQty } from "../Redux/features/ProductSlice";
import { Toaster, toast } from "react-hot-toast";
import Cookies from "js-cookie";
import cookie from "cookie";
import { ArrowLeft } from "tabler-icons-react";

const Cart = ({ products }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("token")) {
      dispatch(setOpenLoginModal(true));
    }
  }, []);

  useEffect(() => {
    dispatch(setPaymentSection(1));
  }, []);

  const handelProductQty = (e, id, index) => {
    dispatch(setproductQty(e.target.value));

    products.forEach((data) => {
      if (data._id == id) {
        data.userSelectedQty = parseInt(e.target.value);
      }
    });
  };

  const RemoveTheProduct = async (e, id, index) => {
    e.preventDefault();
    products.splice(index, 1);
    await RemoveProductFromCart({ id });
    toast.success("Product Removed");
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/cart`);
  };

  const ClearCart = async () => {
    await ClearTheCart();
    products.splice(0, products.length);
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/cart`);
    toast.success("Cleared The Cart");
  };

  const Buy_Product = async (e, id) => {
    e.preventDefault();
    let filteredProduct = products.filter((data) => data._id == id);
    await AddTempData(filteredProduct);
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/PaymentSection`);
  };

  const Buy_All_Products = async () => {
    const CheckProducts = products.filter((data) => data.inStock > 0);
    await AddTempData(CheckProducts);
    router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/PaymentSection`);
  };

  return (
    <>
      <Head>
        <title>Cart - Shopfi</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />

      {products.length == 0 ? (
        <CartEmpty />
      ) : (
        <div className="flex  p-7 bg-App_white_L lg:items-start items-center justify-start lg:justify-between flex-col-reverse lg:flex-row gap-3">
          <div className="w-[96%] lg:w-[75%]">
            {products.map(
              ({ name, images, price, inStock, slug, _id }, index) => {
                return (
                  <form
                    method="POST"
                    className="flex items-center justify-between bg-white py-4 pl-2 pr-5 mb-3 rounded-md shadow-mdt flex-wrap"
                    key={index}
                  >
                    <div
                      className="flex flex-col md:flex-row items-start md:items-center select-none py-2 px-4 lg:py-0 cursor-pointer space-x-3"
                      onClick={() =>
                        router.push(
                          `${
                            process.env.NEXT_PUBLIC_HOSTING_URL
                          }/product/${slug}?id=${_id}?spm=${_id + "*" + slug}`
                        )
                      }
                    >
                      <img
                        src={images[0]?.imgURL || images[0]?.url}
                        className="w-[130px] h-[100px] object-contain "
                      />
                      <div className="flex flex-col items-start">
                        <h2 className="font-bold text-lg text-App_black_L">
                          {name.substr(0, 100)}
                        </h2>
                        <span className="font-medium text-base text-App_green_L select-none">
                          ${price}
                        </span>
                        <span className="font-medium text-base text-red-600 select-none capitalize">
                          inshock {inStock}
                        </span>
                      </div>
                    </div>
                    {inStock > 0 ? (
                      <>
                        <div className="text-center flex flex-col items-center py-2 px-4 lg:py-0">
                          <h4 className="font-medium text-lg select-none text-App_black_L capitalize">
                            select Qty
                          </h4>

                          <NativeSelect
                            data={[...Array(inStock).keys()].map((x) => {
                              const num = x + 1;
                              return String(num);
                            })}
                            className="select-none"
                            rightSection={<ChevronDown size={14} />}
                            rightSectionWidth={25}
                            onChange={(e) => handelProductQty(e, _id, index)}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="bg-App_green_L border hover:border-App_green_L hover:bg-white hover:text-App_green_L h-[47px] w-[90px] transition-all duration-200 ease-out rounded-md my-3 py-2 px-4 lg:py-0 text-base"
                          onClick={(e) => Buy_Product(e, _id)}
                        >
                          Buy
                        </Button>
                      </>
                    ) : (
                      <h3 className="text-xl font-medium text-red-600 select-none capitalize">
                        this product currently is out of Stock
                      </h3>
                    )}
                    <Button
                      type="submit"
                      className="bg-[#F03E3E] hover:bg-[#c91919] h-[47px] w-[66px] transition-all px-4duration-200 ease-out rounded-lg py-2 px-4 lg:py-0"
                      onClick={(e) => RemoveTheProduct(e, _id, index)}
                    >
                      <MdDelete className="text-3xl" />
                    </Button>
                  </form>
                );
              }
            )}
          </div>

          {/* subtotal */}
          <div className="w-[80%] md:w-[50%] lg:w-[25%] md:h-[180px] lg:h-[200px] bg-white rounded-md py-3 px-4 flex flex-col items-start justify-center space-y-3">
            <h3 className="font-medium text-lg text-App_black_L capitalize select-none">
              total item{" "}
              <span className="text-App_blue_L">{products.length}</span>
            </h3>

            <h2 className="text-xl font-bold text-App_black_L capitalize select-none">
              subtotal{" "}
              <span className="text-App_blue_L">
                $
                {products
                  .map((data) => data.price * data.userSelectedQty)
                  .reduce((a, b) => a + b, 0)}
              </span>
            </h2>

            <div className="w-full flex flex-wrap items-center space-x-3">
              <Button
                className="bg-[#F03E3E] hover:bg-[#c91919] h-[47px] flex-1 transition-all  duration-200 ease-out rounded-lg py-0 mb-2"
                onClick={ClearCart}
              >
                Clear Cart
              </Button>

              <Button
                className="bg-App_green_L hover:bg-App_green_D h-[47px] text-base flex-1 transition-all duration-200 ease-out rounded-lg capitalize"
                onClick={Buy_All_Products}
              >
                buy all products
              </Button>
            </div>
          </div>
        </div>
      )}
      {products.length !== 0 && (
        <div className="flex items-center justify-center w-full bg-App_white_L pt-5 pb-3">
          <Button
            className="w-44 h-12 !p-0 cursor-pointer !m-0 bg-blue-600 hover:bg-blue-700 text-white text-2xl rounded-full"
            onClick={() => router.back()}
            leftIcon={<ArrowLeft strokeWidth={2} />}
          >
            Go Back
          </Button>
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const mycookie = cookie.parse(
    (context.req && context.req.headers.cookie) || ""
  );

  let cookieNameData = {};
  if (mycookie.token) {
    cookieNameData = mycookie.token;
  }

  const info = {
    token: cookieNameData,
  };
  const data = await fetchCartDataWithApi(info);

  return {
    props: { products: data.items },
  };
}

export default Cart;
