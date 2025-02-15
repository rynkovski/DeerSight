import { Image, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

export default function Logo() {
    return (
        <View style={styles.logoContainer}>
 <Image 
            source={require("../assets/images/logo.png")} 
            style={styles.logo}
            resizeMode="contain"
        />
                <Text style={styles.title}>DeerSight</Text>
        
                </View>
       
    );
}

const styles = StyleSheet.create({
    logo: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },
    logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',

  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
  },
});