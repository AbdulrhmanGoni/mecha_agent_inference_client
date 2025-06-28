export function parseOptions(args: string[]) {
    const options = { useTs: false }

    for (let i = 0; i < args.length; i++) {
        if (args[i] === "-ts") {
            options.useTs = true
        }
    }

    return options
};
