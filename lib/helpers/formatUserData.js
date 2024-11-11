const formatUserData = (user) => {
  return {
    name: `${user.personal_info.first_name} ${user.personal_info.last_name}`,
    user_id: user._id,
    profile_img: user.personal_info.profile_img,
    first_name: user.personal_info.first_name,
    last_name: user.personal_info.last_name,
    email: user.personal_info.email,
    bio: user.personal_info.bio,
    // email_validation_status: user.account_info.email_validation_status,
    total_posts: user.account_info.total_posts,
    total_reads: user.account_info.total_reads,
    total_drafts: user.account_info.total_drafts,
    total_images: user.account_info.total_images,
    default_pass: user.account_info.default_pass,
    user_type: user.account_info.type,
    // blogs: user.blogs,
  };
};

export default formatUserData;
