import React from "react";
import styles from "./styles";
import { Text } from "react-native";
import Button from "../../components/Button";
import Illustration from "../../components/Svg/Illustration";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type OnBoardingProps = {
    navigation: NativeStackNavigationProp<RootStackParamList, "OnBoarding">;
};

export default function OnBoarding({ navigation }: OnBoardingProps): React.ReactElement {
    return (
        <SafeAreaView style={styles.container}>
            <Illustration />
            <Text style={styles.title}>
                Saiba tudo sobre as{"\n"}
                refeições na UnB
            </Text>
            <Text style={styles.subTitle}>
                O cardápio do restaurante{"\n"}
                Universitário da Universidade de{"\n"}
                Brasília na palma de sua mão!
            </Text>
            <Button text="Ver Cardápio" onPress={() => navigation.navigate("Home")} />
        </SafeAreaView>
    );
}