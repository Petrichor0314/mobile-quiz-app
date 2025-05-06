import { useEffect, useState } from "react"
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import type { QuizData, RootStackParamList } from "../types"
import { getQuizById } from "../services/apiClient"
import GradientButton from "../components/GradientButton"
import ErrorModal from "../components/ErrorModal"
import { LinearGradient } from "expo-linear-gradient"

type QuizDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "QuizDetail">
  route: RouteProp<RootStackParamList, "QuizDetail">
}

export default function QuizDetailScreen({ navigation, route }: QuizDetailScreenProps) {
  // Make sure we're extracting quizId from route.params
  const { quizId } = route.params
  const [quiz, setQuiz] = useState<QuizData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchQuizDetails = async () => {
    if (!quizId) return

    try {
      setLoading(true)
      setError(null)
      const quizData = await getQuizById(quizId)
      setQuiz(quizData)
    } catch (err) {
      setError("Failed to load quiz details")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuizDetails()
  }, [quizId])

  const handleStartQuiz = () => {
    if (!quiz) return

    navigation.navigate("QuizQuestion", {
      quizId: quizId, // Use the quizId from route.params instead of quiz.id
      questions: quiz.questions,
    })
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

  if (error || !quiz) {
    return (
        <SafeAreaView style={styles.container}>
          <ErrorModal
              visible={true}
              message={error || "Quiz not found"}
              onRetry={fetchQuizDetails}
              onClose={() => navigation.goBack()}
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
              <Text style={styles.title}>{quiz.title}</Text>
            </LinearGradient>
            <Text style={styles.description}>{quiz.description}</Text>

            <View style={styles.detailsCard}>
              <Text style={styles.detailsTitle}>Quiz Details:</Text>
              <View style={styles.detailsContent}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Questions:</Text>
                  <Text style={styles.detailValue}>{quiz.questions.length}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Estimated Time:</Text>
                  <Text style={styles.detailValue}>{quiz.questions.length * 30} seconds</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Difficulty:</Text>
                  <Text style={styles.detailValue}>
                    {quiz.questions.length <= 3 ? "Easy" : quiz.questions.length <= 7 ? "Medium" : "Hard"}
                  </Text>
                </View>
              </View>
            </View>

            <GradientButton title="Start Quiz" onPress={handleStartQuiz} disabled={quiz.questions.length === 0} />
          </View>
        </ScrollView>
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
  headerContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  titleGradient: {
    borderRadius: 8,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  description: {
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 24,
  },
  detailsCard: {
    width: "100%",
    padding: 24,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd6fe",
    marginBottom: 24,
  },
  detailsTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 16,
  },
  detailsContent: {
    gap: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    color: "#6b7280",
  },
  detailValue: {
    fontWeight: "500",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
