import { MENU, NO_PRICE } from '../constants/menu';

class Menu {
  getMenuType(menu) {
    const menuTypes = Object.keys(MENU);

    return menuTypes.find((menuType) => {
      const menus = Object.keys(MENU[menuType]);
      return menus.includes(menu);
    });
  }

  getMenuPrice(menu) {
    const menuType = this.getMenuType(menu);

    if (MENU[menuType]) {
      return MENU[menuType][menu];
    }

    return NO_PRICE;
  }
}

export default Menu;
