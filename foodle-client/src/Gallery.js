import React, { useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

const List = () => <></>;
const ListItem = () => <></>;

const Gallery = ({}) => {
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState();
  const [loading, setLoading] = useState(false);

  function handleLoadMore() {
    setLoading(true);
    // loadNextPage(endCursor, pageSize).then((newPage) => {
    //   setLoading(false);
    //   setHasNextPage(newPage.hasNextPage);
    //   setItems([...items, newPage.items]);
    // });
  }

  const infiniteRef = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: handleLoadMore,
  });

  return (
    <List ref={infiniteRef}>
      {items.map((item) => (
        <ListItem key={item.key}>{item.value}</ListItem>
      ))}
      {loading && <ListItem>Loading...</ListItem>}
    </List>
  );
};

export default Gallery;
