"use client"
import classNames from "classnames";
import { FC, useCallback, useState } from "react";

interface MinimizableWebChatProps {}

const MinimizableWebChat: FC<MinimizableWebChatProps> = () => {
  const [loaded, setLoaded] = useState(false);
  const [minimized, setMinimized] = useState(true);
  const [newMessage, setNewMessage] = useState(false);
  const [side, setSide] = useState("right");
  const [token, setToken] = useState();

  // To learn about reconnecting to a conversation, see the following documentation:
  // https://docs.microsoft.com/en-us/azure/bot-service/rest-api/bot-framework-rest-direct-line-3-0-reconnect-to-conversation?view=azure-bot-service-4.0

  const handleFetchToken = useCallback(async () => {
    if (!token) {
      const res = await fetch(
        "https://webchat-mockbot.azurewebsites.net/directline/token",
        { method: "POST" }
      );
      const { token } = await res.json();

      setToken(token);
    }
  }, [setToken, token]);

  const handleMaximizeButtonClick = useCallback(async () => {
    setLoaded(true);
    setMinimized(false);
    setNewMessage(false);
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
          <span
            className={
              token
                ? "ms-Icon ms-Icon--MessageFill"
                : "ms-Icon ms-Icon--Message"
            }
          />
          {newMessage && (
            <span className="ms-Icon ms-Icon--CircleShapeSolid red-dot" />
          )}
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
              <span className="ms-Icon ms-Icon--Switch" />
            </button>
            <button className="minimize" onClick={handleMinimizeButtonClick}>
              <span className="ms-Icon ms-Icon--ChromeMinimize" />
            </button>
          </header>
          {/* <WebChat
            className="react-web-chat"
            onFetchToken={handleFetchToken}
            store={store}
            styleSet={styleSet}
            token={token}
          /> */}
          <iframe id="frame-chat" style={{height:"100%"}} src="https://mouron-it.github.io/truck-web-chat/"  title="Iframe Example"></iframe>

        </div>
      )}
    </div>
  );
};

export default MinimizableWebChat