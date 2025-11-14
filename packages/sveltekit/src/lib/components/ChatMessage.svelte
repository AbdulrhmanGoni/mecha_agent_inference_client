<script lang="ts">
  import IsTypingState from "./IsTypingState.svelte";

  type ChatMessageProps = {
    agent: Agent;
    isGenerating?: boolean;
  } & ChatMessage;

  const { role, agent, content, isGenerating }: ChatMessageProps = $props();

  const isUserPart = role === "user";
</script>

<div class={`chat-box ${isUserPart ? "chat-box-user" : ""}`}>
  {#if isUserPart}
    <span class="chat-avatar user-avatar"></span>
  {:else if agent.avatar}
    <img class="chat-avatar" src={agent.avatar} alt="Agent Avatar" />
  {:else}
    <span class="chat-avatar agent-fallback-avatar"></span>
  {/if}
  <div class="chat-content">
    <span class={`chat-name ${isUserPart ? "chat-name-user" : ""}`}>
      {isUserPart ? "You" : agent.agentName}
    </span>
    <div
      class={`chat-message ${isUserPart ? "chat-message-user" : "chat-message-agent"}`}
    >
      {#if content}
        <p class="chat-text">{content}</p>
      {:else if isGenerating}
        <IsTypingState />
      {/if}
    </div>
  </div>
</div>
