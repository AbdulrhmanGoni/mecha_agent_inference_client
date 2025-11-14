<script lang="ts">
  import type { FormEventHandler } from "svelte/elements";
  import { promptRequest } from "@mecha_agent_inference_client/core/client";
  import { chatState } from "../store/chat.svelte.js";

  const onPromptSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const element = e.currentTarget;
    const data = new FormData(element);
    const prompt = data.get("prompt-input");

    if (prompt) {
      chatState.currentPrompt = prompt.toString();
      chatState.chatFeed.push(
        {
          content: chatState.currentPrompt,
          role: "user",
        },
        {
          content: "",
          role: "agent",
        },
      );

      const responsePart = chatState.chatFeed[chatState.chatFeed.length - 1];

      function generateResponse() {
        if (responsePart.content) responsePart.content = "";
        chatState.isGenerating = true;
        responsePart.isGenerating = true;
        chatState.error = "";
        responsePart.error = "";

        promptRequest({
          prompt: chatState.currentPrompt,
          chatId: chatState.chatId,
          onData(data) {
            responsePart.content += data;
          },
          onEnd(_, newChatId) {
            if (newChatId) {
              chatState.chatId = newChatId;
            }
            chatState.isGenerating = false;
            responsePart.isGenerating = false;
            chatState.currentPrompt = "";
          },
          onError(message) {
            chatState.isGenerating = false;
            responsePart.isGenerating = false;
            responsePart.error = message;
          },
        });
      }

      generateResponse();

      chatState.reGenerate = generateResponse;
    }
  };

  const disabledPromptInput = $derived(
    chatState.isGenerating || chatState.isFetching,
  );
</script>

<form
  onsubmit={onPromptSubmit}
  class="prompt-form {disabledPromptInput ? 'disabled' : ''}"
>
  <input
    type="text"
    name="prompt-input"
    disabled={disabledPromptInput}
    placeholder="Type your question here"
    class="prompt-input {disabledPromptInput ? 'disabled' : ''}"
    value={chatState.currentPrompt}
  />
  <button
    type="submit"
    class="prompt-button {disabledPromptInput ? 'disabled' : ''}"
    disabled={disabledPromptInput}
  >
    Send
  </button>
</form>
