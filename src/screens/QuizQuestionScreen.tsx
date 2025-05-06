import { useState } from "react"
import { View, Text, ScrollView, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { RouteProp } from "@react-navigation/native"
import type { AnswerSubmission, RootStackParamList } from "../types"
import { submitQuiz } from "../services/apiClient"
import RadioButton from "../components/RadioButton"
import GradientButton from "../components/GradientButton"
import ErrorModal from "../components/ErrorModal"

type QuizQuestionScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "QuizQuestion">
  route: RouteProp<RootStackParamList, "QuizQuestion">
}

export default function QuizQuestionScreen({ navigation, route }: QuizQuestionScreenProps) {
  const { quizId, questions } = route.params
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<AnswerSubmission>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!questions.length) {
    return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.noQuestions}>No questions available</Text>
        </SafeAreaView>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: option,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    if (!quizId) return

    try {
      setSubmitting(true)
      setError(null)

      // Check if all questions are answered
      const unansweredQuestions = questions.filter((q) => !answers[q.id])
      if (unansweredQuestions.length > 0) {
        setError(`Please answer all questions. ${unansweredQuestions.length} question(s) remaining.`)
        setSubmitting(false)
        return
      }

      // Submit quiz using our updated API client
      const response = await submitQuiz(quizId, answers)

      // Navigate to results screen with the resultId
      navigation.replace("QuizResult", { resultId: response.resultId })
    } catch (err) {
      console.error("Error submitting quiz:", err)
      setError("Failed to submit quiz. Please try again.")
      setSubmitting(false)
    }
  }

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${progress}%` }]} />
          </View>

          {/* Question counter */}
          <View style={styles.counterContainer}>
            <Text style={styles.counter}>
              Question {currentQuestion + 1} of {questions.length}
            </Text>
          </View>

          {/* Question card */}
          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{question.text}</Text>
            <View style={styles.optionsContainer}>
              {question.options.map((option) => (
                  <RadioButton
                      key={option}
                      label={option}
                      value={option}
                      selected={answers[question.id] === option}
                      onSelect={handleOptionSelect}
                  />
              ))}
            </View>
          </View>

          {/* Navigation buttons */}
          <View style={styles.navigationContainer}>
            <GradientButton
                title="Previous"
                onPress={handlePrevious}
                disabled={currentQuestion === 0}
                variant="secondary"
                fullWidth={false}
            />

            {currentQuestion < questions.length - 1 ? (
                <GradientButton title="Next" onPress={handleNext} disabled={!answers[question.id]} fullWidth={false} />
            ) : (
                <GradientButton
                    title={submitting ? "Submitting..." : "Submit Answers"}
                    onPress={handleSubmit}
                    disabled={submitting || !answers[question.id]}
                    loading={submitting}
                    fullWidth={false}
                />
            )}
          </View>
        </ScrollView>

        <ErrorModal
            visible={!!error}
            message={error || ""}
            onRetry={() => handleSubmit()}
            onClose={() => setError(null)}
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
  noQuestions: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#6b7280",
  },
  progressContainer: {
    width: "100%",
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 9999,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: 8,
    borderRadius: 9999,
    backgroundColor: "#8b5cf6",
  },
  counterContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  counter: {
    backgroundColor: "#f3e8ff",
    color: "#6d28d9",
    borderRadius: 9999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  questionCard: {
    marginBottom: 24,
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
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 8,
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 24,
  },
})
