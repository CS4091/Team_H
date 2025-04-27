import React, { forwardRef } from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import SettingsOutlinedIcon from "@mui/icons-material/Settings";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

interface HeaderDropdownMenuProps {
  isOpen: boolean;
}

const HeaderDropdownMenu = forwardRef<HTMLDivElement, HeaderDropdownMenuProps>(
  (props: HeaderDropdownMenuProps, ref) => {
    const { isOpen } = props;

    return (
      <>
        {isOpen && (
          <>
            <ArrowDropUpIcon
              sx={{
                position: "absolute",
                top: "47px",
                right: "75px",
                color: "gray",
                zIndex: "3",
              }}
              fontSize="large"
            />
            <div
              ref={ref}
              className="absolute min-w-[160px] bg-white border-2 border-solid border-gray-400 rounded top-[66px] right-[60px] z-[2] flex flex-col"
            >
              <div className="border-b-2 border-solid border-gray-300 px-5 py-4 flex gap-4 items-center">
                <div className="w-[36px] h-[36px] bg-green-100 rounded-full mr-[-6px]" />
                <div className="font-semibold text-md">User's Name</div>
              </div>
              <div className="p-3 flex gap-4 items-center cursor-pointer hover:bg-gray-100 active:bg-gray-200">
                <PersonOutlineOutlinedIcon className="ml-2" />
                <div className="select-none">Edit Profile</div>
              </div>
              <div className="p-3 flex gap-4 items-center border-b-2 border-solid border-gray-300 cursor-pointer hover:bg-gray-100 active:bg-gray-200">
                <SettingsOutlinedIcon className="ml-2" />
                <div className="select-none">Settings</div>
              </div>
              <div className="p-3 flex gap-4 items-center cursor-pointer hover:bg-red-100 active:bg-red-200">
                <LogoutIcon className="ml-2" />
                <div className="select-none">Logout</div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
);

HeaderDropdownMenu.displayName = "HeaderDropdownMenu";

export default HeaderDropdownMenu;
