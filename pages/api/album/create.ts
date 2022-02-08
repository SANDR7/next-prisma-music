import { PrismaClient, Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const contact: Prisma.AlbumCreateInput = req.body;
    const savedContact = await prisma.album.create({
      data: {
        record: contact.toString(),
		cover: 'https://media.s-bol.com/nZY7Av5MW8ZD/550x485.jpg',
		spotify: 'https://ww.google.com/',
        releaseDate: "1970-01-01T00:00:00.000Z",
      },
    });
    res.status(200).json(savedContact);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

export default handler;
