import axios from "axios";

export async function getUserProfile(username: string) {
  const response = await axios.get<UserProfile>(
    `https://localhost:8080/api/v1/users/${username}`
  );
  return response.data;
}

export interface UserProfile {
  
}