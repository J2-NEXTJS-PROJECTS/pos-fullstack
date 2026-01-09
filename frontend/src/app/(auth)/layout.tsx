import { MainNav } from "@/components/ui/MainNav";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainNav />

      <main>
        <div className=" flex place-items-center justify-center  md:h-screen ">
          {children}
        </div>
      </main>
    </>
  );
};

export default layout;
