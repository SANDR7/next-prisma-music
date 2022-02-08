import prisma from './prisma';
;



const readAlbums = async () => {
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

    return albums;
}

const readOneAlbum = async (id) => {
    const album = await prisma.album.findUnique({
    where: { id: Number(id) },
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

  return album;
}

export const prismaData = {
    album: {
        readAll: readAlbums(),
        one: (id) => readOneAlbum(id)
    }
}