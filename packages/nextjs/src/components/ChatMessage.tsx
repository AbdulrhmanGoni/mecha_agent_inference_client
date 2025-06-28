import Image from "next/image";
import IsTypingState from "./IsTypingState";
import { createAgentAvatarUrl } from "@mecha_agent_inference_client/core/client";

type ChatMessageProps = {
    agent: Agent;
    isGenerating?: boolean
} & ChatMessage

export default function ChatMessage({ agent, role, content, isGenerating }: ChatMessageProps) {
    const isUserPart = role === "user";

    return (
        <div className={`chat-box ${isUserPart ? "chat-box-user" : ""}`}>
            {
                isUserPart ? <span className="chat-avatar user-avatar" /> :
                    agent.avatar ?
                        <Image
                            width={40}
                            height={40}
                            className='chat-avatar'
                            src={createAgentAvatarUrl(agent.avatar)}
                            alt={"Agent Avatar"}
                        /> : <span className="chat-avatar agent-fallback-avatar" />
            }
            <div className="chat-content">
                <span className={`chat-name ${isUserPart ? "chat-name-user" : ""}`}>
                    {isUserPart ? "You" : agent.agentName}
                </span>
                <div className={`chat-message ${isUserPart ? "chat-message-user" : "chat-message-agent"}`}>
                    {content ? <p className="chat-text">{content}</p> : isGenerating && <IsTypingState />}
                </div>
            </div>
        </div>
    );
}