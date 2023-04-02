import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJoin } from "../redux/join";

const PlayerModal = ({ setToggle, playerId }) => {
  const [teamId, setTeamId] = useState();
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams); // Teams from Redux Store

  // Close Player Modal
  const closeModal = () => {
    setToggle(false);
  };

  // Assign a player to a Team by creating a new Join State - similar to Join table in One to Many relationships
  const assign = (playerId, teamId) => {
    if (teamId) {
      teamId = parseInt(teamId);
    } else {
      teamId = teams[0].id;
    }
    const newJoin = {
      playerId,
      teamId,
    };
    dispatch(createJoin(newJoin));
    closeModal();
  };

  // update the state of teamId when selecting in a dropdown
  const onTeamId = (value) => {
    setTeamId(value);
  };

  return (
    <div className="bg-black/40 p-0 m-0 fixed top-0 left-0 w-full h-full">
      <div className="modal">
        {teams.length > 0 ? (
          <div>
            <select className="p-2" onChange={(e) => onTeamId(e.target.value)}>
              {teams.map((team) => (
                <option value={team.id} key={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            <button
              className="text-2xl ml-16"
              type="button"
              onClick={closeModal}
            >
              &times;
            </button>
            <br />
            <br />
            <button
              className="w-full border-2 border-gray-200"
              type="button"
              onClick={() => assign(playerId, teamId)}
            >
              Assign
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <p className="m-auto text-center text-md text-red-400">
              No teams to assign. <br /> Please create your Team first.
            </p>
            <button className="text-2xl" type="button" onClick={closeModal}>
              &times;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerModal;
