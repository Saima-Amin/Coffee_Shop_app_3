import { StyleSheet } from "react-native";
import { Colors, Sizes } from "../../constants";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    paddingTop: Sizes.xxLarge,
  },
  separator: {
    height: 14,
  },
  seeMoreButton: {
    paddingVertical: Sizes.small,
    paddingHorizontal: Sizes.large,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.small,
    marginTop: Sizes.medium,
  },
  seeMoreText: {
    color: Colors.white,
    fontSize: Sizes.medium,
  },
});

export default styles;
