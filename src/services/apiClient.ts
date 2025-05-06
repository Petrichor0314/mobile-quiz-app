import axios from "axios"
import type { Quiz, QuizData, AnswerSubmission, QuizResult } from "../types"

// Use your computer's IP address when testing on a physical device
// For example: "http://192.168.1.100:3000" instead of "http://localhost:3000"
const API_URL = "http://localhost:3000"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Important: This ensures credentials like cookies are sent with the request
  withCredentials: false,
})

// Get all quizzes
export const getQuizzes = async (): Promise<Quiz[]> => {
  try {
    const response = await api.get("/api/quizzes")
    return response.data.quizzes
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    throw error
  }
}

// Get quiz by ID
export const getQuizById = async (quizId: string): Promise<QuizData> => {
  try {
    const response = await api.get(`/api/quizzes/${quizId}`)
    return {
      ...response.data,
      id: quizId, // Ensure id is included in the returned data
    }
  } catch (error) {
    console.error(`Error fetching quiz ${quizId}:`, error)
    throw error
  }
}

// Submit answers
export const submitQuiz = async (
    quizId: string,
    answers: AnswerSubmission,
): Promise<{ resultId: string; result: QuizResult }> => {
  try {
    const response = await api.post(`/api/quizzes/submit`, {
      quizId,
      answers,
    })
    return response.data
  } catch (error) {
    console.error("Error submitting quiz:", error)
    throw error
  }
}

// Get quiz result by ID
export const getQuizResult = async (resultId: string): Promise<QuizResult> => {
  try {
    const response = await api.get(`/api/results/${resultId}`)
    return response.data.result
  } catch (error) {
    console.error(`Error fetching result ${resultId}:`, error)
    throw error
  }
}
