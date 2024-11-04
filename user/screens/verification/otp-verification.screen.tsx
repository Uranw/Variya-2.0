import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AuthContainer from "@/utils/container/auth-container";
import { windowHeight } from "@/themes/app.constant";
import SignInText from "@/components/login/signin.text";
import OTPTextInput from "react-native-otp-textinput";
import { style } from "./style";
import color from "@/themes/app.colors";
import { external } from "@/styles/external.style";
import Button from "@/components/common/button";
import { router, useLocalSearchParams } from "expo-router";
import { commonStyles } from "@/styles/common.style";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Images from "@/utils/images";  // Import images

export default function OtpVerificationScreen() {
    const [otp, setOtp] = useState("");
    const [loader, setLoader] = useState(false);
    const toast = useToast();
    const { phoneNumber } = useLocalSearchParams();

    const handleSubmit = async () => {
        if (otp === "") {
            toast.show("Please fill the fields!", {
                placement: "bottom",
            });
        } else {
            setLoader(true);
            const otpNumbers = `${otp}`;
            try {
                const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URI}/verify-otp`, {
                    phone_number: phoneNumber,
                    otp: otpNumbers,
                });

                setLoader(false);
                console.log(res);
                if (res.data.user.email === null) {
                    router.push({
                        pathname: "/(routes)/registration",
                        params: { user: JSON.stringify(res.data.user) },
                    });
                    toast.show("Account verified!");
                } else {
                    await AsyncStorage.setItem("accessToken", res.data.accessToken);
                    router.push("/(tabs)/home");
                }
            } catch (error) {
                setLoader(false);
                toast.show("Something went wrong! Please re-check your OTP!", {
                    type: "danger",
                    placement: "bottom",
                });
            }
        }
    };

    const handleResendOtp = async () => {
        setLoader(true);
        try {
            await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URI}/resend-otp`, {
                phone_number: phoneNumber,
            });
            toast.show("OTP resent to your phone!", {
                placement: "bottom",
            });
        } catch (error) {
            toast.show("Failed to resend OTP, please try again!", {
                type: "danger",
                placement: "bottom",
            });
        } finally {
            setLoader(false);
        }
    };

    return (
        <AuthContainer
            topSpace={windowHeight(170)}
            imageShow={true}
            backgroundImage={Images.otpBg}  // Use otpBg as the background
            container={
                <View>
                    <SignInText
                        title={"OTP Verification"}
                        subtitle={"Check your phone number for the OTP!"}
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
                            title={loader ? "Verifying..." : "Verify"}
                            onPress={handleSubmit}
                            backgroundColor={"#32A284"}  // Button color change
                            disabled={loader}
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
                            <Text style={[commonStyles.regularText]}>Not received yet?</Text>
                            <TouchableOpacity onPress={handleSubmit}>
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
