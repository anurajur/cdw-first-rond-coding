import React from "react";
import MemberCard from "./MemberCard";

const TeamMembersList = ({ members }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ml-10 mr-10">
    {members.map((member, index) => (
      <MemberCard key={index} member={member} />
    ))}
  </div>
);

export default TeamMembersList;
