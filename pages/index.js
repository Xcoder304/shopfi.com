import Head from "next/dist/shared/lib/head";
import HomeLayout from "../components/HomeLayout";
import { fetchProductsData } from "../utils/DatabaseFuntions";

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
    props: { products: products },
  };
}

export default Home;
