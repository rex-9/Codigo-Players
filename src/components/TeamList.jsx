import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import edit from "../assets/edit.png";
import { removeJoins } from "../redux/join";
import { deleteTeam } from "../redux/team";
import TeamUpdateModal from "./TeamUpdateModal";

const TeamList = () => {
  const teams = useSelector((state) => state.teams); // Teams from Redux Store
  const joins = useSelector((state) => state.joins); // Joins from Redux Store
  const [toggle, setToggle] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(false);

  const dispatch = useDispatch();

  // Delete a Team
  const removeTeam = (id) => {
    dispatch(deleteTeam(id));
    dispatch(removeJoins(id));
  };

  const openTeamEditModal = (id) => {
    setToggle(true);
    setSelectedTeamId(id);
  };
  // Count players in a Specific Team
  const count = (id) => {
    const countedJoins = joins.filter((join) => join.teamId === id);
    let count = 0;
    if (countedJoins) {
      count = countedJoins.length;
    }
    return count;
  };

  return (
    <>
      <div className="w-[45vw]">
        <div className="flex justify-around w-full mb-4">
          <p className="text-2xl font-bold font-qs">Teams</p>
        </div>
        <div className="flex flex-wrap justify-center">
          {teams.length > 0 ? (
            teams.map((team) => (
              <div
                key={team.id}
                className="px-8 py-4 mb-3 mx-2 rounded-lg w-[40%] border-gray-200 border-2"
              >
                <div className="flex items-start">
                  <div className="w-full">
                    <div>Name: {team.name}</div>
                    <div>Players: {count(team.id)}</div>
                    <div>Region: {team.region}</div>
                    <div>Country: {team.country}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => openTeamEditModal(team.id)}
                  >
                    <img src={edit} className="w-6" alt="Edit Icon" />
                  </button>
                </div>

                <button
                  className="bg-red-500 hover:bg-red-300 text-md font-bold px-2 py-1 my-1 rounded-lg text-white w-full"
                  type="button"
                  onClick={() => removeTeam(team.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="m-auto text-center text-md text-red-400 mt-12">
              There is No team yet. <br />
              Create your first team now. 😉
            </p>
          )}
        </div>
        {toggle && (
          <TeamUpdateModal
            setToggle={setToggle}
            selectedTeamId={selectedTeamId}
          />
        )}
      </div>
    </>
  );
};
export default TeamList;
