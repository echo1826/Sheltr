import React from "react";
// imports from material
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
// imports from utils
import Auth from '../utils/auth';
import {UPDATE_SETTINGS} from '../utils/mutations';
import {QUERY_SETTINGS} from '../utils/queries';
import {useQuery, useMutation} from '@apollo/client';

export default function Settings() {
  const {loading, data} = useQuery(QUERY_SETTINGS, {
    variables: {userId: Auth.getProfileToken().data._id}
  });
  const [updateSettings] = useMutation(UPDATE_SETTINGS);
  const [age, setAge] = React.useState("");
  const [size, setSize] = React.useState("");
  const [trained, setTrained] = React.useState(false);
  if(!loading) {
    console.log(data);
    const settings = data?.settings;
    if(settings !== null || undefined) {
      setAge = settings.age;
      setSize = settings.size;
      setTrained = settings.house_trained;
    }
  }

  const goLogin = (event) => {
    window.location.assign("/");
  };
  const handleAge = (event) => {
    setAge(event.target.value);
  };
  const handleSize = (event) => {
    setSize(event.target.value);
  };
  const handleTrained = (event) => {
    setTrained(event.target.value);
  };
  const handleLogout = () => {
    Auth.logout();
  };

  const handleSettingsChange = async(e) => {
    e.preventDefault();
    try{
      const {data} = await updateSettings({
        variables: {userId:Auth.getProfileToken().data._id, age, size, trained}
      });
      console.log(data.updateSettings.age, data.updateSettings.size, data.updateSettings.house_trained);
      // setAge(data.updateSettings.age);
      // setSize(data.updateSettings.size);
      // setTrained(data.updateSettings.house_trained)
    }catch(err) {
      console.log(err);
    }
  }

  if (Auth.isLoggedIn()) {
    return (
      <Box sx={{
        display: 'grid',
        gridAutoColumns: '1fr',
        gap: 3,
        alignItems: 'center',
      }}
    >
      <Paper elevation = {6} >
          <h2 align="center">User Settings</h2>
        <FormControl fullWidth>
          <InputLabel id="age-select" margin="10%">Age</InputLabel>
          <Select
            labelId="age-select"
            id="demo-simple-select"
            value={age}
            label="Age"
            type="age"
            onChange={handleAge}
          >
            <MenuItem value={'baby'}>Baby</MenuItem>
            <MenuItem value={'young'}>Young</MenuItem>
            <MenuItem value={'adult'}>Adult</MenuItem>
            <MenuItem value={'senior'}>Senior</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="size-select" margin="10%">Size</InputLabel>
          <Select
            labelId="size-select"
            id="demo-simple-select"
            value={size}
            label="Size"
            onChange={handleSize}
          >
            <MenuItem value={'small'}>Small</MenuItem>
            <MenuItem value={'medium'}>Medium</MenuItem>
            <MenuItem value={'large'}>Large</MenuItem>
            <MenuItem value={'extraLarge'}>Extra Large</MenuItem>
          </Select>
        </FormControl>
        <FormControl component="fieldset">
      <FormLabel component="legend"></FormLabel>
      <FormGroup aria-label="position" row>
        <FormControlLabel
          value="start"
          control={<Switch color="primary" />}
          label="House-trained"
          labelPlacement="start"
        />
        </FormGroup>
      </FormControl>
        </Paper>
        
        <Button variant = "contained" justifyContent ="center"
        onClick={handleLogout} className='settingsLogout'>Logout</Button>
      </Box>
    );
  } else {
    const style = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    };

    return (
      <div style={style}>
        <h1>You are not logged in!!</h1>
        <Button onClick={goLogin}>Login</Button>
      </div>
    );
  }
}
