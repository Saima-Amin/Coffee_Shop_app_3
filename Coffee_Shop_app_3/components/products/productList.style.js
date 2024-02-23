import { StyleSheet } from "react-native"
import { Colors, Sizes } from "../../constants";



const styles = StyleSheet.create({
    loadingContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        alignContent:"center"
    },
    container:{
        // width: 182,
        alignItems: "center",
        paddingTop: Sizes.xxLarge
        // paddingLeft: Sizes.small/2
    },
    separator:{
        height: 14
    }
})


export default styles;