

import { useState } from "react"
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from "react-native"
import { Picker } from "@react-native-picker/picker"
import type { Wallet } from "./WalletItem"

type AddWalletModalProps = {
  visible: boolean
  onClose: () => void
  onAdd: (wallet: Omit<Wallet, "id">) => void
}

const AddWalletModal = ({ visible, onClose, onAdd }: AddWalletModalProps) => {
  const [name, setName] = useState("")
  const [balance, setBalance] = useState("")
  const [type, setType] = useState<Wallet["type"]>("cash")

  const handleAdd = () => {
    if (name && balance) {
      onAdd({
        name,
        balance: Number.parseFloat(balance),
        type,
      })
      setName("")
      setBalance("")
      setType("cash")
      onClose()
    }
  }

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Wallet</Text>
          <TextInput style={styles.input} placeholder="Wallet Name" value={name} onChangeText={setName} />
          <TextInput
            style={styles.input}
            placeholder="Initial Balance"
            value={balance}
            onChangeText={setBalance}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue as Wallet["type"])}
            style={styles.picker}
          >
            <Picker.Item label="Cash" value="cash" />
            <Picker.Item label="Bank" value="bank" />
            <Picker.Item label="Credit" value="credit" />
            <Picker.Item label="Savings" value="savings" />
          </Picker>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAdd}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "45%",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  addButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
})

export default AddWalletModal

