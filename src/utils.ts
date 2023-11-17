export function parseEnvNumber(variable: string, defaultValue: number): number {
    if (Bun.env[variable] === undefined) {
        return defaultValue;
    }

    return Number(Bun.env[variable]);
}

export function parseEnvString(variable: string, defaultValue: string): string {
    if (Bun.env[variable] === undefined) {
        return defaultValue;
    }

    return String(Bun.env[variable]);
}

export function parseEnvBool(variable: string, defaultValue: boolean): boolean {
    if (Bun.env[variable] === undefined) {
        return defaultValue;
    }

    return Boolean(Bun.env[variable]);
}