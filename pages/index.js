import Head from "next/dist/shared/lib/head";
import HomeLayout from "../components/HomeLayout";
import { useDispatch } from "react-redux";
import { setProducts } from "../Redux/features/ProductSlice";
import { FetchTheData } from "../utils/DatabaseFuntions";

const Home = ({ products }) => {
  const dispatch = useDispatch();
  dispatch(setProducts(products));

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
  return {
    props: { products: data },
  };
}

export default Home;
