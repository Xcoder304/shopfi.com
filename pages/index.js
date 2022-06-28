import Head from "next/dist/shared/lib/head";
import HomeLayout from "../components/HomeLayout";
import { useDispatch } from "react-redux";
import { setProducts } from "../Redux/features/ProductSlice";
import { setallCategorys } from "../Redux/features/OtherStateteSlice";
import { FetchTheData, GetAllCategories } from "../utils/DatabaseFuntions";

const Home = ({ products, categorys }) => {
  const dispatch = useDispatch();
  dispatch(setProducts(products));
  dispatch(setallCategorys(categorys));

  return (
    <div>
      <Head>
        <title>Shopfi</title>
      </Head>
      <HomeLayout />
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const data = await FetchTheData("product/getProducts");
  const categorys = await GetAllCategories();

  return {
    props: { products: data, categorys },
  };
}

export default Home;
