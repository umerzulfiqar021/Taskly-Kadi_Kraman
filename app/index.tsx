import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Pressable,
  Alert,
  TextInput,
  ScrollView,
  FlatList,
  LayoutAnimation,
} from "react-native";
import { theme } from "../theme";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getFromStorage, saveToStorage } from '../utils/storage';
import * as Haptics from "expo-haptics";
const storageKey = "shoping-list";
type ShoppingListItemType = {
  id: string;
  name: string;
  completedAtTimestamp?: number;
  lastUpdatedTimestamp: number;
};

// const initialList : ShoppingListItemType [] = [
//   {id:"1", name : "Coffee"},
//   {id:"2", name : "Tea"},
//   {id:"3", name : "Milk"},
// ];

export default function App() {
 useEffect (()=>{
  const fetchInitial = async ()=> {
    const data = await getFromStorage(storageKey);
    if (data){
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setShoppingList (data);
    }; 
   }
   fetchInitial();
 },[]);
  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item)=> {
      if (item.id === id){
        if (item.completedAtTimestamp){
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }else{
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
        return{
          ...item,
          completedAtTimestamp: item.completedAtTimestamp ? undefined : Date.now(),
          lastUpdatedTimestamp: Date.now(),
        };
       
      }
      return item; 
    } );
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppingList); 
    saveToStorage(storageKey,newShoppingList);
  };
  const handleDelete = (id: string) => {
    const newShoppinglist = shoppingList.filter((item) => item.id !== id)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShoppingList(newShoppinglist);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    saveToStorage(storageKey,shoppingList);
  }
  const [value, setValue] = useState("");
  const [shoppingList, setShoppingList] = useState<ShoppingListItemType[]>([]);
  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toTimeString(), name: value,
          lastUpdatedTimestamp: Date.now(),
         },
        ...shoppingList
      ];
      setShoppingList(newShoppingList);
      saveToStorage (storageKey,shoppingList);
      setValue("");
    }
  }
  return (
    <FlatList
      style={styles.container}
      ListEmptyComponent={
        <View style={styles.listEmptyContainer}>
          <Text>Yours List is Empty</Text>
        </View>
      }
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={
        <TextInput
          placeholder="e.g coffee"
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}

          style={styles.textInput}
        />

      }
      stickyHeaderIndices={[0]}
      data={orderShoppingList(shoppingList)}
      renderItem={({ item }) => {
        return <ShoppingListItem name={item.name} onDelete={() => handleDelete(item.id)} onToggleComplete={() => { handleToggleComplete (item.id) }} 
        isCompleted = {Boolean(item.completedAtTimestamp)} />
      }
      }


    />


  );
}
function orderShoppingList(shoppingList: ShoppingListItemType[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 12,

    // justifyContent: "center",
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,

  },
  listEmptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 18,
  },
});
