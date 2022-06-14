import Head from "next/dist/shared/lib/head";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Shopfi</title>
      </Head>
      <Header />
      <Footer />
    </div>
  );
}
