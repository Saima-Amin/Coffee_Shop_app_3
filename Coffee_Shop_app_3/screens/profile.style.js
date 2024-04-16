import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightwhite
    },
    cover:{
        height: 290,
        width: "100%",
        resizeMode: "cover"
    },
    profileContainer: {
        flex: 1,
        alignItems: "center"
    },
    profile: {
        height: 155,
        width: 155,
        borderRadius: 999,
        borderColor: Colors.primary,
        borderWidth: 2,
        resizeMode: "cover",
        marginTop: -90
    },
    name: {
        fontFamily: "bold",
        color: Colors.primary,
        marginVertical: 5,
    },
    loginBtn:{
       backgroundColor: Colors.secondary,
       padding: 2,
       borderWidth: 0.4,
       borderColor: Colors.primary,
       borderRadius: Sizes.xxLarge 
    },
    menuText:{
        fontFamily: "regular",
        color: Colors.gray,
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 14
    },
    manuWrapper:{
        marginTop: Sizes.large,
        width: Sizes.width-Sizes.large,
        backgroundColor: Colors.lightwhite,
        borderRadius: 12,
        marginBottom: Sizes.medium
    },
    manuItem:(borderBottomWidth) => ({
        borderBottomWidth: borderBottomWidth,
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderColor: Colors.gray
    })
})

export default styles;
