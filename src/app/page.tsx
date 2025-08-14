'use client';
import React from "react";
import { Box, Button, InputLabel, Select, MenuItem, Typography, Grid, IconButton, useTheme } from "@mui/material";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import skillData from "../../public/skill.json";
import { ThemeContext } from './theme';

export default function Home() {
  const skillsData = skillData;
  const [result, setResult] = React.useState(0);
  const [skill1, setSkill1] = React.useState({ id: 0, level: 0 });
  const [skill2, setSkill2] = React.useState({ id: 0, level: 0 });
  const [skill3, setSkill3] = React.useState({ id: 0, level: 0 });
  const [jewel1, setJewel1] = React.useState(0);
  const [jewel2, setJewel2] = React.useState(0);
  const [jewel3, setJewel3] = React.useState(0);
  const [init, setInit] = React.useState(0);

  const resultText = [
    { grade: "S", title: "신급 호석", description: "종결 호석입니다. 어느 상황에서든 활용할 수 있습니다." },
    { grade: "A", title: "강력한 호석", description: "고성능 호석입니다. 많은 상황에서 쓸 수 있는 호석입니다." },
    { grade: "B", title: "좋은 호석", description: "꽤 좋은 호석입니다. 특정 세팅에서 활용할 수 있습니다." },
    { grade: "C", title: "평범한 호석", description: "표준적인 성능의 호석입니다." },
    { grade: "D", title: "쓰레기 호석", description: "다른 호석을 찾는게 낫습니다." }
  ]

  const handleSkill1Change = (value: number, level?: number) => {
    if (level !== undefined) {
      // level이 전달된 경우 (Select에서 호출)
      setSkill1({ ...skill1, level: level });
    } else {
      // value만 전달된 경우 (Autocomplete에서 호출)
      const selectedSkill = skillsData.find(skill => skill.id === value);
      if (selectedSkill) {
        setSkill1({ id: value, level: selectedSkill.level || 0 });
      } else {
        setSkill1({ id: value, level: 0 });
      }
    }
  };

  const handleSkill2Change = (value: number, level?: number) => {
    if (level !== undefined) {
      // level이 전달된 경우 (Select에서 호출)
      setSkill2({ ...skill2, level: level });
    } else {
      // value만 전달된 경우 (Autocomplete에서 호출)
      const selectedSkill = skillsData.find(skill => skill.id === value);
      if (selectedSkill) {
        setSkill2({ id: value, level: selectedSkill.level || 0 });
      } else {
        setSkill2({ id: value, level: 0 });
      }
    }
  };

  const handleSkill3Change = (value: number, level?: number) => {
    if (level !== undefined) {
      // level이 전달된 경우 (Select에서 호출)
      setSkill3({ ...skill3, level: level });
    } else {
      // value만 전달된 경우 (Autocomplete에서 호출)
      const selectedSkill = skillsData.find(skill => skill.id === value);
      if (selectedSkill) {
        setSkill3({ id: value, level: selectedSkill.level || 0 });
      } else {
        setSkill3({ id: value, level: 0 });
      }
    }
  };

  const handleJewel1Change = (value: number) => {
    setJewel1(value);
  };

  const handleJewel2Change = (value: number) => {
    setJewel2(value);
  };

  const handleJewel3Change = (value: number) => {
    setJewel3(value);
  };

  const findSkill = (id: number) => {
    if (skillsData.find(skill => skill.id === id)) {
      return skillsData.find(skill => skill.id === id);
    } else {
      return null;
    }
  };

  const calculate = () => {
    let score = 0;

    score += (findSkill(skill1.id)?.score || 0) * skill1.level;
    score += (findSkill(skill2.id)?.score || 0) * skill2.level;
    score += (findSkill(skill3.id)?.score || 0) * skill3.level;
    score += jewel2 * 2500 + jewel3 * 2500;

    switch (jewel1) {
      case 0:
        score += 2500;
        break;
      case 1:
        score += 5000;
        break;
      case 2:
      case 3:
        score += 10000;
        break;
    }

    if (score >= 50000) {
      setResult(1);
    } else if (score >= 30000) {
      setResult(2);
    } else if (score > 20000) {
      setResult(3);
    } else if (score > 10000) {
      setResult(4);
    } else {
      setResult(5);
    }
  };

  const reset = () => {
    setInit(init + 1);
    setSkill1({ id: 0, level: 0 });
    setSkill2({ id: 0, level: 0 });
    setSkill3({ id: 0, level: 0 });
    setJewel1(0);
    setJewel2(0);
    setJewel3(0);
    setResult(0);
  };

  const theme = useTheme();
  const colorMode = React.useContext(ThemeContext);

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      width: "100%",
      padding: "20px 0",
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    }}>
      <Box sx={{
        position: 'absolute',
        top: 20,
        right: 20,
      }}>
        <IconButton onClick={colorMode.toggleColorMode} color="primary">
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Box>

      <Typography variant="h4" fontWeight="bold" sx={{ color: theme.palette.primary.main }}>와일즈 호석 등급 판별기</Typography>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "500px",
        marginTop: 4,
        backgroundColor: theme.palette.background.paper,
        padding: 4,
        borderRadius: 2,
        boxShadow: theme.palette.mode === 'dark' ? '0 4px 20px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}>
        <Grid container spacing={2} >
          <Grid size={8}>
            <Autocomplete
              key={init}
              options={skillsData}
              renderInput={(params) => <TextField {...params} label="스킬 1" />}
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => handleSkill1Change(value?.id || 0)}
            />
          </Grid>
          <Grid size={4}>
            <FormControl>
              <InputLabel id="skill1-level">레벨</InputLabel>
              <Select
                labelId="skill1-level"
                value={skill1.level}
                onChange={(event) => handleSkill1Change(skill1.id, event.target.value)}
                label="레벨"
                sx={{ width: 135 }}
              >
                {Array.from({ length: findSkill(skill1.id)?.level || 0 }, (_, index) => index + 1).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={8}>
            <Autocomplete
              key={init}
              options={skillsData}
              renderInput={(params) => <TextField {...params} label="스킬 2" />}
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => handleSkill2Change(value?.id || 0)}
            />
          </Grid>
          <Grid size={4}>
            <FormControl>
              <InputLabel id="skill2-level">레벨</InputLabel>
              <Select
                labelId="skill2-level"
                value={skill2.level}
                onChange={(event) => handleSkill2Change(skill2.id, event.target.value)}
                label="레벨"
                sx={{ width: 135 }}
              >
                {Array.from({ length: findSkill(skill2.id)?.level || 0 }, (_, index) => index + 1).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={8}>
            <Autocomplete
              key={init}
              options={skillsData}
              renderInput={(params) => <TextField {...params} label="스킬 3" />}
              getOptionLabel={(option) => option.title}
              onChange={(event, value) => handleSkill3Change(value?.id || 0)}
            />
          </Grid>
          <Grid size={4}>
            <FormControl>
              <InputLabel id="skill3-level">레벨</InputLabel>
              <Select
                labelId="skill3-level"
                value={skill3.level}
                onChange={(event) => handleSkill3Change(skill3.id, event.target.value)}
                label="레벨"
                sx={{ width: 135 }}
              >
                {Array.from({ length: findSkill(skill3.id)?.level || 0 }, (_, index) => index + 1).map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl>
              <InputLabel id="jewel1-type">장식주 슬롯 1</InputLabel>
              <Select
                labelId="jewel1-type"
                value={jewel1}
                onChange={(event) => handleJewel1Change(event.target.value)}
                label="장식주 슬롯"
                sx={{ width: 135 }}
              >
                <MenuItem value={0}>방어구1</MenuItem>
                <MenuItem value={1}>방어구2</MenuItem>
                <MenuItem value={2}>방어구3</MenuItem>
                <MenuItem value={3}>무기1</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl>
              <InputLabel id="jewel2-type">장식주 슬롯 2</InputLabel>
              <Select
                labelId="jewel2-type"
                value={jewel2}
                onChange={(event) => handleJewel2Change(event.target.value)}
                label="장식주 슬롯"
                sx={{ width: 135 }}
              >
                <MenuItem value={0}>없음</MenuItem>
                <MenuItem value={1}>방어구1</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl>
              <InputLabel id="jewel3-type">장식주 슬롯 3</InputLabel>
              <Select
                labelId="jewel3-type"
                value={jewel3}
                onChange={(event) => handleJewel3Change(event.target.value)}
                label="장식주 슬롯"
                sx={{ width: 135 }}
              >
                <MenuItem value={0}>없음</MenuItem>
                <MenuItem value={1}>방어구1</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, marginTop: 2 }}>
          <Button
            variant="contained"
            sx={{
              width: 100,
              height: 40,
              fontWeight: 'bold',
              color: theme.palette.primary.contrastText
            }}
            onClick={() => calculate()}
          >계산</Button>
          <Button
            variant="outlined"
            sx={{
              width: 100,
              height: 40,
              fontWeight: 'bold'
            }}
            onClick={() => reset()}
          >초기화</Button>
        </Box>
        {result !== 0 ?
          (
            <>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 1, marginTop: 2 }}>
                <Typography variant="h1" fontWeight="bold" sx={{ color: theme.palette.mode === 'dark' ? theme.palette.primary.main : '#fdb35c' }}>{resultText[result - 1].grade}</Typography>
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.text.primary }}>{resultText[result - 1].title}</Typography>
                <Typography variant="h6" fontWeight="regular" sx={{ textAlign: "center", color: theme.palette.text.secondary }}>{resultText[result - 1].description}</Typography>
              </Box>
            </>
          ) : null}
      </Box>
      <footer>
        <Typography variant="body2" sx={{ position: "fixed", bottom: 10, left: 0, right: 0, textAlign: "center", color: theme.palette.text.secondary }}>
          <a href="https://game8.jp/mhwilds/710441" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>https://game8.jp/mhwilds/710441</a>에 있는 도구의 한국어 버전입니다.
        </Typography>
      </footer>
    </Box>
  );
}

