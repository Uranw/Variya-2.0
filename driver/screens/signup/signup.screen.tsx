import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { windowHeight, windowWidth } from "@/themes/app.constant";
import ProgressBar from "@/components/common/progress.bar";
import styles from "./styles";
import { useTheme } from "@react-navigation/native";
import TitleView from "@/components/signup/title.view";
import Input from "@/components/common/input";
import SelectInput from "@/components/common/select-input";
import { countryNameItems } from "@/configs/country-name-list";
import Button from "@/components/common/button";
import color from "@/themes/app.colors";
import { router } from "expo-router";

export default function SignupScreen() {
  const { colors } = useTheme();
  const [emailFormatWarning, setEmailFormatWarning] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [loader, setLoader] = useState(false); // Loader state
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    country: "Nepal 🇳🇵",
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const gotoDocument = async () => {
    const isEmailEmpty = formData.email.trim() === "";
    const isEmailInvalid = !isEmailEmpty && emailFormatWarning !== "";

    if (isEmailEmpty) {
      setShowWarning(true);
    } else if (isEmailInvalid) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      setLoader(true); // Start loading

      const phoneNumberData = countryNameItems.find(
          (i: any) => i.label === formData.country
      );

      const phone_number = `+${phoneNumberData?.value}${formData.phoneNumber}`;

      const driverData = {
        name: formData.name,
        country: formData.country,
        phone_number: phone_number,
        email: formData.email,
      };

      // Simulate a verification process (replace this with your actual logic)
      setTimeout(() => {
        setLoader(false); // Stop loading after verification is done
        router.push({
          pathname: "/(routes)/document-verification",
          params: driverData,
        });
      }, 2000); // Simulated delay for 2 seconds
    }
  };

  return (
      <ScrollView>
        <View>
          {/* logo */}
          <Text
              style={{
                fontFamily: "TT-Octosquares-Medium",
                fontSize: windowHeight(22),
                paddingTop: windowHeight(50),
                textAlign: "center",
              }}
          >
            Variya
          </Text>
          <View style={{ padding: windowWidth(20) }}>
            <ProgressBar fill={1} />
            <View
                style={[styles.subView, { backgroundColor: colors.background }]}
            >
              <View style={styles.space}>
                <TitleView
                    title={"Create Your Variya Driver Account"}
                    subTitle={"Explore your life by joining Variya!"}
                />
                <Input
                    title="Name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChangeText={(text) => handleChange("name", text)}
                    showWarning={showWarning && formData.name === ""}
                    warning={"Please enter your name!"}
                />
                <SelectInput
                    title="Country"
                    placeholder="Select your country"
                    value={formData.country}
                    onValueChange={(text) => handleChange("country", text)}
                    showWarning={showWarning && formData.country === ""}
                    items={countryNameItems}
                />
                <Input
                    title="Phone Number"
                    placeholder="Enter your phone number"
                    keyboardType="phone-pad"
                    value={formData.phoneNumber}
                    onChangeText={(text) => handleChange("phoneNumber", text)}
                    showWarning={showWarning && formData.phoneNumber === ""}
                    warning={"Please enter your phone number!"}
                />
                <Input
                    title={"Email Address"}
                    placeholder={"Enter your email address"}
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text)}
                    showWarning={
                        showWarning &&
                        (formData.email === "" || emailFormatWarning !== "")
                    }
                    warning={
                      emailFormatWarning !== ""
                          ? "Please enter your email!"
                          : "Please enter a valid email!"
                    }
                    emailFormatWarning={emailFormatWarning}
                />
              </View>
              <View style={styles.margin}>
                <Button
                    title={loader ? "Checking..." : "Next"}
                    height={windowHeight(35)}
                    onPress={gotoDocument}
                    backgroundColor={color.buttonBg}
                    textColor={color.whiteColor}
                    disabled={loader}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
  );
}
