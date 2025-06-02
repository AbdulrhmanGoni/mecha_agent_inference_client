import { useEffect, useState } from "react";

export default function useAgent() {
    const [agentLoading, setAgentLoading] = useState(false);
    const [agentError, setAgentError] = useState("");
    const [agent, setAgent] = useState<Agent | null>(null);

    useEffect(fetchAgent, [])

    function fetchAgent() {
        if (!agentLoading) {
            setAgentLoading(true)
            fetch("/api/mecha-agent?target=agent-data")
                .then((res) => res.json())
                .then((res) => {
                    if (res.result) {
                        setAgent(res.result as Agent);
                        setAgentError("");
                    } else {
                        setAgentError(res.error);
                    }
                })
                .catch((error) => setAgentError(error.message))
                .finally(() => setAgentLoading(false))
        }
    }

    return {
        agent,
        agentLoading,
        agentError,
        refetchAgent: fetchAgent,
    }
};
