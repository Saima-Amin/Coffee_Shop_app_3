import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../constants";



const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: Colors.lightwhite
    },
    wrapper:{
        flex: 1,
        backgroundColor: Colors.lightwhite
    },
    upperRow:{
        width: Sizes.width-50 ,
        marginHorizontal: Sizes.large,
        flexDirection:"row",
        justifyContent: "flex-start",
        alignItems: "center",
        position: "absolute",
        backgroundColor: Colors.primary,
        borderRadius: Sizes.large,
        top: Sizes.large,
        zIndex: 999
    },
    heading:{
        fontFamily: "semibold",
        fontSize: Sizes.medium,
        color: Colors.lightwhite,
        marginLeft: 5
    }
})

export default styles;