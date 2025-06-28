import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { frameworks } from "./frameworks";
import { exec } from "node:child_process";

frameworks.forEach((framework) => {
    const dist = `./dist/snippets`
    if (!existsSync(dist)) {
        mkdirSync(dist, { recursive: true });
    }

    copyFileSync(
        `../../apps/${framework.name}-preview/${framework.apiRouteDir}/${framework.routeFileName}.ts`,
        `${dist}/${framework.name}-route-setup.ts`
    )

    exec(`tsc ${dist}/${framework.name}-route-setup.ts --target esnext --module preserve`);
})
