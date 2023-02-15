import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import {Typography, Paper, Button, Box} from '@mui/material';
import { asyncDeleteMission } from "../../../../store/PicsTogether/picsTg";


export default function MissionCompleted() {
  const dispatch = useDispatch()

  // 이번주 Mission 데이터 가져오기
  const getMission = useSelector(state => {
    return state.picsTg.getMission
  })
  const imageURL = 'https://i8a805.p.ssafy.io/'

  // 미션 삭제 함수
  const deleteMission = () => {
    if ( window.confirm('이번주 등록한 미션을 정말 삭제하시겠습니까?') == true) {
      dispatch(asyncDeleteMission(getMission.id))
    }
  }

  return (
    <Paper
      elevation={2}
      sx={{
        padding:3,
      }}
    >
      <Typography align="center" variant="h4" fontWeight={800} marginBottom="30px">이번주 미션 완료</Typography>
      <Typography style={{ fontWeight:'bold', marginBottom:'20px'}}>{getMission.title}</Typography>
      <Typography style={{ marginBottom:'30px'}}>
        {getMission.content}
      </Typography>
      <Box
        style={{
          display:'flex',
          justifyContent:'center',
          marginBottom:'30px'
        }}>
        <img
          src={imageURL + getMission.img}
          alt='exampleImg'
          width='200px'/>
      </Box>
      <Box
        style={{
          display:'flex',
          justifyContent:'center',}}>
        <Button onClick={deleteMission} size="medium" variant="contained" style={{ backgroundColor: '#FF9494', color: 'white' }} disableElevation>미션 삭제하기</Button>
      </Box>
    </Paper>
  )
}
