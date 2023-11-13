const APPETIZER = Object.freeze({
  mushroomSoup: 6000,
  tapas: 5500,
  caesarSalad: 8000,
});

const MAIN = Object.freeze({
  tBoneSteak: 55000,
  barbecueRibs: 54000,
  seafoodPasta: 35000,
  christmasPasta: 25000,
});

const DESSERT = Object.freeze({
  chocolateCake: 15000,
  iceCream: 5000,
});

const BEVERAGE = Object.freeze({
  zeroCola: 3000,
  redWine: 60000,
  champagne: 25000,
});

export const MENU = Object.freeze({
  appetizer: APPETIZER,
  main: MAIN,
  dessert: DESSERT,
  beverage: BEVERAGE,
});

export const KOREAN_MENU = Object.freeze({
  mushroomSoup: '양송이수프',
  tapas: '타파스',
  caesarSalad: '시저샐러드',
  tBoneSteak: '티본스테이크',
  barbecueRibs: '바비큐립',
  seafoodPasta: '해산물파스타',
  christmasPasta: '크리스마스파스타',
  chocolateCake: '초코케이크',
  iceCream: '아이스크림',
  zeroCola: '제로콜라',
  redWine: '레드와인',
  champagne: '샴페인',
});

export const MIN_ORDER_NUMBER = 1;
export const MAX_ORDER_NUMBER = 20;

export const NO_PRICE = 0;
