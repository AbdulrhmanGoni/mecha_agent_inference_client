import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

function getPackageManager() {
    if (existsSync("bun.lockb") || existsSync("bun.lock")) {
        console.log('📦 Bun package manager detected');
        return "bun"
    };

    if (existsSync("yarn.lock")) {
        console.log('📦 yarn package manager detected');
        return "yarn"
    };

    if (existsSync("pnpm-lock.yaml")) {
        console.log('📦 pnpm package manager detected');
        return "pnpm"
    };

    if (existsSync("package-lock.json")) {
        console.log('📦 npm package manager detected');
        return "npm"
    };

    console.warn('📦 No package manager detected ❌. Defaulting to npm');
    return "npm";
}

export function installPackage(pkgName: string) {
    const pm = getPackageManager();
    const commands = {
        npm: `npm install ${pkgName}`,
        bun: `bun add ${pkgName}`,
        yarn: `yarn add ${pkgName}`,
        pnpm: `pnpm add ${pkgName}`,
    };

    try {
        console.log(`📦 Installing "${pkgName}" package...`);
        execSync(commands[pm], { stdio: "inherit" });
        console.log(`📦 "${pkgName}" package installed succesfully ✅`);
    } catch {
        console.error(
            `❌ Failed to install "${pkgName}" package.\n`,
            `If the error persist, Try to install it manually by running "${commands[pm]}"`,
        )
    }
}
