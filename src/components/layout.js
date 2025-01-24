import { Footer } from "./footer";
import { Navbar } from "./navbar";

export default function Layout({ children }) {
  return (
    <>
      <div className="container h-screen w-screen">
        {/* <Navbar /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </div>
    </>
  );
}
