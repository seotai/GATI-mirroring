import { useState } from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CardOptionModal from "./CardOptionModal";
import httpClient from "../../utils/axios";
import { useEffect } from "react";

import noImgPath from "../../static/no_img_icon.png";

// fontawesome
import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fulfilledHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";
import { Fragment } from "react";

export default function ArticleCard(props) {
  const navigate = useNavigate();
  const { loginUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [likeVar, setLikeVar] = useState(0);
  const [toggleLike, setToggleLike] = useState(false);

  const article = props.article;
  const variant = props.variant == null ? "feed" : props.variant;

  var imgPath = process.env.REACT_APP_IMG_ROOT + "/" + article.img;
  // console.log(imgURL);

  useEffect(() => {
    if (toggleLike) {
      setLikeVar(article.userLike === 1 ? -1 : +1);
    } else setLikeVar(0);
  }, [toggleLike]);

  const mvToDetail = () => {
    // console.log("move to detail page");
    const url = "/detail/" + article.id;
    navigate(url);
  };

  function showOptions() {
    // console.log("show options");
    setOpen(true);
  }

  function toggleFav() {
    // console.log("add/remove this article to/from favorite");
    httpClient
      .post(`/boards/likes?boardId=${article.id}&userId=${loginUser.userId}`)
      .then((data) => {
        // console.log(data)
      })
      .catch((data) => console.log(data));
    setToggleLike(toggleLike ? false : true);
  }

  function addToPhotoBook() {
    if (window.confirm("소중한 추억을 앨범에 저장하시겠습니까?")) {
      httpClient
        .post("/boards/save", null, {
          params: { boardId: article.id },
        })
        .then((res) => {
          // console.log(res);
          alert("소중한 추억 저장완료~ㅎ");
          // if (res.status === 200) alert("add article to photo book");
        });
    }
  }

  let bookmark = null;
  if (props.mode === "feed") {
    bookmark = (
      <IconButton aria-label="bookmark" onClick={addToPhotoBook}>
        <BookmarkBorderIcon />
      </IconButton>
    );
  }

  return (
    <>
      <Card
        sx={{ borderRadius: 1 }}
        style={{ marginBottom: "10px", width: "100%" }}
      >
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={showOptions}
              style={{
                display:
                  article.userId == loginUser.userId ? "inline-block" : "none",
              }}
            >
              <MoreHorizIcon />
            </IconButton>
          }
          title={article.userId}
          titleTypographyProps={{ variant: "body1" }}
          style={{ textAlign: "left", padding: "10px" }}
        />
        {article.img != null ? (
          <CardMedia
            component="img"
            width="100%"
            image={imgPath}
            alt="NO IMAGE"
            onError={(e) => {
              e.target.src = noImgPath;
            }}
          />
        ) : (
          "no img"
        )}

        <CardActions disableSpacing={true}>
          <IconButton aria-label="add to favorites" onClick={toggleFav}>
            {/* <FavoriteIcon
              style={{
                color: (article.userLike === 1) ^ toggleLike ? "red" : "grey",
              }}
            /> */}
            {(article.userLike === 1) ^ toggleLike ? (
              <FontAwesomeIcon
                className="fulfilled-heart"
                icon={fulfilledHeart}
              />
            ) : (
              <FontAwesomeIcon className="empty-heart" icon={emptyHeart} />
            )}
          </IconButton>
          {article.likes + likeVar}
          <Box style={{ marginLeft: "auto" }}>
            <Typography
              variant="body4"
              style={{ fontWeight: "bold", marginRight: "10px" }}
            >
              {article.createTime != null && article.createTime.split("T")[0]}
            </Typography>
            {bookmark}
          </Box>
        </CardActions>

        {variant == "detail" &&
          Array.isArray(article.tag) &&
          article.tag.map((tag, index) => {
            return <Fragment key={index}>#{tag.tagContent}&nbsp;</Fragment>;
          })}
        <CardContent>
          <Typography variant="body2" style={{ textAlign: "left" }}>
            {article.content}
          </Typography>
        </CardContent>

        {variant == "feed" ? (
          <CardActions style={{ height: "30px" }}>
            <Typography
              variant="body2"
              onClick={mvToDetail}
              style={{ marginLeft: 10, cursor: "pointer" }}
            >
              Comment &nbsp;
              {article.comments > 0 && article.comments}
            </Typography>
          </CardActions>
        ) : null}
      </Card>
      <CardOptionModal open={open} setOpen={setOpen} articleId={article.id} />
    </>
  );
}
