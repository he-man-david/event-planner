import nodemailer from 'nodemailer';
import SESTransport from 'nodemailer/lib/ses-transport';
import { SES } from 'aws-sdk';
import ical, { ICalCalendar } from 'ical-generator';

type Transporter = nodemailer.Transporter<SESTransport.SentMessageInfo>;
const transporter: Transporter = nodemailer.createTransport({
  SES: new SES({
    region: process.env.NX_REGION,
    credentials: {
      accessKeyId: process.env.NX_ACCESS_KEY_ID,
      secretAccessKey: process.env.NX_SMTP_PASSWORD,
    }
  }),
});

// function that sends email
export const sendEmail = (
  from: string,
  to: string,
  subject: string,
  html: any,
  calendarObj: ICalCalendar | null
) => {
  const mailOptions: any = {
    from,
    to,
    subject,
    html,
  };

  if (calendarObj) {
    mailOptions.icalEvent = {
      filename: 'Event-invite.ics',
      method: 'request',
      content: calendarObj.toString(),
    };
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
export const getIcalObjectInstance = (
  startTime,
  endTime,
  summary,
  description,
  location,
  url
) => {
  const cal: ICalCalendar = ical({
    url,
    name: 'Event calendar invite',
  });

  cal.createEvent({
    start: startTime,
    end: endTime,
    summary, // this is like long title
    description,
    location,
  });

  return cal;
};
