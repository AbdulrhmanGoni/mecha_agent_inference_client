import "../styles/index.css"

type promptRequestOptions = {
    prompt: string,
    chatId?: string,
    onData: (data: string) => void,
    onEnd?: (fullResponse: string, newChatId: string | null) => void,
    onError?: (message: string) => void,
}

export async function promptRequest(
    { prompt, chatId, onData, onEnd, onError }: promptRequestOptions
) {
    const { scroll, endScrolling } = autoScrollToTheEndOfChat();
    try {
        scroll()
        const response = await fetch(`/api/mecha-agent?target=chat&chatId=${chatId || "new"}`, {
            method: "POST",
            body: JSON.stringify({ prompt }),
        });

        if (response.status === 200 && response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            let done = false;
            let fullResponse = ""
            while (!done) {
                const { value, done: readerDone } = await reader.read();
                if (readerDone) break;
                const data = decoder.decode(value)
                onData(data)
                fullResponse += data
            }
            const newChatId = response.headers.get("chatId");
            if (newChatId) {
                localStorage.setItem("last-mecha-agent-chat-session", newChatId)
            }
            onEnd?.(fullResponse, newChatId)
        } else {
            const res = await response.json()
            onError?.(res.error || "Unexpected error !")
        }
        scroll()
    } catch (error: any) {
        onError?.(error?.message || "Unexpected error !")
    }

    endScrolling()
};

export function createAgentAvatarUrl(avatarId: string) {
    return `/api/mecha-agent?target=agent-avatar&avatarId=${avatarId}`;
}

function autoScrollToTheEndOfChat() {
    const messagesContainer = document.querySelector("#mecha-agent-chat .chat-messages-container");

    function scroll() {
        messagesContainer?.scroll({
            behavior: "smooth",
            top: messagesContainer.scrollHeight,
        });
    }

    const intervalId = setInterval(scroll, 1000);

    return {
        scroll,
        endScrolling() {
            clearInterval(intervalId)
        }
    }
}

type FooterLink = {
    text: string,
    link: string
}

type FooterLinks = {
    mechaAgentAppUrl: string;
    madeBy: FooterLink;
    docs: FooterLink;
    termsAndConditions: FooterLink;
    privacyPolicy: FooterLink;
}

export const footerLinks: FooterLinks = {
    mechaAgentAppUrl: process.env.MECHA_AGENT_APP_URL as string,
    madeBy: {
        link: "https://github.com/AbdulrhmanGoni",
        text: "Abdulrhman Goni",
    },
    docs: {
        text: "Docs",
        link: "https://github.com/AbdulrhmanGoni/mecha-agent-inference-client",
    },
    termsAndConditions: {
        text: "Terms",
        link: `${process.env.MECHA_AGENT_APP_URL}/terms-and-conditions`,
    },
    privacyPolicy: {
        text: "Privacy",
        link: `${process.env.MECHA_AGENT_APP_URL}/privacy`,
    },
}
