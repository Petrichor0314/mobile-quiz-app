import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import type { Quiz } from "../types"

type QuizCardProps = {
    quiz: Quiz
    onPress: () => void
}

export default function QuizCard({ quiz, onPress }: QuizCardProps) {
    // Determine icon based on quiz title
    const getQuizIcon = (title: string) => {
        if (title.toLowerCase().includes("general")) return "📚"
        if (title.toLowerCase().includes("science")) return "🔬"
        if (title.toLowerCase().includes("history")) return "🏛️"
        if (title.toLowerCase().includes("math")) return "🧮"
        if (title.toLowerCase().includes("geography")) return "🌍"
        if (title.toLowerCase().includes("music")) return "🎵"
        if (title.toLowerCase().includes("movie") || title.toLowerCase().includes("film")) return "🎬"
        if (title.toLowerCase().includes("sport")) return "⚽"
        return "❓"
    }

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <LinearGradient colors={["#ffffff", "#f3f4f6"]} style={styles.cardGradient}>
                <Text style={styles.cardIcon}>{getQuizIcon(quiz.title)}</Text>
                <Text style={styles.cardTitle}>{quiz.title}</Text>
                <Text style={styles.cardDescription}>{quiz.description}</Text>
                <View style={styles.startButton}>
                    <LinearGradient
                        colors={["#8b5cf6", "#ec4899"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                    >
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </LinearGradient>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 16,
        marginBottom: 16,
        overflow: "hidden",
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    cardGradient: {
        padding: 20,
        borderRadius: 16,
    },
    cardIcon: {
        position: "absolute",
        top: 16,
        right: 16,
        fontSize: 32,
        opacity: 0.3,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1e293b",
        marginBottom: 8,
    },
    cardDescription: {
        fontSize: 14,
        color: "#64748b",
        marginBottom: 16,
    },
    startButton: {
        alignSelf: "flex-start",
        borderRadius: 50,
        overflow: "hidden",
    },
    buttonGradient: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 50,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
})
