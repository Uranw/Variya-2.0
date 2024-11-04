import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@react-navigation/native";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import TitleView from "@/components/signup/title.view";
import Input from "@/components/common/input";
import Button from "@/components/common/button";
import color from "@/themes/app.colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function RegistrationScreen() {
  const { colors } = useTheme();
  const { user } = useLocalSearchParams() as any;
  const parsedUser = JSON.parse(user);
  const [emailFormatWarning, setEmailFormatWarning] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(false); // Loader state

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      setShowWarning(true);
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailFormatWarning("Please enter a valid email!");
      return;
    }

    setLoading(true); // Start loading
    try {
      const res = await axios.post(
          `${process.env.EXPO_PUBLIC_SERVER_URI}/email-otp-request`,
          {
            email: formData.email,
            name: formData.name,
            userId: parsedUser.id,
          }
      );

      if (!res.data || !res.data.token) {
        throw new Error('Token not found in response');
      }

      const userData: any = {
        id: parsedUser.id,
        name: formData.name,
        email: formData.email,
        phone_number: parsedUser.phone_number,
        token: res.data.token,
      };

      router.push({
        pathname: "/(routes)/email-verification",
        params: { user: JSON.stringify(userData) },
      });
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
      <ScrollView>
        <View>
          <Text
              style={{
                fontFamily: "TT-Octosquares-Medium",
                fontSize: windowHeight(20),
                paddingTop: windowHeight(40),
                textAlign: "center",
              }}
          >
            Variya
          </Text>
          <View style={{ padding: windowWidth(35), paddingTop: windowHeight(30) }}>
            <View style={[styles.subView, { backgroundColor: colors.background }]}>
              <View style={styles.space}>
                <TitleView
                    title={"Create Variya Account"}
                    subTitle="Explore By joining Variya!"
                />
                <Input
                    title="Name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChangeText={(text) => handleChange("name", text)}
                    showWarning={showWarning && formData.name === ""}
                    warning={"Please enter your name!"}
                />
                <Input
                    title="Phone Number"
                    placeholder="Enter your phone number"
                    value={parsedUser.phone_number}
                    disabled={true}
                />
                <Input
                    title="Email Address"
                    placeholder="Enter your email address"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => {
                      handleChange("email", text);
                      setEmailFormatWarning("");
                    }}
                    showWarning={showWarning || emailFormatWarning !== ""}
                    warning={emailFormatWarning || "Please enter your email!"}
                />
                <View style={styles.margin}>
                  <Button
                      onPress={handleSubmit}
                      title={loading ? "Loading..." : "Next"} // Change button text based on loading state
                      disabled={loading} // Disable button if loading
                      backgroundColor={color.buttonBg}
                      textColor={color.whiteColor}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  subView: {
    height: "100%",
  },
  space: {
    marginHorizontal: windowWidth(0),
  },
  margin: {
    marginVertical: windowHeight(12),
  },
});
