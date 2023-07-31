import { FC } from "react";
import { Anime } from "../../interfaces";

type CollectionDetailPageProps = {
  collectionName: string;
  animes: Anime[];
  handleDeleteAnime: (animeId: number) => void;
};

const CollectionDetailPage: FC<CollectionDetailPageProps> = ({
  collectionName,
  animes,
  handleDeleteAnime,
}) => {
  return (
    <div>
      <div>{collectionName}</div>
      {animes.map((anime) => (
        <div key={anime.id}>
          <div key={anime.id}>{anime.title}</div>
          <button onClick={() => handleDeleteAnime(anime.id)}>delete</button>
          <button>view</button>
        </div>
      ))}
    </div>
  );
};

export default CollectionDetailPage;
