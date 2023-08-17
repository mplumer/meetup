import { MongoClient } from 'mongodb';
//import dotenv from 'dotenv';

//dotenv.config();

//const MONGODB = process.env.MONGODB_URI;

async function handler(req, res) {
   if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(
         'mongodb+srv://maxwell:mongodongo@cluster0.ug4t9.mongodb.net/meetups?retryWrites=true&w=majority'
         //`${MONGODB}`
         ); 
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
    
        console.log(result);

        client.close();
    
        res.status(201).json({ message: 'Meetup inserted!' });
   }
}

export default handler;