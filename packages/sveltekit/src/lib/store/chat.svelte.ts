type ChatState = {
    chatId: string;
    chatFeed: ChatMessage[];
    isGenerating: boolean;
    isFetching: boolean;
    isFetched: boolean;
    error: string;
    reGenerate: () => void;
    currentPrompt: string;
}

export const chatState = $state<ChatState>({
    chatId: "",
    chatFeed: [],
    isGenerating: false,
    isFetching: false,
    isFetched: false,
    error: "",
    reGenerate: () => { },
    currentPrompt: "",
});

export function fetchChatMessages() {
    if (chatState.chatId) {
        chatState.isFetching = true;
        fetch(`/api/mecha-agent?target=chat-messages&chatId=${chatState.chatId}`)
            .then((res) => {
                if (res.status === 404) {
                    localStorage.removeItem("last-mecha-agent-chat-session")
                    chatState.chatId = ""
                    return { result: null }
                }
                return res.json()
            })
            .then((response) => {
                if (response.result) {
                    chatState.chatFeed = response.result;
                    chatState.isFetched = true;
                    chatState.error = "";
                }
            })
            .catch((error) => {
                console.log(error)
                chatState.error = error;
            })
            .finally(() => {
                chatState.isFetching = false;
            });
    }
};

export function resetChatState() {
    chatState.chatId = ""
    chatState.chatFeed = [];
    chatState.reGenerate = () => { };
    chatState.currentPrompt = '';
    chatState.isGenerating = false;
    chatState.error = "";
    chatState.isFetching = false;
    chatState.isFetched = false;
}
