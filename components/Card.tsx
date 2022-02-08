import React from "react";
import { Album  } from "@prisma/client";


const Card = ({ content }: { content: Album }) => {
  return (
    <div>
      {/* <b>card</b> */}
      {/* <pre>{JSON.stringify(content, null, 2)}</pre> */}
      <h2>
        {content.record}
      </h2>
      <div>
        <img src={content.cover} alt="image" style={{width: '20%'}} />
      </div>
    </div>
  );
};

export default Card;
