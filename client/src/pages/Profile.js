import React from "react";
import { useQuery } from "@apollo/client";
//imports from material
import { Grid } from '@mui/material';
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Button from '@mui/material/Button'
//imports from utils
import Auth from "../utils/auth";
import { QUERY_SINGLE_USER } from "../utils/queries";
import { Link } from "react-router-dom";
import './Profile.css'


export default function Profile() {
  const { loading, data } = useQuery(QUERY_SINGLE_USER, {
    variables: { id: Auth.getProfileToken().data._id },
  });

  const date = data?.user.createdAt
  console.log('date = ',date.getMonth());

  const likedDogs = data?.user.pets || [];

  let profileDogs;
  if (!loading) {
    console.log(data?.user.pets);
    profileDogs = likedDogs.slice(0, 3);
  }

  const goLogin = () => {
    window.location.assign("/");
  };

  if (Auth.isLoggedIn()) {
    return (
    
      <div className= "profileHead">
        <h1>{data?.user.username}</h1>
        <div className="avatar">
        <Avatar alt="Avatar" src="https://avatarfiles.alphacoders.com/170/thumb-1920-170799.jpg" sx={{ width: 156, height: 156 }} />
        <ul>
          <li>Location: {data?.user.location || 'N/A'}</li>
          <li>Member Since: {data?.user.createdAt}</li>
        </ul>
        </div>
      
        <div className="profileDogs">

            {loading ? (
              <React.Fragment></React.Fragment>
            ) : (
              profileDogs.map((dog) => {
                return (
                  <div key={dog._id} container className = "dogCard">
                          <img class="dogImage" src={dog.photo[0].small} alt={dog.name} />
                          <h2>{dog.name}</h2>
                          <p>{dog.breed.primary}</p>
                          <p>
                            {dog.size} | {dog.gender} | {dog.age}
                          </p>
                          </div>
                );
              })
            )}
            
          <Link to="/likes" underline="none"><Button variant = "contained">View all your liked dogs</Button></Link>
          

      </div>
      </div>);
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
