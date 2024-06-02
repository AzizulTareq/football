import PlayerDetails from "@/components/modules/PlayerDetails";
import React from "react";
import { fetchPlayerDetails } from "@/actions/footballApi";


const index = async ({ params }) => {
  const playerDetails = await fetchPlayerDetails(params.id);
  return (
    <div>
      <PlayerDetails playerDetails={playerDetails} />
    </div>
  );
};

export default index;

export const dynamic = "force-static";
