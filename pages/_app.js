import { useState, useEffect } from "react";
import Head from "next/head";
import "../styles/globals.css";

import { Provider } from "react-redux";
import { store } from "../Redux/app/store";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";

import Subapp from "./subapp";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";

function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(34);
    });

    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  });

  return (
    <>
      <Provider store={store}>
        <Subapp />
        <LoadingBar
          color="#24AF65"
          height={4}
          progress={progress}
          shadow={false}
          waitingTime={300}
          onLoaderFinished={() => setProgress(0)}
        />
        <AuthModal />
        <Header />
        <Head>
          <link rel="icon" href="/assist/web-icon.png" />
        </Head>
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}

export default MyApp;
