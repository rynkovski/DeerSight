import { View, Text, TouchableOpacity} from 'react-native';
import { Link } from 'expo-router';
import { styles } from './styles';
import Logo from '@/components/Logo';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Logo/>
        <Text style={styles.subtitle}>
          Take control of your finances with our easy-to-use tracking app
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/register" asChild>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}