import { GetAgentData, SendPrompt, GetChatMessages } from "@mecha_agent_inference_client/core/server";
import { NextRequest } from "next/server";

type RouteHandlerConfig = import("@mecha_agent_inference_client/core/types").MechaAgentRouteHandlerConfig

function GetAgentDataHandler(config?: RouteHandlerConfig) {
    return async function (req: NextRequest) {
        const { body, status } = await GetAgentData({
            ...config,
            agentId: req.nextUrl.searchParams.get("agentId") || config?.agentId || "",
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
}

function GetChatMessagesHandler(config?: RouteHandlerConfig) {
    return async function (req: NextRequest) {
        const { body, status } = await GetChatMessages({
            ...config,
            agentId: req.nextUrl.searchParams.get("agentId") || config?.agentId || "",
            chatId: req.nextUrl.searchParams.get("chatId")!,
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status }
        );
    }
};

function SendPromptHandler(config?: RouteHandlerConfig) {
    return async function (req: NextRequest) {
        const json = await req.json()
        const { body, status, headers } = await SendPrompt({
            ...config,
            agentId: req.nextUrl.searchParams.get("agentId") || config?.agentId || "",
            chatId: req.nextUrl.searchParams.get("chatId")!,
            prompt: json?.prompt
        })

        return new Response(
            body instanceof ReadableStream ? body : JSON.stringify(body),
            { status, headers: { chatId: (headers?.chatId || "") as string } }
        );
    }
};

export function handler(config?: RouteHandlerConfig) {
    return async function (request: NextRequest) {
        switch (request.method) {
            case 'GET': {
                switch (request.nextUrl.searchParams.get("target")) {
                    case "agent-data": {
                        return GetAgentDataHandler(config)(request)
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
