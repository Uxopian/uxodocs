/**
 * Product configuration for search results decoration
 */
export interface ProductConfig {
    name: string;
    logo: string;
    bgColor: string;
    badgeColor: string;
    badgeColorDark: string;
}

export const PRODUCT_CONFIG: Record<string, ProductConfig> = {
    fast2: {
        name: "Fast2",
        logo: "/img/fast2/Fast2_favicon_white.png",
        bgColor: "#2D7D9A",
        badgeColor: "#2D7D9A",
        badgeColorDark: "#5CB8C7",
    },
    arender: {
        name: "ARender",
        logo: "/img/arender/arender_logo_white.png",
        bgColor: "#3A6FD8",
        badgeColor: "#3A6FD8",
        badgeColorDark: "#6B9AE8",
    },
    flowerdocs: {
        name: "FlowerDocs",
        logo: "/img/flowerdocs/logo_flower_white.png",
        bgColor: "#8B5CF6",
        badgeColor: "#8B5CF6",
        badgeColorDark: "#A78BFA",
    },
    "uxopian-ai": {
        name: "Uxopian AI",
        logo: "/img/uxo_white.png",
        bgColor: "#D97706",
        badgeColor: "#D97706",
        badgeColorDark: "#FBBF24",
    },
};

/**
 * Detects product from text content (URL or path)
 */
export function getProductFromText(text: string): string | null {
    if (!text) return null;
    const lowerText = text.toLowerCase();

    if (lowerText.includes("/docs/uxopian-ai") || lowerText.includes("docs/uxopian-ai")) {
        return "uxopian-ai";
    }
    if (lowerText.includes("/docs/flowerdocs") || lowerText.includes("docs/flowerdocs")) {
        return "flowerdocs";
    }
    if (lowerText.includes("/docs/arender") || lowerText.includes("docs/arender")) {
        return "arender";
    }
    if (lowerText.includes("/docs/fast2") || lowerText.includes("docs/fast2")) {
        return "fast2";
    }

    return null;
}
