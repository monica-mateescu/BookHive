export const isPopulatedUser = (
  value: string | { id: string; firstName: string; lastName: string },
): value is { id: string; firstName: string; lastName: string } =>
  typeof value !== "string";
