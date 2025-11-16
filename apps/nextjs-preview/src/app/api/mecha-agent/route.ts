import { handler } from "@mecha_agent_inference_client/nextjs";

export const routeHandler = handler({
    agentId: process.env.AGENT_ID,
    apiKey: process.env.MECHA_AGENT_API_KEY,
})

export { routeHandler as GET, routeHandler as POST };
