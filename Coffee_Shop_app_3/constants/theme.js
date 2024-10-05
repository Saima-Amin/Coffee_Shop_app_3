import { Dimensions } from "react-native";
const {height, width } = Dimensions.get('window');


const Colors = {
    primary: "#7F5539",
    secondary: "#DDF0FF",
    tertiary: "#FF7754",
    gray: "#838294",
    gray2: "#C1C0C8",
    offwhite: "#F3F4F8",
    white: "#FFFFFF",
    black: "#000000",
    red: "#e81e4d",
    green: "#00C135",
    lightwhite: "#FAFAFC",
};

const Sizes = {
    xSmall: 10,
    small: 12,
    medium: 16,
    large: 20,
    XLarge: 24,
    xxLarge: 44,
    height,
    width
};

const Shadows = {
    small: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
    },
};

export {Colors, Sizes, Shadows,};