"use client";

import PlayerInfo from "@/components/PlayerInfo";
import Link from "next/link";
import { Box, Grid } from "@mui/material";

const PlayersList = ({ players }) => {
  return (
    <div>
      <h1>Players List</h1>
      {/* {error && <p>Error fetching data</p>} */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Grid container spacing={2}>
          {players &&
            players.map((player) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
                <Link href={`player/${player.id}`}>
                  <PlayerInfo player={player} />
                </Link>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default PlayersList;
