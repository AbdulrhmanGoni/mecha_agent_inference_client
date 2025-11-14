type Params = {
    apiKey?: string;
    agentId: string;
    prompt?: string;
    chatId?: string;
    avatarId?: string;
}

type GetAgentDataReturn = {
    body: Record<string, unknown> | Response["body"];
    status: number;
    headers?: Record<string, unknown>;
}

const MECHA_AGENT_BASE_URL = process.env.MECHA_AGENT_BASE_URL;

export async function GetAgentData({ apiKey, agentId }: Params): Promise<GetAgentDataReturn> {
    try {
        const path = `/api/agents${apiKey ? "" : "/public"}/${agentId}`
        const response = await fetch(MECHA_AGENT_BASE_URL + path, {
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

export async function SendPrompt({ apiKey, agentId, chatId, prompt }: Params): Promise<GetAgentDataReturn> {
    try {
        const path = `/api/chats${apiKey ? "" : "/public"}/${chatId}?agentId=${agentId}`
        const response = await fetch(MECHA_AGENT_BASE_URL + path, {
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

export async function GetChatMessages({ apiKey, agentId, chatId }: Params): Promise<GetAgentDataReturn> {
    try {
        const path = `/api/chats${apiKey ? "" : "/public"}/${chatId}?agentId=${agentId}`
        const response = await fetch(MECHA_AGENT_BASE_URL + path, {
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