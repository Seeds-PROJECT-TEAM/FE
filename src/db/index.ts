import { MongoClient } from "mongodb";

const url = "mongodb+srv://admin:1234@cluster0.6mi5too.mongodb.net/forum";

export async function getDB() {
  const client = new MongoClient(url);
  await client.connect();
  return client.db("forum");
}
