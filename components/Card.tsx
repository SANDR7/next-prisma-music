import React from "react";
import { Album, Band } from "@prisma/client";
import Image from "next/image";


const Card = ({ content }: { content: Album }) => {
  return (
    <div>
      {/* <b>card</b> */}
      {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
      <h2>
        {content.record}
      </h2>
      <a href={content.spotify}>Spotify</a>
      <div>
        <Image src={content.cover} alt="image" height={100} width={100} />
      </div>
    </div>
  );
};

export default Card;