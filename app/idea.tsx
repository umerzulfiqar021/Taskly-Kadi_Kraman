
import { Text, View, StyleSheet,  } from "react-native";
import { theme } from "../theme";
import { StatusBar } from "react-native";
import { setStatusBarHidden } from "expo-status-bar";

export default function IdeaScreen() {
  return (
    <View style={styles.container}  >
      <View style = {styles.new}>
      <Text style={styles.text}>Abdullah Manzoor</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    
  },
  new: {
    backgroundColor: "lightgreen",
    borderWidth: 2,
    padding: 10,
    // borderBlockColor: "blue",
    borderColor: "lightgreen",
    borderRadius: 10,
    
    
  }
});

