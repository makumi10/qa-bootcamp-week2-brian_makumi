type UserProfile = {
  id: number;
  username: string;
  settings?: {
    notifications?: boolean;
  };
};

const userWithNotifications: UserProfile = {
  id: 1,
  username: "brian",
  settings: { notifications: true },
};

const userWithoutSettings: UserProfile = {
  id: 2,
  username: "jackline",
};

const userWithEmptySettings: UserProfile = {
  id: 3,
  username: "sarah",
  settings: {},
};

function isNotified(user: UserProfile): boolean {
  const notifications = user.settings?.notifications;
  if (notifications) {
    return notifications;
  }
  return false;
}

console.log(userWithNotifications.username, isNotified(userWithNotifications));
console.log(userWithoutSettings.username, isNotified(userWithoutSettings));
console.log(userWithEmptySettings.username, isNotified(userWithEmptySettings));