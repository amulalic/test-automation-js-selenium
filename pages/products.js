import { By } from "selenium-webdriver";
import { getElementText, clickElement } from "../utils/helper.js";

class Products {
  constructor(driver) {
    this.driver = driver;
    this.productsTitleLocator = By.className("title");
    this.shoppingCartBadgeLocator = By.className("shopping_cart_badge");
    this.menuIconLocator = By.id("react-burger-menu-btn");
    this.logOutMenuItemLocator = By.id("logout_sidebar_link");
    this.cartLocator = By.className("shopping_cart_link");
    this.productLocator = null;
  }

  async isAt() {
    if (
      (await getElementText(this.driver, this.productsTitleLocator)) ===
      "Products"
    ) {
      return true;
    } else {
      return false;
    }
  }

  async addProduct(name) {
    this.productLocator = By.xpath(
      "//a[contains(.,'" +
        name +
        "')]/parent::div/parent::div[@class='inventory_item_description']//button[text()='Add to cart']"
    );
    await clickElement(this.driver, this.productLocator);
  }

  async openCart() {
    await clickElement(this.driver, this.cartLocator);
  }

  async getShoppingCartBadgeText() {
    return await getElementText(this.driver, this.shoppingCartBadgeLocator);
  }

  async logOut() {
    await clickElement(this.driver, this.menuIconLocator);
    await clickElement(this.driver, this.logOutMenuItemLocator);
  }
}

export { Products };
