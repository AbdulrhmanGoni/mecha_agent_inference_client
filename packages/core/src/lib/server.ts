type Params = {
    apiKey: string;
    agentId: string;
    prompt?: string;
    chatId?: string;
    avatarId?: string;
}

type GetAgentDataReturn = {
    body: Record<string, unknown> | Response["body"];
    status: number;
    headers
    ?: Record<string, unknown>;
}

const MECHA_AGENT_BASE_URL = process.env.MECHA_AGENT_BASE_URL;

export async function GetAgentData({ apiKey, agentId }: Params): Promise<GetAgentDataReturn> {
    try {
        const url = `${MECHA_AGENT_BASE_URL}/api/agents/${agentId}?published=yes`
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + apiKey,
            },
        });

        if (!response.ok) {
            const errorBody = await response.json()
            console.error(
                `Error from mecha agent server at \`GET /api/agents/${agentId}\`:`,
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
        const url = `${MECHA_AGENT_BASE_URL}/api/chats/${chatId}?agentId=${agentId}&anonymous=yes`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + apiKey
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorBody = await response.json()
            console.error(
                `Error from mecha agent server at \`POST /api/chats/${chatId}\`:`,
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
        const url = `${MECHA_AGENT_BASE_URL}/api/chats/${chatId}?agentId=${agentId}&anonymous=yes`
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + apiKey
            },
        });

        if (!response.ok) {
            const errorBody = await response.json()
            console.error(
                `Error from mecha agent server at \`GET /api/chats/${chatId}\`:`,
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

export async function GetAgentAvatar({ apiKey, agentId, avatarId }: Params): Promise<GetAgentDataReturn> {
    try {
        const url = `${MECHA_AGENT_BASE_URL}/api/media/agents-avatars/${avatarId}`
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + apiKey
            },
        });

        if (!response.ok) {
            const errorBody = await response.json();
            console.error(
                `Error from mecha agent server at \`GET /api/media/agents-avatars/${avatarId}\`:`,
                errorBody.error || 'Unknown error'
            );
            return { body: { error: "Error from mecha agent server" }, status: response.status }
        }

        return {
            body: response.body,
            status: response.status,
            headers: { "Content-Type": response.headers.get("Content-Type") as string },
        }
    } catch (error) {
        console.error(`Error in "agent avatar" proxy. Agent id: ${agentId}, Avatar id: ${avatarId}`, error);
        return internalServerError
    }
}

const internalServerError = { body: { error: 'Internal server error' }, status: 500 }