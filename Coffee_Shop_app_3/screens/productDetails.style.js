import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightwhite
    },
    upperRow:{
        marginHorizontal: 20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        position:"absolute",
        top: Sizes.xxLarge,
        width: Sizes.width -44,
        zIndex: 999
    },
    image:{
        aspectRatio: 1,
        resizeMode:"cover"
    },
    details:{
        marginTop: -Sizes.large,
        backgroundColor: Colors.lightwhite,
        width: Sizes.width,
        borderTopLeftRadius: Sizes.medium,
        borderTopRightRadius: Sizes.medium
    },

    cartRow:{
        paddingBottom: Sizes.small ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Sizes.width,
    },
    cartBtn:{
        width: Sizes.width*0.7,
        backgroundColor: Colors.black,
        padding: Sizes.small/2,
        borderRadius: Sizes.large,
        marginLeft: 12
    },

    titleRow:{
        marginHorizontal: 20,
        paddingBottom: Sizes.small -2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Sizes.width -44,
        top: 20
    },
    ratingRow:{
        paddingBottom: Sizes.xSmall-5 ,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: Sizes.width -10,
        top: 5
    },
    rating:{
        top: Sizes.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginHorizontal: Sizes.large
    },
    ratingText:{
        fontFamily: "regular"
    },
    descriptionWrapper:{
        marginTop: Sizes.large*2,
        marginHorizontal: Sizes.large
    },
    description:{
        fontFamily:"medium",
        fontSize: Sizes.large-2
    },
    desText:{
        fontFamily: "regular",
        fontSize: Sizes.small,
        textAlign: "justify",
        marginBottom: Sizes.small
    },
    location: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: Colors.secondary,
        padding: 5,
        borderRadius: Sizes.large
    },

    cartTitle:{
        marginLeft: Sizes.small,
        fontFamily:"medium",
        fontSize: Sizes.medium,
        color: Colors.lightwhite,
        textAlign: "center"
    },

    title:{
        fontFamily:"bold",
        fontSize: Sizes.medium
    },
    price:{
        padding: 10,
        fontFamily:"bold",
        fontSize: Sizes.medium
    },
    priceWrapper:{
        backgroundColor: Colors.secondary,
        borderRadius: Sizes.large
    },
    addcart:{
        width: 40,
        height: 40,
        borderRadius: 50,
        margin: Sizes.small,
        backgroundColor: Colors.black,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default styles;