"use client";
import {
  faArrowRightArrowLeft,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { FC, useCallback, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";

interface MinimizableWebChatProps {}

library.add(faArrowRightArrowLeft, faChevronDown);

const MinimizableWebChat: FC<MinimizableWebChatProps> = () => {
  const [loaded, setLoaded] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [newMessage, setNewMessage] = useState(false);
  const [side, setSide] = useState("right");
  const [microphoneActive, setMicrophoneActive] = useState(false);

  // To learn about reconnecting to a conversation, see the following documentation:
  // https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-reconnect-to-conversation?view=azure-bot-service-4.0

  const handleMaximizeButtonClick = useCallback(async () => {
    setLoaded(true);
    setMinimized(false);
    setNewMessage(false);
    if (!microphoneActive) {
      (window as any).iniciarReconocimiento();
      setMicrophoneActive(true);
    }
  }, [setMinimized, setNewMessage]);

  const handleMinimizeButtonClick = useCallback(() => {
    setMinimized(true);
    setNewMessage(false);
  }, [setMinimized, setNewMessage]);

  const handleSwitchButtonClick = useCallback(() => {
    setSide(side === "left" ? "right" : "left");
  }, [setSide, side]);
  return (
    <div className="minimizable-web-chat">
      {minimized && (
        <button className="maximize" onClick={handleMaximizeButtonClick}>
          <img src="/bot.png" alt="" />
        </button>
      )}
      {loaded && (
        <div
          className={classNames(
            side === "left" ? "chat-box left" : "chat-box right",
            minimized ? "hide" : ""
          )}
        >
          <header>
            <div className="filler" />
            <button className="switch" onClick={handleSwitchButtonClick}>
              <FontAwesomeIcon icon="arrow-right-arrow-left" />
            </button>
            <button className="minimize" onClick={handleMinimizeButtonClick}>
              <FontAwesomeIcon icon={["fas", "chevron-down"]} />
            </button>
          </header>

          <iframe
            id="frame-chat"
            style={{ height: "100%" }}
            //src="https://mouron-it.github.io/truck-web-chat/"
            src="http://localhost:5500/chat.html"
            title="Iframe Example"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MinimizableWebChat;
