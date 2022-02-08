import React from "react";
// import prisma from '../../db/prisma';

import { Album, PrismaClient } from "@prisma/client";
import Card from "../../components/Card";

const prisma = new PrismaClient();

export const getServerSideProps = async (context) => {
  const Album = await prisma.album.findUnique({
    where: { id: Number(context.params.id) },
    select: {
      record: true,
      cover: true,
      Band: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: {
      Album,
    },
  };
};

// export const getStaticPaths = async () => {
//   const albums = await prisma.album.findMany();

//   return {
//     paths: albums.map((album) => ({
//       params: {
//         id: album.id.toString(),
//       },
//     })),
//     fallback: false,
//   };
// };

const AlbumDetail = ({ Album }) => {
  return (
    <div>
      <Card content={Album}/>
      <button onClick={() => history.back()}>Back</button>
    </div>
  );
};

export default AlbumDetail;
