export const amenityIcon = (a: string) => {
    const key = a.toLowerCase();
    if (key.includes("wi-fi") || key.includes("wifi")) return "📶";
    if (key.includes("piscine") || key.includes("pool")) return "🏊";
    if (key.includes("spa")) return "💆";
    if (key.includes("parking")) return "🅿️";
    if (key.includes("petit déjeuner") || key.includes("breakfast")) return "🥐";
    if (key.includes("plage")) return "🏖️";
    if (key.includes("gym") || key.includes("fitness")) return "🏋️";
    if (key.includes("bar")) return "🍹";
    if (key.includes("restaurant")) return "🍽️";
    return "✨";
};