import { useContext } from "react";
import { chatContext } from "./ChatContextProvider";
import Alert from "./Alert";
import ChatMessage from "./ChatMessage";
import LoadingChatMessages from "./LoadingChatMessages";

export default function ChatBody({ agent }: { agent: Agent }) {
    const state = useContext(chatContext)

    if (state.loadingMessages) {
        return <LoadingChatMessages />
    }

    if (!state.messages.length && !state.loadingMessages && !state.loadingMessagesError) {
        return (
            <h1 className="greeting-message">
                {agent.greetingMessage}
            </h1>
        )
    }

    if (state.loadingMessagesError && !state.loadingMessages) {
        return <Alert
            message={state.loadingMessagesError}
            actionIcon={
                <button
                    className="refetch-chat-messages-icon"
                    onClick={() => { state.refetchChatMessages() }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill="currentColor"
                            d="M11.896 18a.75.75 0 0 1-.75.75c-3.792 0-6.896-3.005-6.896-6.75s3.104-6.75 6.896-6.75c3.105 0 5.749 2.015 6.605 4.801l.603-1.02a.75.75 0 0 1 1.292.763l-1.63 2.755a.75.75 0 0 1-1.014.272L14.18 11.23a.75.75 0 1 1 .737-1.307l1.472.83c-.574-2.288-2.691-4.003-5.242-4.003C8.149 6.75 5.75 9.117 5.75 12s2.399 5.25 5.396 5.25a.75.75 0 0 1 .75.75"
                        />
                    </svg>
                </button>
            }
        />
    }

    return (
        <div className="chat-messages-container">
            {
                state.messages.map((message, i) => (
                    <ChatMessage
                        agent={agent}
                        content={message.content}
                        role={message.role}
                        key={message.role + i}
                    />
                ))
            }
            {
                state.isGeneratingResponse &&
                <ChatMessage
                    agent={agent}
                    role='agent'
                    content={state.generatingResponse!}
                    isGenerating
                />
            }
        </div>
    )
};
