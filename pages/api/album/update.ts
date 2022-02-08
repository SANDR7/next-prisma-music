import { Prisma } from "@prisma/client";
import prisma from '../../../db/prisma';

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "PATCH")
        return res.status(405).json({ message: "Method not allowed" });

    try {
        const albumData: Prisma.AlbumUpdateInput = JSON.parse(req.body);
        const savedAlbum = await prisma.album.update({
            where: {
                id: albumData.id
            },
            data: {
                record: albumData?.record.toString(),
                releaseDate: "1970-01-01T00:00:00.000Z",
            },
        });
        res.status(200).json(savedAlbum);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
};

export default handler;
