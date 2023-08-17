import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function handler(req, res) {
   if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ug4t9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
        const db = client.db();

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);
    
        console.log(result);

        client.close();
    
        res.status(201).json({ message: 'Meetup inserted!' });
   }
}

export default handler;