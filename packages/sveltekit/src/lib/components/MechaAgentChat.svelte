<script lang="ts">
  import "@mecha_agent_inference_client/core/styles.css";
  import PromptInput from "./PromptInput.svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";
  import ChatBody from "./ChatBody.svelte";
  import Alert from "./Alert.svelte";
  import LoadingAgent from "./LoadingAgent.svelte";
  import { onMount } from "svelte";
  import { agentState, fetchAgentData } from "../store/agent.svelte.js";
  import { chatState } from "../store/chat.svelte.js";

  const { agentId }: { agentId?: string } = $props();

  function setTheme(idDarkTheme: boolean) {
    if (idDarkTheme) {
      document.querySelector("#mecha-agent-chat")?.classList.add("dark");
    } else {
      document.querySelector("#mecha-agent-chat")?.classList.remove("dark");
    }
  }

  onMount(() => {
    fetchAgentData(agentId);
    const theme = localStorage.getItem("mecha-agent-chat-theme");
    if (theme) {
      setTheme(theme === "dark");
    } else {
      const systemIsDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setTheme(systemIsDark);
    }

    chatState.chatId =
      localStorage.getItem("last-mecha-agent-chat-session") || "";
  });
</script>

<div id="mecha-agent-chat">
  {#if agentState.loading}
    <LoadingAgent />
  {:else if agentState.error}
    <Alert message={agentState.error} actionIcon={retryButton} />
  {:else if agentState.agent}
    <div class="chat-layout">
      <Header agent={agentState.agent} />
      <div class="chat-body-container">
        <ChatBody agent={agentState.agent} />
        <PromptInput />
      </div>
      <Footer />
    </div>
  {/if}
</div>

{#snippet retryButton()}
  <button onclick={() => fetchAgentData(agentId)}>Retry</button>
{/snippet}
