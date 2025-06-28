import { frameworks, listSupportedFrameworks } from "./frameworks";
import { parseOptions } from "./parseOptions";

export function argsValidation(argv: string[]) {
    const [, , frameworkName, ...args] = argv;

    if (!frameworkName) {
        throw (
            '❌ You must specify a framework to setup the mecha agent inference client into it.\n' +
            listSupportedFrameworks()
        );
    }

    const framework = frameworks.find((framework) => framework.name === frameworkName)

    if (!framework) {
        throw (
            `❌ Unsupported Framework: ${frameworkName}\n` +
            listSupportedFrameworks()
        );
    }

    return {
        framework,
        options: parseOptions(args)
    }
};
