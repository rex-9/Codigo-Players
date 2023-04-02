import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam } from "../redux/team";

const TeamCreateModal = ({ setToggle }) => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams); // Joins from Redux Store

  // States for the Fields of the Team
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");

  // Update states on change with inputs
  const onName = (e) => {
    setName(e.target.value);
    setError("");
  };

  const onRegion = (e) => {
    setRegion(e.target.value);
    setError("");
  };

  const onCountry = (e) => {
    setCountry(e.target.value);
    setError("");
  };

  const closeModal = () => {
    setToggle(false);
    setError("");
  };

  const create = () => {
    if (name !== "" && region !== "" && country !== "") {
      dispatch(
        createTeam({
          id: teams.length + 1,
          name,
          region,
          country,
        })
      );
      closeModal();
    } else {
      setError("Require all Inputs");
    }
  };

  return (
    <div className="bg-black/40 p-0 m-0 fixed top-0 left-0 w-full h-full">
      <div className="modal">
        <button
          className="text-2xl ml-16 absolute right-4 top-3"
          type="button"
          onClick={closeModal}
        >
          &times;
        </button>
        <div className="pt-2">
          <label htmlFor="name">Name</label>
          <span className="text-red-700">*</span>
        </div>
        <input
          required
          className="border-2 border-gray-200 px-2 rounded-lg mt-2"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={onName}
        />
        {name ? <p /> : <p className="text-red-500">Name is required</p>}
        <div className="pt-2">
          <label htmlFor="region">Region</label>
          <span className="text-red-700">*</span>
        </div>
        <input
          required
          className="border-2 border-gray-200 px-2 rounded-lg mt-2"
          type="text"
          id="country"
          name="country"
          placeholder="Country"
          value={region}
          onChange={onRegion}
        />
        {region ? <p /> : <p className="text-red-500">Region is required</p>}
        <div className="pt-2">
          <label htmlFor="country">Country</label>
          <span className="text-red-700">*</span>
        </div>
        <input
          required
          className="border-2 border-gray-200 px-2 rounded-lg mt-2"
          type="text"
          id="country"
          name="country"
          placeholder="Country"
          value={country}
          onChange={onCountry}
        />
        {country ? <p /> : <p className="text-red-500">Country is required</p>}
        <div className="pt-2">
          <label htmlFor="player_count">Player Count</label>
        </div>
        <input
          required
          className="border-2 border-gray-200 px-2 rounded-lg mt-2"
          type="number"
          disabled
          id="country"
          name="country"
          value={0}
        />
        <p className="text-red-500 mt-2">{error}</p>
        <button
          className="w-full mt-4 border-2 border-green-200"
          type="button"
          onClick={create}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TeamCreateModal;
