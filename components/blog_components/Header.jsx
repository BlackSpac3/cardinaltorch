import { motion } from "framer-motion";
import { styles } from "../../utils/styles";

const Header = () => {
  return (
    <div className="mb-20">
      <div
        id="about-header"
        className=""
      >
        <motion.div className="">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              ease: "easeOut",
              type: "spring",
            }}
            id="header-contents"
            className="px-16 phone:p-3  font-['Montserrat']  flex justify-center items-center bg-header bg-center bg-no-repeat bg-cover h-[50vh] phone:h-[30vh] "
          >
            <h2
              id="header-title"
              className="font-['Montserrat'] font-medium text-[25px] text-white "
            >
              Blog<span className="text-secondary">s</span>
            </h2>

          </motion.div>
        </motion.div>
      </div>

    </div>
  );
};
export default Header;
