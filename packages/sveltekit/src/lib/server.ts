import type { RequestEvent } from "@sveltejs/kit";
import { GetAgentData, SendPrompt, GetChatMessages } from "@mecha_agent_inference_client/core/server";

type RouteHandlerConfig = import("@mecha_agent_inference_client/core/types").MechaAgentRouteHandlerConfig

function GetAgentDataHandler(config?: RouteHandlerConfig) {
    return async function (e: RequestEvent) {
        const { body, status } = await GetAgentData({
            agentId: e.url.searchParams.get("agentId") || config?.agentId || "",
            apiKey: config?.apiKey,
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
}

function GetChatMessagesHandler(config?: RouteHandlerConfig) {
    return async function (e: RequestEvent) {
        const { body, status } = await GetChatMessages({
            agentId: e.url.searchParams.get("agentId") || config?.agentId || "",
            apiKey: config?.apiKey,
            chatId: e.url.searchParams.get("chatId")?.toString(),
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
};

function SendPromptHandler(config?: RouteHandlerConfig) {
    return async function (e: RequestEvent) {
        const json = await e.request.json()
        const { body, status, headers } = await SendPrompt({
            agentId: e.url.searchParams.get("agentId") || config?.agentId || "",
            apiKey: config?.apiKey,
            chatId: e.url.searchParams.get("chatId")?.toString(),
            prompt: json?.prompt
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status, headers: { chatId: (headers?.chatId || "") as string } }
        );
    }
};

export function handler(config?: RouteHandlerConfig) {
    return function (e: RequestEvent) {
        switch (e.request.method) {
            case 'GET': {
                switch (e.url.searchParams.get("target")) {
                    case "agent-data": {
                        return GetAgentDataHandler(config)(e)
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
