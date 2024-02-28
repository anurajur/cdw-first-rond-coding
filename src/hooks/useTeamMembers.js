import { useState, useEffect } from "react";

const useTeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = () => {
    fetch("https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098")
      .then((response) => response.json())
      .then((data) => {
        const _admins = data.filter((member) => member.role === "admin");
        const _members = data.filter((member) => member.role !== "admin");
        setAdmins(_admins);
        setMembers(_members);
        setTeamMembers(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  };

  return {
    teamMembers,
    admins,
    setAdmins,
    members,
    setMembers,
    loading,
  };
};

export default useTeamMembers;
