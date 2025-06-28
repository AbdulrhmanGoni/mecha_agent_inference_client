<script lang="ts">
  import logo from "@mecha_agent_inference_client/core/logo.webp";
  import { footerLinks } from "@mecha_agent_inference_client/core/client";
</script>

<div class="footer">
  <a href={footerLinks.mechaAgentAppUrl} target="_blank" class="footer-logo">
    <img
      width={25}
      height={25}
      class="footer-image"
      src={logo}
      alt="Mecha Agent Logo"
    />
    Mecha Agent
  </a>
  <p class="footer-credit">
    <span>Made by</span>
    <a href={footerLinks.madeBy.link} target="_blank" class="footer-link">
      {footerLinks.madeBy.text}
    </a>
  </p>
  <div class="footer-links">
    <a href={footerLinks.docs.link} target="_blank" class="footer-link">
      {footerLinks.docs.text}
    </a>
    -
    <a
      href={footerLinks.termsAndConditions.link}
      target="_blank"
      class="footer-link"
    >
      {footerLinks.termsAndConditions.text}
    </a>
    -
    <a
      href={footerLinks.privacyPolicy.link}
      target="_blank"
      class="footer-link"
    >
      {footerLinks.privacyPolicy.text}
    </a>
  </div>
</div>
