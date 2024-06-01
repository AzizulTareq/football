import PlayerDetails from "@/components/PlayerDetails";
import React from "react";

const fetchPlayerDetails = async (id) => {
  const url = `https://transfermarkt-db.p.rapidapi.com/v1/players/info?locale=DE&player_id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
      "x-rapidapi-host": "transfermarkt-db.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};

const index = async ({ params }) => {
  const playerDetails = await fetchPlayerDetails(params.id);
  return (
    <div>
      <PlayerDetails playerDetails={playerDetails} />
    </div>
  );
};

export default index;
