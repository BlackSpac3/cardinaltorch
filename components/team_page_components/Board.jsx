"use client";
import { useEffect, useState } from "react";
import TeamMemberCard from "./TeamMemberCard.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import NoDataMessage from "@components/admin_components/NoDataMessage.jsx";

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
        <p>Loading...</p>
      ) : !boardMembers.length ? (
        <NoDataMessage message={"No Board of Directors yet"} />
      ) : (
        <div className="flex flex-col items-center gap-10">
          <div className="grid grid-cols-4 phone:grid-cols-1 gap-7">
            {boardMembers.map((member, index) => {
              return (
                <motion.div
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  key={index}
                >
                  <TeamMemberCard
                    img={member.img}
                    name={member.name}
                    job_title={member.role}
                    desc={member.desc}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Board;
