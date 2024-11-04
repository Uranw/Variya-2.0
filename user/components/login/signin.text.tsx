import { View, Text } from "react-native";
import React from "react";
import { commonStyles } from "@/styles/common.style";
import { external } from "@/styles/external.style";

export default function SignInText({
  title,
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      <Text
        style={[
          commonStyles.regularTextBigBlack,
          { color: "#000" },
          { textAlign: "left" },
          { marginTop: 20 },
        ]}
      >
        {title ? title : "Enter your Phone Number ☎️"}
      </Text>
      <Text
        style={[commonStyles.regularText, external.pt_4, { textAlign: "left" }]}
      >
        {subtitle
          ? subtitle
          : "We will send you OTP Verification Code"}
      </Text>
    </>
  );
}
