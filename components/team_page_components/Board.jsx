"use client";
import { useEffect, useState } from "react";
import TeamMemberCard from "./TeamMemberCard.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import NoDataMessage from "@components/admin_components/NoDataMessage.jsx";
import TeamCardSkeleton from "@components/skeletons/TeamCardSkeleton.jsx";

const Board = () => {
  const [boardMembers, setBoardMembers] = useState(null);

  const fetchBoardMembers = async () => {
    setBoardMembers(null);
    try {
      const res = await axios.post("/api/employees/list", {
        dept: "board",
      });
      setBoardMembers(res.data.data);
    } catch (error) {
      toast.error("Error connecting to server");
    }
  };

  useEffect(() => {
    fetchBoardMembers();
  }, []);
  return (
    <section className="">
      {!boardMembers ? (
        <div className="grid grid-cols-auto-fill-280 gap-7">
          <TeamCardSkeleton cards={5} />
        </div>
      ) : !boardMembers.length ? (
        <NoDataMessage message={"No Board of Directors yet"} />
      ) : (
        <div className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-auto-fill-280 gap-7">
            {boardMembers.map((member, index) => {
              return (
                <div key={index}>
                  <TeamMemberCard
                    img={member.img}
                    name={member.name}
                    job_title={member.role}
                    desc={member.desc}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Board;
