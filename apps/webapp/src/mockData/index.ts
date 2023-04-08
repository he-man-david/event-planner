import pic1 from 'static/airbnb-1.jpeg';
import pic2 from 'static/airbnb-2.jpeg';
import pic3 from 'static/airbnb-3.jpeg';
import pic4 from 'static/airbnb-4.jpeg';
import pic5 from 'static/airbnb-5.jpeg';
import { EventOption } from 'types';

export const EventOptionData: EventOption[] = [
  {
    id: 1,
    title: 'Downtown',
    linkPreview: {
      imageUrl: pic1,
      title: 'This is link title',
      desc: 'This is description from the link preview itself. Link preview description.',
      link: 'https://airbnb.com',
    },
    desc: 'Close to trains',
    votes: 0,
    voted: false,
  },
  {
    id: 2,
    title: 'Downtown 2',
    linkPreview: {
      imageUrl: pic2,
      title: 'This is link title',
      desc: 'This is description from the link preview itself. Link preview description.',
      link: 'https://airbnb.com',
    },
    desc: 'A bit smaller only 2bd',
    votes: 2,
    voted: false,
  },
  {
    id: 3,
    title: 'Midtown',
    linkPreview: {
      imageUrl: pic3,
      title: 'This is link title',
      desc: 'This is description from the link preview itself. Link preview description.',
      link: 'https://airbnb.com',
    },
    desc: 'Good location',
    votes: 1,
    voted: false,
  },
  {
    id: 4,
    title: 'Midtown Central',
    linkPreview: {
      imageUrl: pic4,
      title: 'This is link title',
      desc: 'This is description from the link preview itself. Link preview description.',
      link: 'https://airbnb.com',
    },
    desc: 'A bit smaller but cheaper',
    votes: 6,
    voted: false,
  },
  {
    id: 5,
    title: 'Uptown',
    linkPreview: {
      imageUrl: pic5,
      title: 'This is link title',
      desc: 'This is description from the link preview itself. Link preview description.',
      link: 'https://airbnb.com',
    },
    desc: 'Bit more expensive, I am down if yall are',
    votes: 3,
    voted: false,
  },
];

export const MyEventsUpcomingData = [
  {
    id: '324325',
    title: 'Lisbon, Portugal Airbnb',
    desc: 'Deciding where to stay in Lisbon, something that is <$100 per night, 5-10 mins from downtown, and very walkable vibrant area. Near beach is nice.',
    startTime: '8/1/2023, 9:00AM',
    endTime: '8/5/2023, 2:00PM',
    memberCount: 2,
    isInProgress: true,
  },
  {
    id: '125453244123',
    title: 'Some nice restaurant in Portugal',
    desc: 'Something something something Something something something Something something something.. ...Something something something',
    startTime: '8/1/2023, 6:00PM',
    endTime: '8/1/2023, 8:00PM',
    memberCount: 5,
    isInProgress: false,
  },
  {
    id: '1235436344',
    title: 'Madrid Spain, Airbnb',
    desc: 'Deciding where to stay in Madrid, something <$100 per night, 5-10 mins from downtown, and very walkable vibrant area. Near beach is nice.',
    startTime: '8/6/2023, 9:00AM',
    endTime: '8/8/2023, 2:00PM',
    memberCount: 2,
    isInProgress: true,
  },
];

export const MyEventsPastData = [
  {
    id: '1235687986',
    title: 'Something in the past',
    desc: 'Something something something Something something something Something something something.. ...Something something something',
    startTime: '3/1/2023, 9:00AM',
    endTime: '3/5/2023, 2:00PM',
    memberCount: 3,
    isInProgress: false,
  },
  {
    id: '4445762',
    title: 'Some old event',
    desc: 'Something something something Something something something Something something something.. ...Something something something',
    startTime: '3/10/2023, 9:00AM',
    endTime: '3/20/2023, 2:00PM',
    memberCount: 4,
    isInProgress: false,
  },
];
