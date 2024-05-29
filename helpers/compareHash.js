import bcrypt from "bcrypt";

const compareHash = async (password, hashPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error;
  }
};

export default compareHash;