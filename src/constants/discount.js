import { THIS_YEAR } from './date';

export const NO_DISCOUNT = 0;
export const YEAR_AMOUNT = THIS_YEAR;
export const SPECIAL_AMOUNT = 1000;
export const D_DAY_AMOUNT = Object.freeze({
  startAmount: 1000,
  increaseAmount: 100,
});

export const SPECIAL_DAY = [3, 10, 17, 24, 25, 31];
export const CHRISTMAS_DAY = Object.freeze({
  startDate: 1,
  endDate: 25,
});

export const DISCOUNT_TYPE = {
  dessert: 'dessert',
  main: 'main',
};
