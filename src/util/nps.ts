export const calculateNps = (customerData: any) => {
  const total = customerData.promoters + customerData.passives + customerData.detractors;
  return 100 * ( customerData.promoters - customerData.detractors ) / total;
};
