export type Agent = {
    id: string;
    agentName: string;
    description: string;
    userEmail: string;
    greetingMessage?: string;
    avatar?: string;
}

export type ChatMessage = {
    role: "user" | "agent";
    content: string;
}

export type MechaAgentRouteHandlerConfig = {
    agentId?: string;
    apiKey?: string;
    serverHost?: string;
}

export type MechaAgentConfig = {
    agentId?: string;
    routeHandlerPath?: string;
}