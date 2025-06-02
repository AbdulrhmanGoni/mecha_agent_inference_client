import { useEffect, useState } from "react";

export default function useChat(defaultValues: ChatContext): ChatContext {
    const [messages, setMessages] = useState<ChatContext["messages"]>(defaultValues.messages);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [loadingMessagesError, setLoadingMessagesError] = useState("");
    const [generatingResponse, setGeneratingResponse] = useState<ChatContext["generatingResponse"]>(defaultValues.generatingResponse);
    const [isGeneratingResponse, setIsGeneratingResponse] = useState<ChatContext["isGeneratingResponse"]>(defaultValues.isGeneratingResponse);
    const [error, setError] = useState(defaultValues.error);
    const [chatId, setChatId] = useState(defaultValues.chatId);

    function fetchChatMessages(chatId: string) {
        setChatId(chatId)
        setLoadingMessages(true)
        fetch("/api/mecha-agent?target=chat-messages&chatId=" + chatId)
            .then((res) => {
                if (res.status === 404) {
                    localStorage.removeItem("last-mecha-agent-chat-session")
                    setChatId("")
                    return { result: null }
                }
                return res.json()
            })
            .then((res) => {
                if (res.result) {
                    setMessages(res.result as ChatContext["messages"]);
                    setLoadingMessagesError("");
                } else {
                    setLoadingMessagesError(res.error);
                }
            })
            .catch((error) => setLoadingMessagesError(error.message))
            .finally(() => setLoadingMessages(false))
    }

    useEffect(() => {
        const chatId = localStorage.getItem("last-mecha-agent-chat-session")
        if (chatId) {
            fetchChatMessages(chatId)
        }
    }, [])

    function resetState() {
        setMessages([]);
        setLoadingMessages(false);
        setError("");
        setChatId("");
        setIsGeneratingResponse(false);
        setGeneratingResponse("");
    }

    return {
        chatId,
        loadingMessages,
        loadingMessagesError,
        refetchChatMessages: () => { chatId && fetchChatMessages(chatId) },
        setChatId(id) { setChatId(id) },
        messages,
        addMessage(message) { setMessages((pre) => [...pre, message]) },
        generatingResponse,
        setGeneratingResponse(value) { setGeneratingResponse(value) },
        isGeneratingResponse,
        setIsGeneratingResponse(value) { setIsGeneratingResponse(value) },
        error,
        setError(error) { setError(error) },
        resetState,
    }
};
