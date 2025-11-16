import ChatBody from "./ChatBody";
import ChatContextProvider from "./ChatContextProvider";
import Footer from "./Footer";
import Header from "./Header";
import PromptInput from "./PromptInput";

export default function ChatLayout({ agent, config }: { agent: Agent, config: MechaAgentConfig }) {
    return (
        <ChatContextProvider config={config} >
            <div className="chat-layout">
                <Header agent={agent} />
                <div className="chat-body-container">
                    <ChatBody agent={agent} />
                    <PromptInput config={config} />
                </div>
                <Footer />
            </div>
        </ChatContextProvider>
    )
};
