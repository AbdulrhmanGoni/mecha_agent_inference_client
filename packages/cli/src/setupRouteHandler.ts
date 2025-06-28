import { copyFile, existsSync, mkdirSync } from "node:fs";

export function setupRouteHandler(framework: SupportedFramework, options: RouteSetupOptions) {
    const dist = `${process.cwd()}/${framework.apiRouteDir}`
    if (!existsSync(dist)) {
        mkdirSync(dist, { recursive: true });
    }

    const extention = options.useTs ? "ts" : "js";

    const distFile = `"${framework.apiRouteDir}/${framework.routeFileName}.${extention}"`
    copyFile(
        `${__dirname}/snippets/${framework.name}-route-setup.${extention}`,
        `${dist}/${framework.routeFileName}.${extention}`,
        (error) => {
            if (error) {
                console.log(
                    `Error while setting up the Mecha Agent inference client route handler in`,
                    `"${distFile}" file ❌:`,
                    error
                )
            }
            console.log(
                "The Mecha Agent inference client route handler was set up in",
                `"${distFile}" file successfully ✅`
            );
        }
    )
};
