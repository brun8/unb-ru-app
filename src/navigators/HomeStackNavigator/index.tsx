import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import BottomTabNavigator from "../BottomTabNavigator";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import api from "../../services/api";
import ActivityIndicatorBox from "../../components/ActivityIndicatorBox";
import { getFormatedDate } from "../../utils/date";
import DayIndexContextProvider from "../../context/DayIndexContext";

type TopTabNavigatorProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator({ route }: TopTabNavigatorProps): React.ReactElement {
    const [weekMenu, setWeekMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dayIndex, setDayIndex] = useState(0);

    useEffect(() => {
        api.get("/menu")
            .then((res) => {
                setWeekMenu(res.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }, []);

    return !loading ? (
        <DayIndexContextProvider value={{ dayIndex, setDayIndex }}>
            <Stack.Navigator
                screenOptions={{
                    header: (props) => <Header {...props} />,
                }}
            >
                <Stack.Screen name={getFormatedDate(weekMenu[dayIndex].date)}>
                    {(props) => <BottomTabNavigator {...props} dayMenu={weekMenu[dayIndex]} />}
                </Stack.Screen>
            </Stack.Navigator>
        </DayIndexContextProvider>
    ) : (
        <ActivityIndicatorBox />
    );
}
