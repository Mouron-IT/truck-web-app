"use client"

import React, { useState, createContext, useContext, PropsWithChildren } from "react";
import { createStore, createStyleSet, createDirectLine } from "botframework-webchat";
import { DirectLine } from 'botframework-directlinejs';

import { Store } from "redux";

// define the props
type ChatStoreState = {
  store: Store;
  setStore(store: Store): void;
  token?: string;
  setToken(token: string): void;
  directLine?: DirectLine;
  setDirectLine(directline: DirectLine): void;
};

const ChatStoreContext = createContext<ChatStoreState | null>(null);


export const ChatStoreProvider = (props: PropsWithChildren) => {
    const [store, setStore] = useState<Store>(createStore({}));
    const [token, setToken] = useState<string | undefined>(undefined);
    const [directLine, setDirectLine] = useState<DirectLine | undefined>(undefined);
    return (
      <ChatStoreContext.Provider value={{ store, setStore, token, setToken, directLine, setDirectLine }}>
        {props.children}
      </ChatStoreContext.Provider>
    );
  };

const useChatStore = (): ChatStoreState => {
    // 2. use the useContext hook
    const context = useContext(ChatStoreContext);
  
    // 3. Make sure it's not null!
    if (!context) {
      throw new Error("Please use ThemeProvider in parent component");
    }
  
    return context;
  };

export default useChatStore;
