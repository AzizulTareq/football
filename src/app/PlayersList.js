"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import PlayerInfo from "@/components/PlayerInfo";

const PlayersList = () => {
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        url: "https://transfermarkt-db.p.rapidapi.com/v1/clubs/squad",
        params: {
          locale: "DE",
          season_id: "2022",
          club_id: "12321",
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "transfermarkt-db.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setPlayers(response.data.data);
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    fetchData();
  }, []);

  console.log(players);

  return (
    <div>
      <h1>Players List</h1>
      {error && <p>Error fetching data</p>}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {players &&
            players.map((player) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
                <PlayerInfo player={player} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default PlayersList;
