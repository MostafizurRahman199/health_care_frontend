import PublicNavbar from "@/components/shared/PublicNavbar";

const Commonlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <PublicNavbar/>
      {children}
    </>
  );
};

export default Commonlayout;