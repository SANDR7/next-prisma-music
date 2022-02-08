import React, { useState } from "react";
// import prisma from '../../db/prisma';

import { Album } from "@prisma/client";
import Card from "../../components/Card";
import { useRouter } from "next/router";
import { prismaData } from "../../db/prismaData";

export const getServerSideProps = async (context) => {
  const album = await prismaData.album.one(context.params.id);

  return {
    props: {
      album,
    },
  };
};

const AlbumDetail = ({ album }) => {
  const [fields, setFields] = useState<Album>(album);
  const router = useRouter();

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

  const deleteRecord = async () => {
    console.log(album.id);

    const response = await fetch("http://localhost:3000/api/album/delete", {
      method: "DELETE",
      body: JSON.stringify(album.id),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    if (response.ok) router.push("/") && console.log(`deleted ${album.id}`);

    return await response.json();
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
        <button onClick={deleteRecord}>Delete</button>
      </div>
    </div>
  );
};

export default AlbumDetail;
