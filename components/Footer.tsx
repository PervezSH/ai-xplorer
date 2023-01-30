import Image from "next/image";

import footerStyles from "../styles/components/Footer.module.scss";

const Footer = () => {
  return (
    <div className={footerStyles.container}>
      <Image
        src="/images/logo-for-dark.svg"
        alt="Logo"
        width={109}
        height={40}
      />
      <div
        className={footerStyles["twitter-handle"]}
        onClick={() => {
          window.open("https://twitter.com/per_0x", "_blank");
        }}
      >
        <Image src="/images/twitter.svg" alt="twitter" width={16} height={16} />
        <p>@per_0x</p>
      </div>
    </div>
  );
};

export default Footer;
