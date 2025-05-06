import { useEffect, useState } from "react"
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import type { QuizResult, RootStackParamList } from "../types"
import { getQuizResult } from "../services/apiClient"
import GradientButton from "../components/GradientButton"
import ErrorModal from "../components/ErrorModal"
import { LinearGradient } from "expo-linear-gradient"

type QuizResultScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "QuizResult">
  route: RouteProp<RootStackParamList, "QuizResult">
}

export default function QuizResultScreen({ navigation, route }: QuizResultScreenProps) {
  const { resultId } = route.params
  const [result, setResult] = useState<QuizResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchResult = async () => {
    if (!resultId) return

    try {
      setLoading(true)
      setError(null)
      const data = await getQuizResult(resultId)
      setResult(data)
    } catch (err) {
      console.error("Error fetching result:", err)
      setError("Failed to load quiz results")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResult()
  }, [resultId])

  const getResultMessage = (score: number) => {
    if (score >= 80) return "Excellent!"
    if (score >= 60) return "Good job!"
    if (score >= 40) return "Not bad!"
    return "Try again!"
  }

  if (loading) {
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8b5cf6" />
          </View>
        </SafeAreaView>
    )
  }

  if (!result) {
    return (
        <SafeAreaView style={styles.container}>
          <ErrorModal
              visible={true}
              message={error || "Result not found"}
              onRetry={fetchResult}
              onClose={() => navigation.navigate("QuizList")}
          />
        </SafeAreaView>
    )
  }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.headerContainer}>
            <LinearGradient
                colors={["#8b5cf6", "#ec4899"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.titleGradient}
            >
              <Text style={styles.title}>Quiz Results</Text>
            </LinearGradient>
          </View>

          {/* Score card */}
          <View style={styles.scoreCard}>
            <Text style={styles.resultMessage}>{getResultMessage(result.totalScore)}</Text>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${result.totalScore}%` }]} />
            </View>
            <Text style={styles.scoreText}>{result.totalScore}%</Text>
          </View>

          <Text style={styles.sectionTitle}>Question Results:</Text>

          {/* Results list */}
          <View style={styles.resultsList}>
            {result.results.map((item, index) => (
                <View
                    key={item.questionId}
                    style={[styles.resultItem, item.isCorrect ? styles.correctItem : styles.incorrectItem]}
                >
                  <View style={styles.resultRow}>
                    <View style={[styles.resultIcon, item.isCorrect ? styles.correctIcon : styles.incorrectIcon]}>
                      <Text style={item.isCorrect ? styles.correctText : styles.incorrectText}>
                        {item.isCorrect ? "✓" : "✗"}
                      </Text>
                    </View>
                    <View style={styles.resultContent}>
                      <Text style={styles.questionNumber}>Question {index + 1}</Text>
                      {item.feedback && (
                          <Text style={item.isCorrect ? styles.correctFeedback : styles.incorrectFeedback}>
                            {item.feedback}
                          </Text>
                      )}
                    </View>
                  </View>
                </View>
            ))}
          </View>

          {/* Action button */}
          <GradientButton title="Try Another Quiz" onPress={() => navigation.navigate("QuizList")} />
        </ScrollView>

        <ErrorModal
            visible={!!error}
            message={error || ""}
            onRetry={fetchResult}
            onClose={() => navigation.navigate("QuizList")}
        />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  titleGradient: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  scoreCard: {
    marginBottom: 32,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd6fe",
    alignItems: "center",
  },
  resultMessage: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  progressContainer: {
    width: "100%",
    height: 12,
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: 12,
    borderRadius: 9999,
    backgroundColor: "#8b5cf6",
  },
  scoreText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#8b5cf6",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  resultsList: {
    marginBottom: 32,
    gap: 12,
  },
  resultItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  correctItem: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },
  incorrectItem: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  resultRow: {
    flexDirection: "row",
  },
  resultIcon: {
    marginRight: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  correctIcon: {
    backgroundColor: "#dcfce7",
  },
  incorrectIcon: {
    backgroundColor: "#fee2e2",
  },
  correctText: {
    color: "#16a34a",
  },
  incorrectText: {
    color: "#dc2626",
  },
  resultContent: {
    flex: 1,
  },
  questionNumber: {
    fontWeight: "500",
  },
  correctFeedback: {
    marginTop: 4,
    color: "#15803d",
  },
  incorrectFeedback: {
    marginTop: 4,
    color: "#b91c1c",
  },
})
