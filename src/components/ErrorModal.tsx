import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native"

type ErrorModalProps = {
  visible: boolean
  message: string
  onRetry: () => void
  onClose: () => void
}

export default function ErrorModal({ visible, message, onRetry, onClose }: ErrorModalProps) {
  return (
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>⚠️</Text>
            </View>
            <Text style={styles.title}>Error</Text>
            <Text style={styles.message}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.retryButton]} onPress={onRetry}>
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "85%",
    maxWidth: 350,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#ef4444",
  },
  message: {
    marginBottom: 24,
    textAlign: "center",
    color: "#4b5563",
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    flex: 1,
    marginHorizontal: 4,
  },
  retryButton: {
    backgroundColor: "#8b5cf6",
  },
  closeButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButtonText: {
    color: "#4b5563",
    fontWeight: "bold",
    textAlign: "center",
  },
})
