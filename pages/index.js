import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
import dotenv from "dotenv";
import { Fragment } from "react";

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

function HomePage(props) {
  return (
  <Fragment>
  <Head>
    <title>React Meetups</title>
    <meta
      name="description"
      content="Browse a huge list of highly active React meetups!"
    />
  </Head>
  <MeetupList meetups={props.meetups} />
  </Fragment>
  );
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ug4t9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
  };
}

export default HomePage;
