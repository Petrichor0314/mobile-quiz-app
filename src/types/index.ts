// Update RootStackParamList to include our screen routes and satisfy ParamListBase constraint
export interface RootStackParamList {
  Home: undefined
  QuizDetail: { quizId: string }
  QuizQuestion: { quizId: string; questions: Question[] }
  QuizResult: { resultId: string }
  [key: string]: object | undefined // Add index signature to satisfy ParamListBase constraint
}

// Quiz type for list view
export interface Quiz {
  id: string
  title: string
  description: string
}

// Question type
export interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: string
}

// Answer submission type
export type AnswerSubmission = Record<string, string>

// Result item type
export interface ResultItem {
  questionId: string
  isCorrect: boolean
  feedback?: string
}

// Quiz result type
export interface QuizResult {
  totalScore: number
  results: ResultItem[]
}

// Full quiz data type (for quiz detail)
export interface QuizData {
  id: string // Make sure this property exists
  title: string
  description: string
  questions: Question[]
}
