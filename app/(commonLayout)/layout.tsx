import Footer from "@/components/shared/Footer";
import PublicNavbar from "@/components/shared/PublicNavbar";

const Commonlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <PublicNavbar />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Commonlayout;