export function isNullOrEmpty(text: string) {
    if (text.length === 0 || text === "")
        return true;

    return false;
}