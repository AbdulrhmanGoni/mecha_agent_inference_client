import Image from "next/image";
import { useContext } from "react";
import { chatContext } from "./ChatContextProvider";
import SwitchTheme from "./SwitchTheme";

export default function Header({ agent }: { agent: Agent }) {
    const state = useContext(chatContext)

    function startNewChat() {
        state.resetState()
    }

    return (
        <div className="header">
            <div className="agent-info">
                {
                    agent.avatar ?
                        <Image
                            width={48}
                            height={48}
                            className="avatar"
                            src={agent.avatar}
                            alt="Agent Avatar"
                        /> : <span className="avatar agent-fallback-avatar" />
                }
                <div>
                    <p className="agent-name">{agent.agentName}</p>
                    <p className="agent-description">{agent.description}</p>
                </div>
            </div>
            <div className="actions">
                <SwitchTheme />
                <button
                    className="new-chat-button"
                    onClick={startNewChat}
                >
                    New Chat
                </button>
            </div>
        </div>
    )
};
