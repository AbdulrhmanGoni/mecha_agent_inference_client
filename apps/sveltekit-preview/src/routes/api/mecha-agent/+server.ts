import { AGENT_ID } from "$env/static/private";
import { handler } from "@mecha_agent_inference_client/sveltekit/server";

export const fallback = handler({
    agentId: AGENT_ID,
})
