<script lang="ts">
    import { createAgentAvatarUrl } from "@mecha-agent-inference-client/core/client";
    import { resetChatState } from "../store/chat.svelte.js";
    import SwitchTheme from "./SwitchTheme.svelte";

    const { agent }: { agent: Agent } = $props();
</script>

<div class="header">
    <div class="agent-info">
        {#if agent.avatar}
            <img
                class="avatar"
                src={createAgentAvatarUrl(agent.avatar)}
                alt="Agent Avatar"
            />
        {:else}
            <span class="avatar agent-fallback-avatar"></span>
        {/if}
        <div>
            <p class="agent-name">{agent.agentName}</p>
            <p class="agent-description">{agent.description}</p>
        </div>
    </div>
    <div class="actions">
        <SwitchTheme />
        <button class="new-chat-button" onclick={resetChatState}>
            New Chat
        </button>
    </div>
</div>
