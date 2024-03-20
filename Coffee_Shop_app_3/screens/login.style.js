import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../constants";

const styles = StyleSheet.create({
    cover:{
       height: Sizes.height/2.4,
       width: '100%',
       resizeMode:"cover",
       marginBottom: Sizes.xxLarge-15
    },
    title:{
        fontFamily: "bold",
        fontSize: Sizes.large,
        color: Colors.primary,
        marginBottom: Sizes.medium
    }
});

export default styles;