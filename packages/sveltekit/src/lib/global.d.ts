type Agent = import("@mecha-agent-inference-client/core/types").Agent

type ChatMessage = import("@mecha-agent-inference-client/core/types").ChatMessage & {
    isGenerating?: boolean,
    error?: string
}