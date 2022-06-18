import Head from "next/dist/shared/lib/head";
import HomeLayout from "../components/HomeLayout";
import { fetchProductsData } from "../utils/DatabaseFuntions";
import { data } from "../utils/data";

const Home = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Shopfi</title>
      </Head>
      <HomeLayout products={products} />
    </div>
  );
};

export async function getServerSideProps(context) {
  const products = await fetchProductsData();

  return {
    props: { products },
  };
}

export default Home;
