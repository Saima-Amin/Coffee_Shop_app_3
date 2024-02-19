import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../constants";;

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: "bold",
        fontSize: 40
    },
    appBarWrapper: {
        marginHorizontal: 22,
        marginTop: Sizes.small
    },
    appBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    location: {
        fontFamily: "semibold",
        fontSize: Sizes.medium,
        color: Colors.gray
    },
    cartCount:{
        position:"absolute",
        bottom:16,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: 'green',
        justifyContent:'center',
        zIndex: 999
    },
    cartNumber:{
        fontFamily:'regular',
        fontWeight: '600',
        fontSize: 10,
        color: Colors.lightwhite
    }
})

export default styles;