import React from "react";
import { ApiKeyProvider } from "../context/ApiKeyContext";
import Image from "next/image";

import Header from "./Header";
import Footer from "./Footer";
import layoutStyles from "../styles/components/Layout.module.scss";

const Layout = ({ children }: any) => {
  return (
    <ApiKeyProvider>
      <div className={layoutStyles.container}>
        <Header />
        <div className={layoutStyles["bg-illustration-wrapper"]}>
          <Image
            className={layoutStyles["bg-illustration"]}
            src="/images/bg-illustration.svg"
            alt="bg-illustration"
            width={1304.43}
            height={623}
          />
        </div>
        <main>{children}</main>
        <div className={layoutStyles.filler} />
        <Footer />
      </div>
    </ApiKeyProvider>
  );
};

export default Layout;
