import { fetchPlayerList } from "@/actions/footballApi"
import CreateTeam from "@/components/modules/CreateTeam";

const createTeam = async () => {
    const players = await fetchPlayerList();
    return (
        <div>
           <CreateTeam players={players.data} />
        </div>
    )
} 

export default createTeam