import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList";
//import dotenv from "dotenv";
import { Fragment } from "react";

//dotenv.config();

//const MONGODB = process.env.MONGODB_URI;

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
    'mongodb+srv://maxwell:mongodongo@cluster0.ug4t9.mongodb.net/meetups?retryWrites=true&w=majority'
    //`${MONGODB}`
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
      revalidate: 1,
    },
  };
}

export default HomePage;
