// Team.js
import React, { useEffect, useState } from "react";
import TeamMembersList from "./TeamMembersList";
import useTeamMembers from "../hooks/useTeamMembers";
import { FaSearch, FaPlus } from "react-icons/fa";

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { teamMembers, admins, setAdmins, members, setMembers, loading } =
    useTeamMembers();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  //search functionality(search with name or email)
  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchQuery(value);

    const filterCondition = (member) =>
      (member.first_name && member.first_name.toLowerCase().includes(value)) ||
      (member.email && member.email.toLowerCase().includes(value));

    const filteredTeamMembers = teamMembers.filter(filterCondition);
    const filteredAdmins = filteredTeamMembers.filter(
      (member) => member.role === "admin"
    );
    const filteredMembers = filteredTeamMembers.filter(
      (member) => member.role !== "admin"
    );

    setAdmins(
      value
        ? filteredAdmins
        : teamMembers.filter((member) => member.role === "admin")
    );
    setMembers(
      value
        ? filteredMembers
        : teamMembers.filter((member) => member.role !== "admin")
    );
  };

  if (loading) {
    return (
      <div className="text-black text-6xl font-medium ml-12">Loading...</div>
    );
  }

  return (
    <div className="font-poppins h-screen">
      <div className="mb-4 bg-[#7596e0] p-6 flex justify-between items-center">
        <h1 className="text-white text-4xl font-medium ml-12">Team</h1>
        <div className="relative">
          <FaSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            className="block w-[500px] pl-10 pr-2 py-2 border-gray-300 rounded-full shadow-sm"
            placeholder="Search team members"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <h2 className="text-4xl font-normal mt-4 mb-4 text-left ml-20 mr-10 text-gray-400">
        Administrators
      </h2>
      <div className="overflow-y-auto h-[37%]">
        <TeamMembersList members={admins} />
      </div>
      <hr className="mt-10 mb-10 border-t border-gray-300 my-4" />

      <h2 className="text-4xl font-normal mb-4 text-left ml-20 mr-10 text-gray-400">
        Members
      </h2>
      <div className="overflow-y-auto h-[29.666%]">
        <TeamMembersList members={members} />
      </div>
      <button
        className="fixed bottom-8 right-8 bg-[#7596e0] text-white p-6 rounded-full shadow-lg"
        onClick={() => {
          console.log("Add button clicked!");
        }}
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default Team;
