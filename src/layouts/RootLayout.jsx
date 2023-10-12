import { SideBar } from "./sidebar/SideBar";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div>
      <div className="flex font-Poppins bg-slate-200 dark:bg-gray-800 dark:text-white">
        <SideBar>
          {
            <div className="w-full h-full overflow-auto">
              <Outlet />
            </div>
          }
        </SideBar>
        {/* <div className="flex-grow"> */}
        {/* </div> */}
      </div>
    </div>
  );
};
// import { SideBar } from "./sidebar/SideBar";

// import React from "react";

// export const RootLayout = ({ children }) => {
//   return (
//     <div className="flex dark:bg-slate-800 dark:text-white bg-slate-200 w-full h-screen">
//       <SideBar />
//       <main>{children}</main>
//     </div>
//   );
// };
