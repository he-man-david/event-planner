import pic1 from "static/airbnb-1.jpeg";
import pic2 from "static/airbnb-2.jpeg";
import pic3 from "static/airbnb-3.jpeg";
import pic4 from "static/airbnb-4.jpeg";
import pic5 from "static/airbnb-5.jpeg";
import { EventOption } from "components/eventBody/types";

export const EventOptionData: EventOption[] = [
  {
    id: 1,
    title: "Downtown",
    linkPreview: {
      imageUrl: pic1,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "Close to trains",
    votes: 0,
    voted: false,
  },
  {
    id: 2,
    title: "Downtown 2",
    linkPreview: {
      imageUrl: pic2,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "A bit smaller only 2bd",
    votes: 2,
    voted: false,
  },
  {
    id: 3,
    title: "Midtown",
    linkPreview: {
      imageUrl: pic3,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "Good location",
    votes: 1,
    voted: false,
  },
  {
    id: 4,
    title: "Midtown Central",
    linkPreview: {
      imageUrl: pic4,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "A bit smaller but cheaper",
    votes: 6,
    voted: false,
  },
  {
    id: 5,
    title: "Uptown",
    linkPreview: {
      imageUrl: pic5,
      title: "This is link title",
      desc: "This is description from the link preview itself. Link preview description.",
      link: "https://airbnb.com",
    },
    desc: "Bit more expensive, I am down if yall are",
    votes: 3,
    voted: false,
  },
];
