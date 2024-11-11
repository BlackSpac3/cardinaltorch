"use client";
import { useEffect, useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import NoDataMessage from "@components/admin_components/NoDataMessage";
import Image from "next/image";
import { assets } from "@assets/assets";

const Management = () => {
  const [management, setManagement] = useState(null);
  const fetchManagementTeam = async () => {
    setManagement(null);
    try {
      const res = await axios.post("/api/employees/list", {
        dept: "management",
      });
      setManagement(res.data.data);
    } catch (error) {
      toast.error("Error connecting to server");
    }
  };
  useEffect(() => {
    fetchManagementTeam();
  }, []);
  return (
    <section className="relative">
      {!management ? (
        <p>Loading... </p>
      ) : !management.length ? (
        <NoDataMessage message={"No Management Team Member yet"} />
      ) : (
        <div className="grid grid-cols-4 phone:grid-cols-1 gap-7 h-full">
          {management.map((member, index) => (
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              initial={{ opacity: 0, x: 100 }}
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
          ))}
        </div>
      )}
      <Image
        src={assets.bean_bg_illustration}
        className=" absolute w-64 h-44 -left-48 -bottom-20 -z-50 opacity-40 phone:w-36 phone:h-28"
        alt=""
        srcset=""
        priority={true}
      />
    </section>
  );
};

export default Management;
