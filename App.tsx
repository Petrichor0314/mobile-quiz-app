import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import AppNavigator from "./src/navigation/AppNavigator"
import { LogBox } from "react-native"

// Ignore specific warnings
LogBox.ignoreLogs(["ViewPropTypes will be removed", "ColorPropType will be removed"])

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <AppNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    )
}
