type AgentState = {
    agent: Agent | null;
    loading: boolean;
    error: string;
}

export const agentState = $state<AgentState>({
    agent: null,
    loading: false,
    error: ""
});

export function fetchAgentData(agentId: string = "") {
    if (!agentState.loading) {
        agentState.loading = true
        fetch("/api/mecha-agent?target=agent-data" + (agentId ? `&agentId=${agentId}` : ""))
            .then((res) => res.json())
            .then((res) => {
                if (res.result) {
                    agentState.agent = res.result as Agent;
                    agentState.error = "";
                } else {
                    agentState.error = res.error;
                }
            })
            .catch((error) => { agentState.error = error.message })
            .finally(() => { agentState.loading = false })
    }
}