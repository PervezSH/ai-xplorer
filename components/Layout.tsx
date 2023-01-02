import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import layoutStyles from "../styles/components/Layout.module.scss";

const Layout: React.FC<any> = ({ children }) => {
    return (
        <div className={layoutStyles.container}>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

export default Layout;