import { GetAgentData, SendPrompt, GetChatMessages, GetAgentAvatar } from "@mecha_agent_inference_client/core/server";
import { NextRequest } from "next/server";

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

function GetAgentAvatarHandler(config: MechaAgentRouteHandlerConfig) {
    return async function (req: NextRequest) {
        const { body, status } = await GetAgentAvatar({
            agentId: config.agentId,
            apiKey: config.apiKey,
            avatarId: req.nextUrl.searchParams.get("avatarId")!,
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
}

function GetChatMessagesHandler(config: MechaAgentRouteHandlerConfig) {
    return async function (req: NextRequest) {
        const { body, status } = await GetChatMessages({
            agentId: config.agentId,
            apiKey: config.apiKey,
            chatId: req.nextUrl.searchParams.get("chatId")!,
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
};

function SendPromptHandler(config: MechaAgentRouteHandlerConfig) {
    return async function (req: NextRequest) {
        const json = await req.json()
        const { body, status, headers } = await SendPrompt({
            agentId: config.agentId,
            apiKey: config.apiKey,
            chatId: req.nextUrl.searchParams.get("chatId")!,
            prompt: json?.prompt
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status, headers: { chatId: (headers?.chatId || "") as string } }
        );
    }
};

export function handler(config: MechaAgentRouteHandlerConfig) {
    return async function (request: NextRequest) {
        switch (request.method) {
            case 'GET': {
                switch (request.nextUrl.searchParams.get("target")) {
                    case "agent-data": {
                        return GetAgentDataHandler(config)()
                    }

                    case "agent-avatar": {
                        return GetAgentAvatarHandler(config)(request)
                    }

                    case "chat-messages": {
                        return GetChatMessagesHandler(config)(request)
                    }

                    default: {
                        return new Response("Unknown target", { status: 400 });
                    }
                }
            }

            case 'POST': {
                if (request.nextUrl.searchParams.get("target") === "chat") {
                    return SendPromptHandler(config)(request)
                }

                return new Response("Unknown target", { status: 400 });
            }

            default: {
                return new Response("Method Not Allowed", { status: 405 });
            }
        }
    }
};
