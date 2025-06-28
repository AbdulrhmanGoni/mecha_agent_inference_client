"use client"
import "@mecha_agent_inference_client/core/styles.css"
import { useEffect } from "react"
import useAgent from "../hooks/useAgent"
import Alert from "./Alert"
import LoadingAgent from "./LoadingAgent"
import ChatLayout from "./ChatLayout"

export default function MechaAgentChat() {
    const { agent, agentLoading, agentError } = useAgent();

    function setTheme(idDarkTheme: boolean) {
        if (idDarkTheme) {
            document.querySelector("#mecha-agent-chat")?.classList.add('dark')
        } else {
            document.querySelector("#mecha-agent-chat")?.classList.remove('dark')
        }
    }

    useEffect(() => {
        const theme = localStorage.getItem("mecha-agent-chat-theme");
        if (theme) {
            setTheme(theme === "dark")
        } else {
            const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setTheme(systemIsDark)
        }
    }, [])

    return (
        <div id="mecha-agent-chat">
            {
                agentLoading ? <LoadingAgent /> :
                    agentError ? <Alert message={agentError} /> :
                        agent ? <ChatLayout agent={agent} /> : null
            }
        </div>
    )
};
