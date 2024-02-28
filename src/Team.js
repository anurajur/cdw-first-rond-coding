import React, { useEffect, useState } from "react";

const LoadingSpinner = () => <div>Loading...</div>;

const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    className="block w-1/3 p-2 border-gray-300 rounded-md shadow-sm"
    placeholder="Search team members"
    value={value}
    onChange={onChange}
  />
);

const MemberCard = ({ member }) => (
  <div className="flex overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out p-5 m-2">
    <img
      src={member.img}
      alt={member.name}
      className="w-20 h-20 rounded-full"
    />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{member.first_name}</div>
      <p className="text-gray-700 text-base">{member.email}</p>
    </div>
  </div>
);

const MemberList = ({ members }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10 mr-10">
    {members.map((member, index) => (
      <MemberCard key={index} member={member} />
    ))}
  </div>
);

const TeamSection = ({ title, members }) => (
  <div className="mb-8">
    <h2 className="text-4xl font-bold mb-4 text-left ml-20 mr-10 text-gray-400">
      {title}
    </h2>
    <MemberList members={members} />
  </div>
);

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098")
      .then((response) => response.json())
      .then((data) => {
        const admins = data.filter((member) => member.role === "admin");
        const members = data.filter((member) => member.role !== "admin");
        setTeamMembers(data || []);
        setAdmins(admins);
        setMembers(members);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.trim().toLowerCase();
    setSearchQuery(value);

    const filterCondition = (member) =>
      (member.first_name && member.first_name.toLowerCase().includes(value)) ||
      (member.email && member.email.toLowerCase().includes(value));

    const filteredTeamMembers = teamMembers.filter(filterCondition);

    setAdmins(
      value
        ? filteredTeamMembers.filter((member) => member.role === "admin")
        : teamMembers.filter((member) => member.role === "admin")
    );
    setMembers(
      value
        ? filteredTeamMembers.filter((member) => member.role !== "admin")
        : teamMembers.filter((member) => member.role !== "admin")
    );
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100">
      <div className="mb-4 bg-indigo-400 p-4 flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold">Team</h1>
        <SearchInput value={searchQuery} onChange={handleSearch} />
      </div>
      <TeamSection title="Administrators" members={admins} />
      <hr className="m-12 border-t border-gray-300 my-4" />
      <TeamSection title="Members" members={members} />
    </div>
  );
};

export default Team;
