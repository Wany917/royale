
export const hours = [
    '12a', '1a', '2a', '3a', '4a', '5a', '6a',
    '7a', '8a', '9a', '10a', '11a',
    '12p', '1p', '2p', '3p', '4p', '5p',
    '6p', '7p', '8p', '9p', '10p', '11p'
  ];
  
  export const days = [
    'Saturday', 'Friday', 'Thursday',
    'Wednesday', 'Tuesday', 'Monday', 'Sunday'
  ];
  
  export const mockStats = {
    totalAttacks: {
      value: 1458,
      trend: { value: 12.5, isUpward: true }
    },
    activeAttacks: {
      value: 23,
      trend: { value: 5.2, isUpward: true }
    },
    successRate: {
      value: "94.8%",
      trend: { value: 2.1, isUpward: true }
    },
    totalRequests: {
      value: 2847392,
      trend: { value: 8.3, isUpward: false }
    }
  };
  
  export const mockTickets = [
    {
      id: 1,
      title: "API Integration Issue",
      status: "open",
      priority: "high",
      created: "2024-02-20T10:30:00"
    },
    {
      id: 2,
      title: "Stresser Configuration",
      status: "pending",
      priority: "medium",
      created: "2024-02-19T15:45:00"
    }
  ];
  
  // Generate mock data for the heatmap
  export const mockAttackData = Array(7 * 24)
    .fill(0)
    .map((_, index) => {
      const day = Math.floor(index / 24);
      const hour = index % 24;
      const value = Math.floor(Math.random() * 10);
      return [hour, day, value];
    });