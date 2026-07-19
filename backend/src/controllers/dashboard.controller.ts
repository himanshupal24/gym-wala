import { Request, Response } from 'express';

// Mock data generator for initial dashboard
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // In a real scenario, this would aggregate data from MongoDB (Gyms, Subscriptions, Members)
    const stats = {
      totalGyms: 1284,
      activeMembers: 84200,
      pendingApprovals: 44,
      monthlyRevenue: 124000,
      platformHealth: 99.9,
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRevenueChart = async (req: Request, res: Response) => {
  try {
    const data = [
      { name: 'Jan', revenue: 4000 },
      { name: 'Feb', revenue: 3000 },
      { name: 'Mar', revenue: 5000 },
      { name: 'Apr', revenue: 4500 },
      { name: 'May', revenue: 6000 },
      { name: 'Jun', revenue: 7000 },
      { name: 'Jul', revenue: 8000 },
      { name: 'Aug', revenue: 7500 },
      { name: 'Sep', revenue: 8500 },
      { name: 'Oct', revenue: 9000 },
      { name: 'Nov', revenue: 9500 },
      { name: 'Dec', revenue: 10500 },
    ];
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getGymGrowthChart = async (req: Request, res: Response) => {
  try {
    const data = [
      { name: 'Jan', gyms: 10 },
      { name: 'Feb', gyms: 25 },
      { name: 'Mar', gyms: 40 },
      { name: 'Apr', gyms: 35 },
      { name: 'May', gyms: 60 },
      { name: 'Jun', gyms: 80 },
    ];
    res.status(200).json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
