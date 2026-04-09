export const isAdmin = (role?: string[]): boolean => {
  if (!role) return false;
  return role.includes('admin');
};
