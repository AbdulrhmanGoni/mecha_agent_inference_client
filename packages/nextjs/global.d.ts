type Agent = import("@mecha_agent_inference_client/core/types").Agent
type ChatMessage = import("@mecha_agent_inference_client/core/types").ChatMessage

type ChatContext = {
    chatId: string;
    setChatId(id: string): void;
    loadingMessages: boolean;
    loadingMessagesError: string;
    refetchChatMessages(): void;
    messages: ChatMessage[];
    generatingResponse: string;
    setGeneratingResponse(value: string | ((value: string) => string)): void;
    isGeneratingResponse: boolean;
    setIsGeneratingResponse(value: boolean): void;
    addMessage(chatMessage: ChatMessage): void;
    error: string;
    setError(error: string): void;
    resetState(): void;
}
