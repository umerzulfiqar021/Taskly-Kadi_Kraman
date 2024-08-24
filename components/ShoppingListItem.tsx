import { Text, TouchableOpacity, View, StyleSheet, Alert, Pressable } from "react-native";
import { theme } from "../theme";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete : () => void;
  onToggleComplete : () => void;
};
export function ShoppingListItem({ name, isCompleted, onDelete, onToggleComplete }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
          style: "destructive",
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
    );
  };
  
  return (
    <Pressable
      style={[
        
        styles.itemContainer,
        isCompleted ? styles.completedContainer : undefined,
      ]}
      onPress={onToggleComplete}
    >
      <View style = {styles.row} >
      <AntDesign name= {isCompleted ? "check" : "pluscircleo" } size={24} color={isCompleted ? theme.colorGrey : theme.colorCerulean} />
      <Text
      numberOfLines={1}
        style={[
          styles.itemText,
          isCompleted ? styles.completedText : undefined,
        ]}
      >
        {name}
      </Text>
      </View>
     
      <TouchableOpacity
       
        onPress={handleDelete}
        activeOpacity={0.8}
      >
        <AntDesign name="closecircle" size={24} color= { isCompleted ? theme.colorGrey : theme.colorRed} />
      </TouchableOpacity>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  completedText: {
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
    color: theme.colorGrey,
  },
 
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",

    justifyContent: "center",
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemText: {
     fontSize: 18,
     fontWeight: "200", 
    flex: 1, },
 
  row: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  }
});
