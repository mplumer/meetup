import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import dotenv from "dotenv";
import { Fragment } from "react";

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

function MeetupDetails(props) {
    return (
        <Fragment>
        <Head>
                <title>{props.meetupData.title}</title>
                <meta
                        name="description"
                        content={props.meetupData.description}
                />
        </Head>
        <MeetupDetail
            image={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
            description={props.meetupData.description}
        />
        </Fragment>
    );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ug4t9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ug4t9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({
        _id: new ObjectId(meetupId),
    });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      }
    },
  };
}

export default MeetupDetails;
