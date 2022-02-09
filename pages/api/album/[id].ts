import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from '../../../db/prisma';
import { prismaData } from "../../../db/prismaData";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  switch (req.method) {
    case "PATCH":
      handlePut(req.query.id, data, res)
      break;
    case "POST":
      break;
    case "GET":
      handleGet(req.query.id, res);
      break;
    case "DELETE":
      handleDelete(req.query.id, res)
      break;
    default:
      res.send({ message: "no method" })
      break;
  }

}


const handleGet = async (id: string | string[], res: NextApiResponse) => {
  const data = await prismaData.album.one(id)

  res.status(200).send(data)
}

const handlePut = async (id: string | string[], data: string, res: NextApiResponse) => {
  const newData: Prisma.AlbumUpdateInput = JSON.parse(data);
  try {
    const savedAlbum = await prisma.album.update({
      where: {
        id: Number(id)
      },
      data: {
        record: newData?.record.toString(),
        releaseDate: "1970-01-01T00:00:00.000Z",
      },
    });
    res.status(200).json(savedAlbum);
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
}

const handleDelete = async (id: string | string[], res: NextApiResponse) => {
  try {
    const deleteAlbum = await prisma.album.delete({
      where: {
        id: Number(id)
      }
    })

    res.status(200).json(deleteAlbum)
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" })
  }
}