import { getStatsService } from "../services/adminService.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await getStatsService();
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};
