import React from "react";

const MemberCard = ({ member }) => (
  <div className="flex overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300 ease-in-out p-2 m-4 hover:scale-105">
    <img
      src={member.img}
      alt={member.name}
      className="w-20 h-20 rounded-full ml-6"
    />
    <div className="px-6 py-4">
      <div className="text-gray-600 font-medium text-2xl text-left">
        {member.first_name}
      </div>
      <p className="text-gray-400 text-base text-left text-[15px]">
        {member.email}
      </p>
    </div>
  </div>
);

export default MemberCard;
