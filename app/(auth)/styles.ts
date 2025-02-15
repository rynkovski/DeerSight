import { StyleSheet } from "react-native";

export  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerContainer: {
    marginTop: 'auto',
    marginBottom: 40,
    alignItems: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 'auto',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',  
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#000',
  },
  secondaryButtonText: {
    marginTop: 10,
    color: '#000',
    textAlign: 'center',

  },
  linkButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#000',
    fontSize: 14,
  },
  
  errorText: {
    color: '#ff3b30',
    marginBottom: 10,
  },
});