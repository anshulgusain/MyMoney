import React, { useEffect, useState } from 'react';

const UserCard = ({ name, email, id }) => {




  return (
    <div className="w-120 h-58 bg-[rgb(66,94,189)] text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Details Card</div>
        <div className="text-xs">VISA</div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide">Name</div>
        <div className="text-md font-bold">{name}</div>
      </div>

      <div>
        <div className="text-xs uppercase tracking-wide">Email</div>
        <div className="text-sm truncate">{email}</div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <div className="text-xs uppercase tracking-wide">Account Id</div>
          <div className="text-lg font-bold">${id}</div>
        </div>
       
      </div>
    </div>
  );
};

export default UserCard;
