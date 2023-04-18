import nodemailer from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';
import AWS from 'aws-sdk';
import ical, { ICalCalendar } from 'ical-generator';
import dayjs = require('dayjs');

// Run Lambda

// Load configurations
// TODO: Jaser remember to ask me for these
AWS.config.update({
  accessKeyId: process.env.NX_ACCESS_KEY_ID,
  secretAccessKey: process.env.NX_SMTP_PASSWORD,
  region: process.env.NX_REGION,
});

type Transporter = nodemailer.Transporter<SESTransport.SentMessageInfo>;
const transporter: Transporter = nodemailer.createTransport({
  SES: new AWS.SES({
    region: process.env.NX_REGION,
    apiVersion: dayjs().format('MM/DD/YYYY'),
  }),
});

// function that sends email
const sendEmail = (
  to: string,
  subject: string,
  html: any,
  calendarObj = null
) => {
  const mailOptions = {
    to,
    subject,
    html,
  };
  if (calendarObj) {
    const alternatives = {
      'Content-Type': 'text/calendar',
      method: 'REQUEST',
      content: Buffer.from(calendarObj.toString()),
      component: 'VEVENT',
      'Content-Class': 'urn:content-classes:calendarmessage',
    };
    mailOptions['alternatives'] = alternatives;
  }
  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ', response);
    }
  });
};

// create ICS calendar invite attachment
const getIcalObjectInstance = (
  startTime,
  endTime,
  summary,
  description,
  location,
  url,
  name,
  email
) => {
  const cal: ICalCalendar = ical({
    url,
    name: 'My test calendar event',
  });
  cal.createEvent({
    start: startTime,
    end: endTime,
    summary, // this is like long title
    description,
    location,
    organizer: {
      // 'organizer details'
      name: name,
      email: email,
    },
  });
  return cal;
};

module.exports = {
  sendEmail,
  getIcalObjectInstance,
};
