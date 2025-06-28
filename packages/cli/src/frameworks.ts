export const frameworks: SupportedFramework[] = [
    {
        name: "nextjs",
        apiRouteDir: "src/app/api/mecha-agent",
        routeFileName: "route",
    },
    {
        name: "sveltekit",
        apiRouteDir: "src/routes/api/mecha-agent",
        routeFileName: "+server",
    },
]

export function listSupportedFrameworks() {
    return `Supported frameworks are: ${frameworks.map(f => f.name).join(", ")}`
}