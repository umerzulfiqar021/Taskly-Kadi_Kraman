import { Link, Stack } from "expo-router";
import {  Pressable } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
export default function Layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Counter",
                headerRight: () => {
                    return (
                        <Link href={"/counter/history"} asChild>
                             <Pressable hitSlop={20}>
                            <MaterialIcons
                             name="history" size={24} color="black"
                             />
                             </Pressable>
                            </Link>
                    );
                }
            }} />
        </Stack>
    )
}