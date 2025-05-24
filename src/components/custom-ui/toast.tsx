"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastConfig = {
  message: string;
  duration?: number;
};

type ToastContextType = {
  toast: (config: ToastConfig) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastConfig, setToastConfig] = React.useState<ToastConfig | null>(
    null
  );

  React.useEffect(() => {
    setTimeout(() => {
      setToastConfig(null)
    }, toastConfig?.duration);
  }, [toastConfig])

  const toast = (config: ToastConfig) => {
    setToastConfig(config);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <AnimatePresence>
        {toastConfig && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "easeInOut", duration: 1 }}
            className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[490px] z-[100]"
          >
            <div className="flex items-center justify-center gap-[10px] p-[10px] rounded-b-[10px] border border-[rgba(33,33,33,0.6)] bg-[#FBC02D] text-[#212121] font-poppins text-[13px] font-semibold leading-none">
              <span>{toastConfig.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
