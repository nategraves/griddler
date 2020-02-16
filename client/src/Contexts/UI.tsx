import React, { FC, createContext } from "react";

const UIContext = createContext<UIProps | null>(null);

interface UIProps {
  blockSize: number;
}

export const UIProvider: FC<UIProps> = ({ blockSize, children }) => {
  const value = { blockSize };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const UIConsumer = UIContext.Consumer;

export default UIContext;
