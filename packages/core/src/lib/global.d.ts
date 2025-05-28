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