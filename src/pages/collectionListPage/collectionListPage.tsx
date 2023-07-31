import { FC, useContext } from "react";
import { CollectionContext } from "../../store/reducer";
import { Anime } from "../../interfaces";
type CollectionListPageProps = object;

const CollectionListPage: FC<CollectionListPageProps> = () => {
  const collections: Record<string, Anime[]> = useContext(CollectionContext);
  console.log(collections);
  const renderCollection = () => {
    return Object.keys(collections).map((key: string) => {
      const collection = collections[key];
      return collection.map((collection: Anime) => {
        return (
          <div key={key}>
            <span>{key}</span>
            <span>{collection.title}</span>
          </div>
        );
      });
    });
  };
  return <div>{renderCollection()}</div>;
};

export default CollectionListPage;
