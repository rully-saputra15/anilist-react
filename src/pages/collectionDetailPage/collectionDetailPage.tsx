import { FC } from "react";
import { useParams } from "react-router-dom";

type CollectionDetailPageProps = object;

const CollectionDetailPage: FC<CollectionDetailPageProps> = () => {
  const { collectionName } = useParams();
  return <div>collection detail {collectionName}</div>;
};

export default CollectionDetailPage;
