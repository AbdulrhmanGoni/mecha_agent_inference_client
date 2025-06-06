import { createContext, ReactNode } from "react"
import useChat from "../hooks/useChat";

const placeholderFunction = () => { }

export const chatContextDefaultValues: ChatContext = {
    chatId: "",
    setChatId: placeholderFunction,
    loadingMessages: false,
    loadingMessagesError: "",
    refetchChatMessages: placeholderFunction,
    messages: [],
    generatingResponse: "",
    setGeneratingResponse: placeholderFunction,
    isGeneratingResponse: false,
    setIsGeneratingResponse: placeholderFunction,
    error: "",
    addMessage: placeholderFunction,
    setError: placeholderFunction,
    resetState: placeholderFunction,
}

export const chatContext = createContext<ChatContext>(chatContextDefaultValues)


export default function ChatContextProvider({ children }: { children: ReactNode }) {
    const state = useChat(chatContextDefaultValues);

    return (
        <chatContext.Provider value={state}>
            {children}
        </chatContext.Provider>
    )
};
