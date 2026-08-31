export const formatDate = (date: string) => new Date(date).toLocaleDateString('sv-SE');

export const isValidDate = (date: string) => !Number.isNaN(Date.parse(date));

export const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};
