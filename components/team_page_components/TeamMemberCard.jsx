const TeamMemberCard = ({ img, name, job_title, desc }) => {
  return (
    <div className=" border rounded-md w-full h-full bg-white">
      <div>
        <img
          className="aspect-[5/4] w-[100%] rounded-t-md object-cover object-top"
          src={img}
          alt={name}
        />
        <div className="flex flex-col gap-2 p-3 ">
          <div className="flex flex-col">
            <h1 className="font-medium text-gray-500 capitalize">{name}</h1>
            <p className="text-primary text-sm line-clamp-1 capitalize">
              {job_title}
            </p>
          </div>
          <p className="text-gray-500 text-sm text-jusify font-light line-clamp-6">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};
export default TeamMemberCard;
