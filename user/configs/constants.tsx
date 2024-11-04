import Images from "../utils/images";

export const slides = [
  {
    id: 0,
    image: Images.destination,
    text: "Your Delivery, Delivered",
    description: "Need something delivered? Variya's got you covered. Fast and reliable",
  },
  {
    id: 1,
    image: Images.trip,
    text: "Deliveries Made Simple",
    description: "Say goodbye to delivery hassle. Variya, Your one-stop solution",
  },
  {
    id: 2,
    image: Images.bookRide,
    text: "Seamless Payments, Anywhere",
    description:
      "Keep track of your Packages with Variya, send money securely",
  },
];

export const ws = new WebSocket("ws://192.168.16.104:8000");