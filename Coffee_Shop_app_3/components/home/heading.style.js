import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../../constants";

const styles = StyleSheet.create({
    container:{
        marginTop: Sizes.medium,
        // marginBottom: -Sizes.xSmall,
        marginHorizontal: 14
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    headerTitle: {
        fontFamily:"semibold",
        fontSize: Sizes.XLarge -3,
    }
})

export default styles;