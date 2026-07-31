"use client";

import * as Toast from "@radix-ui/react-toast";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

type ToastType = "success" | "error";

interface ToastContextType {
    success: (message: string) => void;
    error: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState<ToastType>("success");

    function success(message: string) {
        setType("success");
        setMessage(message);
        setOpen(true);
    }

    function error(message: string) {
        setType("error");
        setMessage(message);
        setOpen(true);
    }

    return (
        <ToastContext.Provider
            value={{
                success,
                error,
            }}
        >
            <Toast.Provider swipeDirection="right">
                {children}

                <Toast.Root
                    open={open}
                    onOpenChange={setOpen}
                    duration={2500}
                    className={`
                        rounded-2xl
                        border
                        p-5
                        shadow-xl
                        ${
                            type === "success"
                                ? "border-green-500 bg-green-300"
                                : "border-red-500 bg-red-300"
                        }
                    `}
                >
                    <Toast.Title
                        className={
                            type === "success"
                                ? "text-green-900 font-semibold"
                                : "text-red-900 font-semibold"
                        }
                    >
                        {message}
                    </Toast.Title>
                </Toast.Root>

                <Toast.Viewport
                    className="
                        fixed
                        bottom-6
                        right-6
                        z-[999]
                        flex
                        flex-col
                        gap-3
                        outline-none
                    "
                />
            </Toast.Provider>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error("useToast must be used inside ToastProvider");
    }

    return context;
}