import { TouchableOpacity, Text, View, StyleSheet } from "react-native"

type RadioButtonProps = {
  label: string
  value: string
  selected: boolean
  onSelect: (value: string) => void
}

export default function RadioButton({ label, value, selected, onSelect }: RadioButtonProps) {
  return (
      <TouchableOpacity
          style={[styles.container, selected && styles.containerSelected]}
          onPress={() => onSelect(value)}
          activeOpacity={0.7}
      >
        <View style={[styles.radio, selected && styles.radioSelected]}>
          {selected && <View style={styles.radioInner} />}
        </View>
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    backgroundColor: "white",
  },
  containerSelected: {
    borderColor: "#8b5cf6",
    backgroundColor: "#f3e8ff",
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#d1d5db",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#8b5cf6",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8b5cf6",
  },
  label: {
    fontSize: 16,
    color: "#4b5563",
    flex: 1,
  },
  labelSelected: {
    color: "#1f2937",
    fontWeight: "500",
  },
})
