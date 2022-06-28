import React from "react";
import { Button } from "@mantine/core";
import { DeleteTheUserByID } from "../../utils/AuthFuntions";
import { useRouter } from "next/router";

const DelecteUser = ({
  AllUsersData,
  currentIndex,
  setopenModal,
  UserID,
  toast,
}) => {
  const router = useRouter();

  const Delete_The_User = async () => {
    const user = await DeleteTheUserByID(UserID);
    if (user.success) {
      router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/manageUserAndAdmin`);
      setopenModal(false);
      toast.success(user.message);
    } else {
      toast.error(user.message);
    }
  };

  return (
    <div>
      <h4 className="text-App_black_L py-4 px-2 border-y border-slate-200 select-none text-lg">
        are your sure you wanna delecte the{" "}
        {AllUsersData?.users[currentIndex]?.name}
      </h4>
      <div className="mt-4 flex items-end justify-end space-x-3">
        <Button
          className="text-white bg-App_blue_L hover:bg-App_blue_D transition-all duration-150 ease-out text-base"
          onClick={() => setopenModal(false)}
        >
          No
        </Button>

        <Button
          className="text-white bg-red-600 hover:bg-red-700 transition-all duration-150 ease-out text-base"
          onClick={Delete_The_User}
        >
          Yes Delete It!
        </Button>
      </div>
    </div>
  );
};

export default DelecteUser;
