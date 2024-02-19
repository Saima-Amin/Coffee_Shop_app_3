import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../constants";


const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Sizes.small,
        backgroundColora: Colors.secondary,
        borderRadius: Sizes.medium,
        marginVertical: Sizes.medium,
        height: 50
    },
    searchIcon: {
        marginHorizontal: 10,
        color: Colors.gray,
        marginTop: Sizes.small
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: Colors.secondary,
        marginRight: Sizes.small,
        borderRadius: Sizes.small
    },
    searchInput: {
        fontFamily: "regular",
        width: "100%",
        height: "100%",
        paddingHorizontal: Sizes.small
    },
    searchBtn: {
        width: 50,
        height: "100%",
        borderRadius: Sizes.medium,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
    }
});

export default styles;

