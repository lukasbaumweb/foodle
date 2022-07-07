import React, { useState } from "react";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  useMediaQuery,
} from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";
import InfoIcon from "@mui/icons-material/Info";
import "./../assets/styles/gallery.scss";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../utils/routes";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
    author: "swabdesign",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
    author: "Pavel Nekoranec",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
    author: "Charles Deluvio",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
    author: "Christian Mackie",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
    author: "Darren Richardson",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
    author: "Taylor Simpson",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
    author: "Ben Kolde",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
    author: "Philipp Berndt",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
    author: "Jen P.",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
    author: "Douglas Sheppard",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
    author: "Fi Bell",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
    author: "Hutomo Abrianto",
  },
];

const Gallery = ({}) => {
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const smallerThan300px = useMediaQuery("(max-width:300px)");
  const smallerThan600px = useMediaQuery("(max-width:600px)");
  const smallerThan900px = useMediaQuery("(max-width:900px)");
  const smallerThan1200px = useMediaQuery("(max-width:1200px)");

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

  let columns = 6;

  if (smallerThan300px) {
    columns = columns - 4;
  } else if (smallerThan600px) {
    columns = columns - 3;
  } else if (smallerThan900px) {
    columns = columns - 2;
  } else if (smallerThan1200px) {
    columns = columns - 1;
  }

  return (
    <Box>
      <ImageList
        variant="masonry"
        cols={columns}
        gap={8}
        sx={{ textAlign: "center" }}
      >
        {[
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
          ...itemData,
        ].map((item, index) => (
          <ImageListItem key={index} className="listItem">
            <img
              src={`${item.img}?w=248&fit=crop&auto=format`}
              srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              onClick={() =>
                navigate(ROUTES.shared.viewFoodle.path.replace(":id", index))
              }
            />
            <ImageListItemBar
              className="listItemBar"
              title={item.title}
              subtitle={item.author}
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item.title}`}
                >
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};

export default Gallery;
