import {
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { ReactNode } from "react";
import { external } from "@/styles/external.style";
import Images from "../images";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import styles from "./style";

type Props = {
  container: ReactNode;
  topSpace: any;
  imageShow: boolean;
  backgroundImage?: any;  // New optional prop for custom background image
};

const AuthContainer = ({ container, topSpace, imageShow, backgroundImage }: Props) => {
  return (
    <KeyboardAvoidingView
      style={[external.fx_1]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {imageShow && (
        <Text
          style={{
            fontFamily: "TT-Octosquares-Medium",
            fontSize: windowWidth(30),
            textAlign: "center",
            paddingTop: windowHeight(50),
          }}
        >
          Variya
        </Text>
      )}
      <Image
        style={[styles.backgroundImage, { marginTop: topSpace, position: "absolute", width: "100%", height: "26%" }]} // Adjust image style
        source={backgroundImage || Images.authBg}  // Use the custom image or fallback to authBg
      />

      <View style={styles.contentContainer}>
        <View style={[styles.container]}>
          <ScrollView>{container}</ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthContainer;
