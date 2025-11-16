import type { Component } from 'svelte';
import MechaAgentChatComponent from './components/MechaAgentChat.svelte';
import type { MechaAgentConfig } from '@mecha_agent_inference_client/core/types';

const MechaAgentChat: Component<MechaAgentConfig, {}, ""> = MechaAgentChatComponent

export { MechaAgentChat }
