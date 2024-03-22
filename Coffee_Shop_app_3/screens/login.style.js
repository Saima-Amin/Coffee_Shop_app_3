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
        textAlign: "center",
        marginBottom: Sizes.XLarge
    },
    wrapper:{
        marginBottom: 10,
    },
    label:{
        fontFamily: "regular",
        fontSize: Sizes.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign:"right"
    },
    inputWrapper:(borderColor) => ({
        borderColor: borderColor,
        backgroundColor: Colors.lightwhite,
        borderWidth: 1,
        height: 50,
        borderRadius: 12,
        flexDirection: "row",
        paddingHorizontal: 15,
        alignItems: "center"
    }),
    iconStyle:{
        marginRight: 10
    },
    errorMessage:{
        color: Colors.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft:5,
        fontSize: Sizes.xSmall
    },
    registration:{
        marginTop: 20,
        textAlign: "center"
    }
});

export default styles;