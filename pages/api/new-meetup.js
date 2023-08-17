import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

async function handler(req, res) {
   if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ug4t9.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
    
        console.log(result);

        client.close();
    
        res.status(201).json({ message: 'Meetup inserted!' });
   }
}

export default handler;