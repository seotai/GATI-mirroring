import { React, useState } from "react";
import { useNavigate, useParams } from "react-router";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Box, Button, FormControl, Input, OutlinedInput } from "@mui/material";
import axios from "axios";
import httpClient from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadPostDetail } from "../../store/Board/board";
import { loadPhotoDetail } from "../../store/PhotoBoard/photoBoard";

const contStyle = css`
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 30px 15px;
  .photo {
    margin: 10px 0px;
    .photo-label {
      padding-bottom: 10px;
    }
    .photo-prev {
      background-color: #dddddd;
      width: 200px;
      height: 200px;
      border-radius: 10px;
      text-align: center;
      display: inline-block;
    }
    .edit-btn {
      display: inline-block;
      color: #ff9494;
    }
  }
  .input-label {
    width: 100%;
    border-style: solid;
    border-width: 0 0 1px 0;
    padding-bottom: 10px;
  }
  .text-input {
    border-radius: 0 0 10px 10px;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .button-group {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    > * {
      margin: 10px;
    }
  }
`;

const CreatePhoto = (props) => {
  const variant = props.variant == null ? "create" : props.variant;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imgURL, setImgURL] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [serializedTag, setSerializedTag] = useState("");

  const photoId = useParams().photoId;
  const { photoInfo } = useSelector((state) => state.photoBoard);
  const { loginUser } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("mounted");
    if (variant === "modify") {
      const reqData = {
        photoId: photoId,
        userId: loginUser.userId,
      };
      dispatch(loadPhotoDetail(reqData))
        .then((data) => {
          // console.log(data);
          console.log(data.payload.img);
          // setImgURL(URL.createObjectURL(event.target.files[0]));
          setImgURL("https://picsum.photos/400/300");
          setSerializedTag(serializeTag(data.payload.tag));
          setLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function serializeTag(tagObjs) {
    console.log(tagObjs);
    var str = "";
    if (tagObjs != null) {
      tagObjs.map((tagObj) => {
        str += tagObj.tagContent;
        str += " ";
      });
    }
    console.log(str);
    return str;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(imgURL)
    // console.log("submit form");
    // console.log(event.target.img.files[0].name);
    // console.log(event.target.content.value);
    // console.log(event.target.tag.value);
    let tagObjs = parseTags(event.target.tag.value);
    let formData = {
      content: event.target.content.value,
      tagDtos: tagObjs,
      // img: event.target.img.files[0].name,
      // img: {imgURL},
    };

    let param = {
      ...formData,
      userId: loginUser.userId,
      groupId: 1,
    };

    const imgData = new FormData();
    imgData.append("img", imgURL);

    await axios
      .post("https://i8a805.p.ssafy.io/api/albums/album", imgData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: param,
      })
      .then((response) => {
        console.log(response, "성공");
      })
      .catch((e) => {
        console.log(e);
      });
    // if (variant === "create") {
    //   const postData = {
    //     ...formData,
    //     userId: loginUser.userId,
    //     // userId: 'userid',
    //     groupId: 1,
    //   };
    //   console.log(postData);
    //   httpClient.post("/albums/album/", postData)
    //     .then((data) => {
    //       console.log(data)
    //       alert("album posted");
    //       navigate("/photobook");
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //       alert("failed to post album");
    //     });
    // }
    // else if (variant === "modify") {
    //   const putData = {
    //     ...formData,
    //     id: photoId,
    //   };
    //   console.log(putData);
    //   httpClient.put("/albums/album/", putData)
    //     .then((data) => {
    //       console.log(data);
    //       alert("modified");
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       alert("failed to modify data");
    //     })
    // }
  }

  function parseTags(str) {
    // console.log(str);
    // console.log(str.split(" "));
    const tags = str.split(" ");
    let ret = [];
    tags.map((tag, index) => {
      // console.log(tag);
      ret.push({ tagContent: tag });
    });
    return ret;
  }

  function backToMain() {
    if (window.confirm("cancel ?")) {
      // should be fixed
      navigate(-1);
    }
  }

  function handleIMGChange(event) {
    // console.log(event.target.files[0]);
    // setImgURL(URL.createObjectURL(event.target.files[0]));
    // console.log(imgURL)
    event.preventDefault();
    const imgFile = event.target.files[0];
    setImgURL(imgFile);
    console.log(imgURL);
  }

  return (
    <Box component="form" css={contStyle} onSubmit={handleSubmit}>
      <Box className="photo">
        <Box className="photo-label">사진 선택</Box>
        <Box className="photo-box">
          <Box
            className="photo-prev"
            component="img"
            src={imgURL}
            alt="please select photo"
          />
        </Box>
        <label htmlFor="select-img">
          <Button className="edit-btn" component="span">
            edit
          </Button>
        </label>
        <Input
          inputProps={{ accept: "image/*" }}
          type="file"
          // ref={fileInput}
          id="select-img"
          name="img"
          style={{ display: "none" }}
          onChange={handleIMGChange}
        />
      </Box>
      <FormControl variant="standard" style={{ width: "100%" }}>
        <Box className="input-label">문구 입력</Box>
        <OutlinedInput
          className="text-input"
          placeholder="사진과 함께 기억하고 싶은 추억들을 이 곳에 기록하세요."
          multiline={true}
          name="content"
          style={{ height: "150px" }}
          defaultValue={variant === "modify" && loaded ? photoInfo.content : ""}
        />
      </FormControl>
      <FormControl variant="standard" style={{ width: "100%" }}>
        <Box className="input-label">태그</Box>
        <OutlinedInput
          className="text-input"
          placeholder="사진의 태그를 입력하세요."
          multiline={true}
          name="tag"
          defaultValue={variant === "modify" && loaded ? serializedTag : ""}
        />
      </FormControl>
      <Box className="button-group">
        <Button type="submit" variant="contained">
          확인
        </Button>
        <Button variant="outlined" onClick={backToMain}>
          취소
        </Button>
      </Box>
    </Box>
  );
};

export default CreatePhoto;
