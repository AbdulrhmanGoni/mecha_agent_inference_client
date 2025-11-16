import type { MechaAgentRouteHandlerConfig } from "./global";

type RouteHandlerReturn = {
    body: Record<string, unknown> | Response["body"];
    status: number;
    headers?: Record<string, unknown>;
}

const MECHA_AGENT_HOST_URL = process.env.MECHA_AGENT_HOST_URL;

type GetAgentDataHandlerParams = MechaAgentRouteHandlerConfig
export async function GetAgentData({ apiKey, agentId, serverHost }: GetAgentDataHandlerParams): Promise<RouteHandlerReturn> {
    try {
        const host = serverHost || MECHA_AGENT_HOST_URL
        const path = `/api/agents${apiKey ? "" : "/public"}/${agentId}`
        const response = await fetch(host + path, {
            headers: {
                'Content-Type': 'application/json',
                ...(apiKey ? { Authorization: "Bearer " + apiKey } : undefined),
            },
        });

        if (!response.ok) {
            const errorBody = await response.json()
            console.error(
                `Error from mecha agent server at \`GET ${path}\`:`,
                errorBody.error || 'Unknown error'
            );
            return { body: { error: "Error from mecha agent server" }, status: response.status }
        }

        return { body: await response.json(), status: response.status }
    } catch (error) {
        console.error(`Error in "agent data" proxy. Agent id: "${agentId}"`, error);
        return internalServerError
    }
};

type SendPromptHandlerParams = MechaAgentRouteHandlerConfig & {
    prompt?: string;
    chatId?: string;
}
export async function SendPrompt({ apiKey, agentId, chatId, prompt, serverHost }: SendPromptHandlerParams): Promise<RouteHandlerReturn> {
    try {
        const host = serverHost || MECHA_AGENT_HOST_URL
        const path = `/api/chats${apiKey ? "" : "/public"}/${chatId}?agentId=${agentId}`
        const response = await fetch(host + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(apiKey ? { Authorization: "Bearer " + apiKey } : undefined),
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorBody = await response.json()
            console.error(
                `Error from mecha agent server at \`POST ${path}\`:`,
                errorBody.error || 'Unknown error'
            );
            return { body: { error: "Error from mecha agent server" }, status: response.status }
        }

        return {
            body: response.body,
            status: 200,
            headers: { chatId: response.headers.get("chatId") || "" }
        }
    } catch (error) {
        console.error(`Error in "chat" proxy. Chat id: "${chatId}"`, error);
        return internalServerError
    }
}

type GetChatMessagesHandlerParams = MechaAgentRouteHandlerConfig & {
    chatId?: string;
}
export async function GetChatMessages({ apiKey, agentId, chatId, serverHost }: GetChatMessagesHandlerParams): Promise<RouteHandlerReturn> {
    try {
        const host = serverHost || MECHA_AGENT_HOST_URL
        const path = `/api/chats${apiKey ? "" : "/public"}/${chatId}?agentId=${agentId}`
        const response = await fetch(host + path, {
            headers: {
                'Content-Type': 'application/json',
                ...(apiKey ? { Authorization: "Bearer " + apiKey } : undefined),
            },
        });

        if (!response.ok) {
            const errorBody = await response.json()
            console.error(
                `Error from mecha agent server at \`GET ${path}\`:`,
                errorBody.error || 'Unknown error'
            );
            return { body: { error: "Error from mecha agent server" }, status: response.status }
        }

        return { body: await response.json(), status: 200 }
    } catch (error) {
        console.error(`Error in "chat messages" proxy. Chat id: ${chatId}`, error);
        return internalServerError
    }
}

const internalServerError = { body: { error: 'Internal server error' }, status: 500 }