import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import SignInText from "@/components/login/signin.text";
import { commonStyles } from "@/styles/common.style";
import { external } from "@/styles/external.style";
import Button from "@/components/common/button";
import { style } from "../verifications/style";
import color from "@/themes/app.colors";
import { Toast } from "react-native-toast-notifications";
import OTPTextInput from "react-native-otp-textinput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EmailVerificationScreen() {
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false); // Loader state
  const driver = useLocalSearchParams() as any;

  const handleSubmit = async () => {
    setLoader(true); // Start loading
    const otpNumbers = `${otp}`;
    await axios
        .post(`${process.env.EXPO_PUBLIC_SERVER_URI}/driver/registration-driver`, {
          token: driver.token,
          otp: otpNumbers,
        })
        .then(async (res: any) => {
          setLoader(false); // Stop loading
          await AsyncStorage.setItem("accessToken", res.data.accessToken);
          router.push("/(tabs)/home");
        })
        .catch((error) => {
          setLoader(false); // Stop loading
          Toast.show(error.message, {
            placement: "bottom",
            type: "danger",
          });
        });
  };

  return (
      <AuthContainer
          topSpace={windowHeight(240)}
          imageShow={true}
          container={
            <View>
              <SignInText
                  title={"Email Verification"}
                  subtitle={"Check your email address for the OTP!"}
              />
              <OTPTextInput
                  handleTextChange={(code) => setOtp(code)}
                  inputCount={4}
                  textInputStyle={style.otpTextInput}
                  tintColor={color.subtitle}
                  autoFocus={false}
              />
              <View style={[external.mt_30]}>
                <Button
                    title={loader ? "Verifying..." : "Verify"} // Update button text
                    height={windowHeight(35)}
                    onPress={handleSubmit} // No need to wrap in an arrow function
                    disabled={loader} // Disable button if loading
                />
              </View>
              <View style={[external.mb_15]}>
                <View
                    style={[
                      external.pt_10,
                      external.Pb_10,
                      { flexDirection: "row", gap: 5, justifyContent: "center" },
                    ]}
                >
                  <Text style={[commonStyles.regularText]}>Not Received yet?</Text>
                  <TouchableOpacity>
                    <Text style={[style.signUpText, { color: "#000" }]}>
                      Resend it
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
      />
  );
}
