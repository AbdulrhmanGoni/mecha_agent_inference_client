import Image from "next/image";
import logo from "@mecha_agent_inference_client/core/logo.webp";
import { footerLinks } from "@mecha_agent_inference_client/core/client";

export default function Footer() {
    return (
        <div className="footer">
            <a
                href={footerLinks.mechaAgentAppUrl}
                target="_blank"
                className="footer-logo"
            >
                <Image
                    width={25}
                    height={25}
                    className="footer-image"
                    src={logo}
                    alt="Mecha Agent Logo"
                />
                Mecha Agent
            </a>
            <p className="footer-credit">
                <span>Made by</span>
                <a href={footerLinks.madeBy.link} target="_blank" className="footer-link">
                    {footerLinks.madeBy.text}
                </a>
            </p>
            <div className="footer-links">
                <a href={footerLinks.docs.link} target="_blank" className="footer-link">
                    {footerLinks.docs.text}
                </a>
                -
                <a
                    href={footerLinks.termsAndConditions.link}
                    target="_blank"
                    className="footer-link"
                >
                    {footerLinks.termsAndConditions.text}
                </a>
                -
                <a
                    href={footerLinks.privacyPolicy.link}
                    target="_blank"
                    className="footer-link"
                >
                    {footerLinks.privacyPolicy.text}
                </a>
            </div>
        </div>
    )
};
