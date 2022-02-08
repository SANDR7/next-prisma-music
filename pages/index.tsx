import Head from "next/head";
import Link from "next/link";

import { PrismaClient, Album } from "@prisma/client";
import styles from "../styles/Home.module.css";
import Card from "../components/Card";
import { useState } from "react";

export const getStaticProps = async () => {
  const prisma = new PrismaClient();
  const albums = await prisma.album.findMany({
    select: {
      id: true,
      record: true,
      cover: true,
      spotify: true,
      Band: {
        select: {
          name: true,
          artist: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  
  return {
    props: {
      albums,
    },
    revalidate: 5,
  };
};

export default function Home({ albums }) {
  const [field, setField] = useState<Album[]>(albums);


  const addRecord = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/album/create", {
      method: "POST",
      body: JSON.stringify(field),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }

    e.target.reset();
    const updatedAlbums = await res.json();
    setField([...field, updatedAlbums]);
    return updatedAlbums;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={addRecord}>
          <input
            type="text"
            name="record"
            id="record"
            placeholder="record"
            onChange={(e) => setField({ ...field, record: e.target.value })}
          />
          <input
            type="text"
            name="cover"
            id="cover"
            placeholder="cover"
            onChange={(e) => setField({ ...field, cover: e.target.value })}
          />
          <input type="submit" value="Send" />
        </form>

        {field &&
          field.map((album: Album, idx: number) => (
            <Link passHref href={`album/${album.id}`} key={idx}>
              <a>
                <Card content={album} />
              </a>
            </Link>
          ))}
      </main>
    </div>
  );
}
