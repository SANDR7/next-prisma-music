import React, { useState } from "react";
// import prisma from '../../db/prisma';

import { Album, PrismaClient } from "@prisma/client";
import Card from "../../components/Card";

const prisma = new PrismaClient();

export const getServerSideProps = async (context) => {
  const Album = await prisma.album.findUnique({
    where: { id: Number(context.params.id) },
    select: {
      id: true,
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

const AlbumDetail = ({ Album }) => {
  const [fields, setFields] = useState<Album>(Album);


  const updateRecord = async (e: any) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/album/update", {
      method: "PATCH",
      body: JSON.stringify(fields),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    e.target.reset();
    const updated = await response.json();

    return updated;
  };
  return (
    <div>
      <button onClick={() => history.back()}>Back</button>
      <Card content={fields} />

      <div>
        <form onSubmit={updateRecord}>
          <input
            type="text"
            name="record"
            id="record"
            placeholder="Update Name"
            onChange={(e) => setFields({ ...fields, record: e.target.value })}
          />
          <input type="submit" value="update" />
        </form>
      </div>
    </div>
  );
};

export default AlbumDetail;
