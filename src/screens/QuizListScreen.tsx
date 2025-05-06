"use client"

import { useEffect, useState } from "react"
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import type { StackNavigationProp } from "@react-navigation/stack"
import type { Quiz } from "../types"
import { getQuizzes } from "../services/apiClient"
import QuizCard from "../components/QuizCard"
import ErrorModal from "../components/ErrorModal"
import { LinearGradient } from "expo-linear-gradient"

type QuizListScreenProps = {
  navigation: StackNavigationProp<any>
}

export default function QuizListScreen({ navigation }: QuizListScreenProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchQuizzes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getQuizzes()
      setQuizzes(data)
    } catch (err) {
      setError("Failed to load quizzes. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchQuizzes()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchQuizzes()
  }, [])

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.tagline}>EXPAND YOUR KNOWLEDGE</Text>
            <View>
              <LinearGradient
                  colors={["#8b5cf6", "#ec4899"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.titleGradient}
              >
                <Text style={styles.title}>Test Your Brilliance</Text>
              </LinearGradient>
            </View>
            <Text style={styles.subtitle}>
              Challenge yourself with our collection of interactive quizzes and discover how much you really know.
            </Text>
            <View style={styles.divider} />
          </View>

          {loading && !refreshing ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#8b5cf6" />
              </View>
          ) : (
              <View>
                {quizzes.map((quiz) => (
                    <QuizCard
                        key={quiz.id}
                        quiz={quiz}
                        onPress={() => navigation.navigate("QuizDetail", { quizId: quiz.id })}
                    />
                ))}
              </View>
          )}
        </ScrollView>

        <ErrorModal visible={!!error} message={error || ""} onRetry={fetchQuizzes} onClose={() => setError(null)} />
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
    marginBottom: 32,
    alignItems: "center",
  },
  tagline: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#8b5cf6",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  titleGradient: {
    borderRadius: 4,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  subtitle: {
    color: "#6b7280",
    textAlign: "center",
    maxWidth: 300,
    marginBottom: 16,
  },
  divider: {
    width: 80,
    height: 4,
    backgroundColor: "#8b5cf6",
    borderRadius: 9999,
  },
  loadingContainer: {
    paddingVertical: 80,
    alignItems: "center",
    justifyContent: "center",
  },
})
