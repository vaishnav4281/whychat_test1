import { useContext } from "react";

import { UserContext, UserTokenContext } from "../../../../../Contexts";

import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { GoMention } from "react-icons/go";

const Profile = () => {
  const [userInfo, setUserInfo] = useContext(UserContext);

  return (
    <div className="bg-white flex flex-col">
      <div className="flex-col justify-center gap-4 p-6">
        <h1 className="text-xl text-black dark:text-white">My Profile</h1>
        <div className="flex flex-col items-center text-center p-4 px-8">
           <img
            className="w-full bg-cover bg-center bg-primary-main mb-4 w-16 h-16 rounded-full border border-4 border-white dark:border-black"
            src={userInfo.profile}
          />
          <h2 className="text-lg">{userInfo.username}</h2>
          <p className="text-muted-light dark:text-muted-dark">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 border-t border-muted-light/10">
        <p className="text-muted-light dark:text-muted-dark">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
        <div className="flex flex-col gap-1 w-100 ">
          <button className="flex gap-4 items-center text-lg hover:bg-muted-light/10 p-2 text-md rounded-xl duration-200">
            <HiOutlineMail className="text-muted-light text-2xl" />
            {userInfo.email}
          </button>
          <button className="flex gap-4 items-center text-lg hover:bg-muted-light/10 p-2 text-md rounded-xl duration-200">
            <GoMention className="text-muted-light text-2xl" />
            {userInfo.username}
          </button>
          <button className="flex gap-4 items-center text-lg hover:bg-muted-light/10 p-2 text-md rounded-xl duration-200">
            <HiOutlineLocationMarker className="text-muted-light text-2xl" />
            Fatsa
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
