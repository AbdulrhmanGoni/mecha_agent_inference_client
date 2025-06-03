export default function LoadingChatMessages() {
    return (
        <div className="loading-chat-messages-container">
            <div className="message-outgoing">
                <div className="avatar pulse" />
                <div className="messages-container">
                    <div className='meta-text-outgoing meta-text pulse'></div>
                    <div className="bubble-outgoing pulse"></div>
                </div>
            </div>
            <div className="message-incoming">
                <div className="avatar pulse" />
                <div className="messages-container">
                    <div className='meta-text meta-text-incoming pulse'></div>
                    <div className="bubble-incoming pulse"></div>
                </div>
            </div>
        </div>
    )
};
