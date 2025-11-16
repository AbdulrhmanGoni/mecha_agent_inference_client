type Agent = import("@mecha_agent_inference_client/core/types").Agent
type MechaAgentConfig = import("@mecha_agent_inference_client/core/types").MechaAgentConfig

type ChatMessage = import("@mecha_agent_inference_client/core/types").ChatMessage & {
    isGenerating?: boolean,
    error?: string
}