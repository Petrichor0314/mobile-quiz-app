import { createStackNavigator } from "@react-navigation/stack"
import type { RootStackParamList } from "../types"

// Screens
import QuizListScreen from "../screens/QuizListScreen"
import QuizDetailScreen from "../screens/QuizDetailScreen"
import QuizQuestionScreen from "../screens/QuizQuestionScreen"
import QuizResultScreen from "../screens/QuizResultScreen"

const Stack = createStackNavigator<RootStackParamList>()

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: "#8b5cf6",
        cardStyle: {
          backgroundColor: "#f8fafc",
        },
      }}
    >
      <Stack.Screen
        name="QuizList"
        component={QuizListScreen}
        options={{
          title: "Quiz Challenge",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="QuizDetail"
        component={QuizDetailScreen}
        options={({ route }) => ({
          title: route.params?.quizId || "Quiz Details",
          headerTitleAlign: "center",
        })}
      />
      <Stack.Screen
        name="QuizQuestion"
        component={QuizQuestionScreen}
        options={{
          title: "Quiz Question",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="QuizResult"
        component={QuizResultScreen}
        options={{
          title: "Quiz Results",
          headerTitleAlign: "center",
          headerLeft: () => null, // Disable back button
        }}
      />
    </Stack.Navigator>
  )
}

export default AppNavigator
