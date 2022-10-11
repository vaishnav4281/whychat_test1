import { AiOutlineArrowLeft } from "react-icons/ai";

import { ProfilePicture, TwButton } from "components";
import { User } from "interfaces";
import { useAppDispatch, useAppSelector } from "hooks";
import { getChatState, resetChat } from "features/inbox/chatReducer";
import { useGetUserStatus } from "hooks";

interface ChatHeaderProps {
  recipient: User;
}

const ChatHeader = ({ recipient }: ChatHeaderProps) => {
  const { isGroup } = useAppSelector(getChatState);
  const online = useGetUserStatus(recipient?.uid?.toString());

  const dispatch = useAppDispatch();

  const handleBackBtn = () => {
    dispatch(resetChat());
  };

  return (
    <header className="border-b border-muted-light/10 dark:border-muted-dark/10 w-full p-4  mb-auto bg-white dark:bg-bgmain-dark duration-300 flex gap-2">
      <TwButton
        variant="transparent"
        onClick={handleBackBtn}
        className="md:hidden px-4"
      >
        <AiOutlineArrowLeft className="text-xl" />
      </TwButton>
      <div className="flex items-center gap-4">
        <ProfilePicture
          isOnline={online}
          photoURL={recipient?.photoURL}
          size="small"
        />
        <div className="flex flex-col gap-0">
          <h2 className="text-xl text-black dark:text-white">
            {recipient.displayName || recipient.groupName}
          </h2>
          {!isGroup && (
            <p className="text-sm text-muted-light dark:text-muted-dark">
              {online ? "online" : "offline"}
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;
