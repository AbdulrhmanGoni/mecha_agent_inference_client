import { promptRequest } from "@mecha_agent_inference_client/core/client";
import { FormEvent, useContext } from "react";
import { chatContext } from "./ChatContextProvider";
import { MechaAgentConfig } from "@mecha_agent_inference_client/core/types";

export default function PromptInput({ config }: { config: MechaAgentConfig }) {
    const {
        setError,
        addMessage,
        setGeneratingResponse,
        setIsGeneratingResponse,
        setChatId,
        chatId,
        isGeneratingResponse,
        loadingMessagesError,
        loadingMessages,
    } = useContext(chatContext)

    function onPromptSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const element = e.currentTarget
        const data = new FormData(element);
        const prompt = data.get("prompt-input");

        if (prompt) {
            setIsGeneratingResponse(true)
            addMessage({
                role: "user",
                content: prompt.toString(),
            })

            promptRequest({
                prompt: prompt.toString(),
                chatId,
                config,
                onData(data) {
                    setGeneratingResponse(message => message + data)
                },
                onEnd(fullResponse, newChatId) {
                    if (newChatId) {
                        setChatId(newChatId)
                    }
                    addMessage({
                        role: "agent",
                        content: fullResponse,
                    })
                    setIsGeneratingResponse(false)
                    setGeneratingResponse("")
                    setError("")
                    element.reset()
                },
                onError(message) {
                    setError(message)
                },
            })
        }
    }

    const disabledPromptInput = loadingMessages || !!loadingMessagesError || isGeneratingResponse

    return (
        <form
            onSubmit={onPromptSubmit}
            className={`prompt-form ${disabledPromptInput ? 'disabled' : ''}`}
        >
            <input
                type="text"
                name="prompt-input"
                disabled={disabledPromptInput}
                placeholder="Type your question here"
                className={`prompt-input ${disabledPromptInput ? 'disabled' : ''}`}
            />
            <button
                type="submit"
                style={{ cursor: disabledPromptInput ? "cursor-not-allowed" : "cursor-pointer" }}
                className={`prompt-button ${disabledPromptInput ? 'disabled' : ''}`}
                disabled={disabledPromptInput}
            >
                Send
            </button>
        </form>
    )
};
