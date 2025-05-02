export function formatDate(created_at: string) {
    const date = new Date(created_at);
    const formatted = date.toLocaleDateString("en-US", {
        month: "long",
        day:   "numeric",
        year:  "numeric",
    });
    return formatted;
};