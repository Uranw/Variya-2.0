import { Driving, SmallCard, SmartCar, Wallet } from "@/utils/icons";
import Images from "../utils/images";
import color from "@/themes/app.colors";
import React from "react";

export const slides = [
  {
    id: 0,
    image: Images.destination,
    text: "Choose Your Destination",
    description: "First choose your destination where you want to Deliver!",
  },
  {
    id: 1,
    image: Images.trip,
    text: "Wait for your Variya",
    description: "Just wait for a while now until your Variya is picking Your packages!",
  },
  {
    id: 2,
    image: Images.bookRide,
    text: "Enjoy Your Delivery",
    description:
      "Pay your Variya after reaching the destination!",
  },
];

export const rideData = [
  { id: "1", totalEarning: "Bdt 1200", title: "Total Earning" },
  { id: "2", totalEarning: "12", title: "Complete Delivery" },
  { id: "3", totalEarning: "1", title: "Pending Delivery" },
  { id: "4", totalEarning: "04", title: "Cancel Delivery" },
];

export const rideIcons = [
  <Wallet colors={color.primary} />,
  <SmartCar />,
  <SmallCard color={color.primary} />,
  <Driving color={color.primary} />,
];

export const recentRidesData: recentRidesTypes[] = [
  {
    id: "1",
    user: "Marshal Uranw",
    rating: "5",
    earning: "142",
    pickup: "Airport Mode, Kanchanbari, Biratnagar",
    dropoff: "Mahendra Chowak, Taffic Chowak, Biratnagar",
    time: "14 July 01:34 pm",
    distance: "2km",
  },
];
