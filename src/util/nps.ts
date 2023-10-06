import {
  PROMOTERS_BAR_COLOR,
  PASSIVES_BAR_COLOR,
  DETRACTORS_BAR_COLOR,
} from '../config/constants'

export const calculateNps = (customerData: any) => {
  const total = customerData.promoters + customerData.passives + customerData.detractors;
  return 100 * ( customerData.promoters - customerData.detractors ) / total;
};

export const colorForClientScore = (score: number): string => {
  if (score == 10 || score == 9) return PROMOTERS_BAR_COLOR;
  if (score == 8 || score == 7) return PASSIVES_BAR_COLOR;
  return DETRACTORS_BAR_COLOR
};
