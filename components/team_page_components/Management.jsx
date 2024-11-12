"use client";
import { useEffect, useState } from "react";
import TeamMemberCard from "./TeamMemberCard";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import NoDataMessage from "@components/admin_components/NoDataMessage";
import Image from "next/image";
import { assets } from "@assets/assets";
import TeamCardSkeleton from "@components/skeletons/TeamCardSkeleton";

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
        <div className="grid grid-cols-auto-fill-280 gap-7 h-full">
          <TeamCardSkeleton cards={5} />
        </div>
      ) : !management.length ? (
        <NoDataMessage message={"No Management Team Member yet"} />
      ) : (
        <div className="grid grid-cols-auto-fill-280 gap-7 h-full">
          {management.map((member, index) => (
            <div key={index}>
              <TeamMemberCard
                img={member.img}
                name={member.name}
                job_title={member.role}
                desc={member.desc}
              />
            </div>
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
