import { useEffect, useState } from "react";

export default function SwitchTheme() {
    const [isDark, setIsDark] = useState(true)

    function switchTheme() {
        const idDarkTheme = document.querySelector("#mecha-agent-chat")?.classList.toggle('dark');
        setIsDark(!!idDarkTheme);
        localStorage.setItem("mecha-agent-chat-theme", idDarkTheme ? "dark" : "light")
    }

    useEffect(() => {
        const theme = localStorage.getItem("mecha-agent-chat-theme");
        if (theme) {
            setIsDark(theme === "dark")
        } else {
            const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(systemIsDark)
        }
    }, [])

    return (
        <button
            type="button"
            onClick={switchTheme}
            className="switch-theme"
        >
            {
                isDark ? (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="4"></circle>
                            <path d="M12 2v2"></path>
                            <path d="M12 20v2"></path>
                            <path d="m4.93 4.93 1.41 1.41"></path>
                            <path d="m17.66 17.66 1.41 1.41"></path>
                            <path d="M2 12h2"></path>
                            <path d="M20 12h2"></path>
                            <path d="m6.34 17.66-1.41 1.41"></path>
                            <path d="m19.07 4.93-1.41 1.41"></path>
                        </svg>
                        Light
                    </>
                ) : <>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                    </svg>
                    Dark
                </>
            }
        </button>
    )
};
