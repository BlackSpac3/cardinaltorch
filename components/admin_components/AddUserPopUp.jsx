import { useContext, useEffect, useRef, useState } from "react";

import { UserContext } from "../context/UserContext";
import { capitalize } from "../utils";

import axios from "axios";

const AddUserPopUp = ({ setAddUserPopUp }) => {
  const { url } = useContext(UserContext);

  return (
    <div className=" absolute bg-[#00000070] backdrop-filter backdrop-blur-sm w-full h-full z-20"></div>
  );
};
export default AddUserPopUp;
