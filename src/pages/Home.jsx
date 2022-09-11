import { useState, useContext } from "react";

import { Sidebar, SideContent } from "/src/features/sidebar";
import { ChatBox } from "/src/features/conversation";

import { CurrentChatContext } from "/src/setup/app-context-manager";
import { ErrorMsg } from "/src/components";

import { start_messaging_img } from "/src/assets/images/";

const Home = () => {
  const defaultSideBarContent = "chats";
  const [sidebarContent, setSideBarContent] = useState(defaultSideBarContent);

  const [currentChat, setCurrentChat] = useContext(CurrentChatContext);

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      <SideContent
        sidebarContent={sidebarContent}
        setSideBarContent={setSideBarContent}
      />
      {!currentChat ? (
        <div className="h-screen w-screen absolute z-10 bg-muted-light/10 dark:bg-black duration-300 md:relative md:flex items-center justify-center">
          <ChatBox currentChat={currentChat} setCurrentChat={setCurrentChat} />
        </div>
      ) : (
        <ErrorMsg
          className="hidden md:flex"
          img={start_messaging_img}
          msg="Start Messaging with Chately"
          subMsg="Select a chat in your inbox to start messaging."
        />
      )}
    </div>
  );
};

export default Home;
