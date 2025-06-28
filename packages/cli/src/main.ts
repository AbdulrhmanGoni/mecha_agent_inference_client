#!/usr/bin/env node
import { installPackage } from "./installPackage";
import { argsValidation } from "./argsValidation";
import { setupRouteHandler } from "./setupRouteHandler";

const { framework, options } = argsValidation(process.argv)

installPackage(`@mecha_agent_inference_client/${framework.name}`)

setupRouteHandler(framework, options)