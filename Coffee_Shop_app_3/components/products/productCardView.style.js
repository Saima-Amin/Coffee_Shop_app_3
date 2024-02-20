import { StyleSheet } from "react-native";
import { Colors,Sizes } from "../../constants";


const styles = StyleSheet.create({
    container: {
        width: 182,
        height: 200,
        marginEnd: 18,
        borderRadius: Sizes.medium,
        backgroundColor: Colors.secondary
    },
    imageContainer: {
        flex: 1,
        width: 170,
        marginLeft: Sizes.small/2,
        marginTop: Sizes.small/2,
        borderRadius: Sizes.small,
        overflow: "hidden"
    },
    image:{
        aspectRatio: 1,
        resizeMode: 'cover'
    },
    details: {
        padding: Sizes.small,
    }
})

export default styles;