import { Prisma } from "@prisma/client";
import prisma from '../../../db/prisma';

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "DELETE")
        return res.status(405).json({ message: "Method not allowed" });

    try {
        const albumData: Prisma.AlbumDeleteArgs = req.body;
        const savedAlbum = await prisma.album.delete({
            where: {
                id: Number(albumData),
            }
        });
        res.status(200).json(savedAlbum);
    } catch (err) {
        res.status(400).json({ message: "Something went wrong" });
    }
};

export default handler;
