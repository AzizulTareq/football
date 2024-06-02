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
        <Grid item xs={12} md={6}>
          <Image
            src={data?.details?.player?.imageLarge}
            alt="Player image"
            height={400}
            width={400}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4">{data?.details?.player?.name}</Typography>
          <Typography sx={{ fontSize: "14px" }}>
            {data?.share?.description}
          </Typography>
          <Typography sx={{ fontSize: "14px", display: "flex" }}>
            <span style={{ fontWeight: "700", paddingRight: "3px" }}>From</span>
            {data?.details?.player?.nationalities[0]?.name}{" "}
          </Typography>
          <Typography sx={{ fontSize: "14px", display: "flex" }}>
            <span style={{ fontWeight: "700", paddingRight: "3px" }}>
              Market value
            </span>
            {data?.details?.player?.marketValue?.currency}{" "}
            {data?.details?.player?.marketValue?.value}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerDetails;
