import React from "react";
import { ApiKeyProvider } from "../context/ApiKeyContext";

import Header from "./Header";
import Footer from "./Footer";
import layoutStyles from "../styles/components/Layout.module.scss";

const Layout = ({ children }: any) => {
    return (
        <ApiKeyProvider>
            <div className={layoutStyles.container}>
                <Header />
                <main>{children}</main>
                <Footer />
            </div>
        </ApiKeyProvider>
    );
}

export default Layout;