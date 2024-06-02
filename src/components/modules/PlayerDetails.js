"use client";
import React from "react";
import { Container, Grid, Typography, CircularProgress } from "@mui/material";
import Image from "next/image";

const PlayerDetails = ({ playerDetails }) => {
  console.log(playerDetails);
  if (!playerDetails) {
    return <CircularProgress />;
  }

  const { data } = playerDetails;
  console.log(data);

  return (
    <Container>
      <Grid container spacing={4} justify="center">
        <Grid item xs={12} sm={6}>
          <Image
            src={data?.details?.player?.imageLarge}
            alt="Player image"
            height={400}
            width={400}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h3">{data?.details?.player?.name}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerDetails;
