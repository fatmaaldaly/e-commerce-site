import { getStats } from "../models/adminModel.js";

export const getStatsService = async () => {
  return await getStats();
};
