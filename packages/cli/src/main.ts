#!/usr/bin/env node
import { installPackage } from "./installPackage";
import { argsValidation } from "./argsValidation";

const { framework, options } = argsValidation(process.argv)

installPackage(`@mecha_agent_inference_client/${framework.name}`)
