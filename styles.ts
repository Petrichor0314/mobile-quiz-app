import { StyleSheet } from "react-native"

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export const colors = {
    primary: "#8b5cf6", // purple-500
    primaryDark: "#6d28d9", // purple-700
    secondary: "#ec4899", // pink-500
    background: "#f8fafc", // slate-50
    white: "#ffffff",
    black: "#000000",
    gray: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
    },
    success: "#10b981", // emerald-500
    error: "#ef4444", // red-500
}
