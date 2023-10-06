export const getLastYear = () => new Date(new Date().setFullYear(new Date().getFullYear() - 1));

export const formatDateForSupabase = (date: Date) => `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
