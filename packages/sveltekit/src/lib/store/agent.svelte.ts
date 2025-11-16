import type { MechaAgentConfig } from "@mecha_agent_inference_client/core/types";

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

export function fetchAgentData(config: MechaAgentConfig) {
    if (!agentState.loading) {
        agentState.loading = true
        fetch(config.routeHandlerPath + "?target=agent-data" + (config.agentId ? `&agentId=${config.agentId}` : ""))
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