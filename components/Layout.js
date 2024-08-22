import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div
      style={{
        background: "#F2F4F8",
      }}
      className="w-full flex flex-col gap-10 justify-between"
    >
      <div className="relative w-full">
        <Header />
      </div>
      <div className="py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
