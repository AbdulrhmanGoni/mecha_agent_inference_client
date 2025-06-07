import ChatBody from "./ChatBody";
import ChatContextProvider from "./ChatContextProvider";
import Footer from "./Footer";
import Header from "./Header";
import PromptInput from "./PromptInput";

export default function ChatLayout({ agent }: { agent: Agent }) {
    return (
        <ChatContextProvider>
            <div className="chat-layout">
                <Header agent={agent} />
                <div className="chat-body-container">
                    <ChatBody agent={agent} />
                    <PromptInput />
                </div>
                <Footer />
            </div>
        </ChatContextProvider>
    )
};
