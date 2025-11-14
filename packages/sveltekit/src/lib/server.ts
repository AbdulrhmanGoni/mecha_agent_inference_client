import type { RequestEvent } from "@sveltejs/kit";
import { GetAgentData, SendPrompt, GetChatMessages, GetAgentAvatar } from "@mecha_agent_inference_client/core/server";

type MechaAgentRouteHandlerConfig = {
    agentId: string;
    apiKey: string;
}

function GetAgentDataHandler(config: MechaAgentRouteHandlerConfig) {
    return async function () {
        const { body, status } = await GetAgentData({
            agentId: config.agentId,
            apiKey: config.apiKey,
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
}

function GetChatMessagesHandler(config: MechaAgentRouteHandlerConfig) {
    return async function (e: RequestEvent) {
        const { body, status } = await GetChatMessages({
            agentId: config.agentId,
            apiKey: config.apiKey,
            chatId: e.url.searchParams.get("chatId")?.toString(),
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
};

function SendPromptHandler(config: MechaAgentRouteHandlerConfig) {
    return async function (e: RequestEvent) {
        const json = await e.request.json()
        const { body, status, headers } = await SendPrompt({
            agentId: config.agentId,
            apiKey: config.apiKey,
            chatId: e.url.searchParams.get("chatId")?.toString(),
            prompt: json?.prompt
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status, headers: { chatId: (headers?.chatId || "") as string } }
        );
    }
};

export function handler(config: MechaAgentRouteHandlerConfig) {
    return function (e: RequestEvent) {
        switch (e.request.method) {
            case 'GET': {
                switch (e.url.searchParams.get("target")) {
                    case "agent-data": {
                        return GetAgentDataHandler(config)()
                    }

                    case "agent-avatar": {
                        return GetAgentAvatarHandler(config)(e)
                    }

                    case "chat-messages": {
                        return GetChatMessagesHandler(config)(e)
                    }

                    default: {
                        return new Response("Unknown target", { status: 400 });
                    }
                }
            }
            case 'POST': {
                if (e.url.searchParams.get("target") === "chat") {
                    return SendPromptHandler(config)(e)
                }

                return new Response("Unknown target", { status: 400 });
            }

            default: {
                return new Response("Method Not Allowed", { status: 405 });
            }
        }
    }
};
