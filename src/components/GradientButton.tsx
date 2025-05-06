import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

type GradientButtonProps = {
    title: string
    onPress: () => void
    disabled?: boolean
    loading?: boolean
    style?: object
    variant?: "primary" | "secondary"
    fullWidth?: boolean
}

export default function GradientButton({
                                           title,
                                           onPress,
                                           disabled = false,
                                           loading = false,
                                           style = {},
                                           variant = "primary",
                                           fullWidth = true,
                                       }: GradientButtonProps) {
    const isPrimary = variant === "primary"

    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, !fullWidth && styles.autoWidth, style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {isPrimary ? (
                <LinearGradient
                    colors={disabled ? ["#d1d5db", "#9ca3af"] : ["#8b5cf6", "#ec4899"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                >
                    {loading ? <ActivityIndicator color="white" size="small" /> : <Text style={styles.text}>{title}</Text>}
                </LinearGradient>
            ) : (
                <View style={[styles.gradient, styles.secondaryGradient]}>
                    {loading ? (
                        <ActivityIndicator color="#8b5cf6" size="small" />
                    ) : (
                        <Text style={[styles.text, styles.secondaryText]}>{title}</Text>
                    )}
                </View>
            )}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 50,
        overflow: "hidden",
        width: "100%",
        maxWidth: 300,
    },
    autoWidth: {
        width: "auto",
        flex: 1,
    },
    gradient: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: "center",
        justifyContent: "center",
    },
    secondaryGradient: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#8b5cf6",
    },
    text: {
        color: "white",
        fontWeight: "600",
        fontSize: 16,
    },
    secondaryText: {
        color: "#8b5cf6",
    },
    disabled: {
        opacity: 0.7,
    },
})
