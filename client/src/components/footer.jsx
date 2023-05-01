
import PrivacyPolicy from "./footer-component/PrivacyPolicy";
import CookiePolicy from "./footer-component/CookiePolicy";
import ContactUs from "./footer-component/ContactUs";
import ToolsUsed from "./footer-component/ToolsUsed";

function Footer() {
  return (
    <footer  style={{ marginBottom: "15px" }}>
      <p style={{ margin: "25px" }} className="text-center">
        {" "}
        Copyright Magda & Olena &copy; 2023 Matrix-Master Community
      </p>
      <div className="container d-flex justify-content-around">
        <PrivacyPolicy />
        <CookiePolicy />
        <ContactUs />
        <ToolsUsed />
      </div>
    </footer>
  );
}

export default Footer;
