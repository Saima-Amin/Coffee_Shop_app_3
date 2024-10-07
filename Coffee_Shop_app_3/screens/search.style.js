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
    showCountryInfoBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 10, // Adjusted padding for top and bottom
        paddingHorizontal: 20, // Reduced padding for left and right sides to make button smaller
        borderRadius: 5,
        alignItems: 'center', // Center the text inside the button
        marginLeft:50,
        marginRight:50,
      },
      showCountryInfoText: {
        color: Colors.offwhite,
        fontSize: 16, // Slightly smaller text for better fitting
        textAlign: 'center', // Ensure the text is centered
        fontWeight: 'bold',  // Optional: make the text bold for better readability
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

