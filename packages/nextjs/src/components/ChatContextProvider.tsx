import { createContext, ReactNode } from "react"
import useChat from "../hooks/useChat";
import { MechaAgentConfig } from "@mecha_agent_inference_client/core/types";

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

export default function ChatContextProvider({ children, config }: { children: ReactNode, config: MechaAgentConfig }) {
    const state = useChat(config, chatContextDefaultValues);

    return (
        <chatContext.Provider value={state}>
            {children}
        </chatContext.Provider>
    )
};
