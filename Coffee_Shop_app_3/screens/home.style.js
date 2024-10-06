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
    videoContainer:{
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        marginTop:20 
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
    },
     // Floating ball style
     floatingBall: {
        position: 'absolute',
        bottom: -50,
        right: 30,
        width: 60,
        height: 60,
        // borderColor: Colors.black ,
        borderRadius: 30,
        backgroundColor: '#7F5539',  // Ball color
        opacity: 0.7,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10,  // Semi-transparent
    },
})

export default styles;