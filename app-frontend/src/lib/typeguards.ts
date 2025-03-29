import { ErrorApi } from "@/lib/fetchClientWithAuth";

export function isErrorApi(res: unknown): res is ErrorApi {
    if (
        typeof res === "object" &&
        res !== null &&
        "statusCode" in res &&
        "message" in res &&
        "error" in res
    ) {
        const e = res as Record<string, unknown>;

        return (
            typeof e.statusCode === "number" &&
            typeof e.message === "string" &&
            typeof e.error === "string"
        );
    }

    return false;
}
