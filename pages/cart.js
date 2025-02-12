import { By } from "selenium-webdriver";
import {
  elementToBeClickable,
  getElementText,
  clickElement,
} from "../utils/helper.js";

class Cart {
  constructor(driver) {
    this.driver = driver;
    this.cartTitleLocator = By.className("title");
    this.checkoutLocator = By.id("checkout");
    this.productInCart = null;
  }

  async isAt() {
    if (
      (await getElementText(this.driver, this.cartTitleLocator)) === "Your Cart"
    ) {
      return true;
    } else {
      return false;
    }
  }

  async isProductInCart(name) {
    try {
      this.productInCart = By.xpath(
        "//div[@class='inventory_item_name' and contains(.,'" + name + "')]"
      );
      await elementToBeClickable(this.driver, this.productInCart);
      return true;
    } catch (error) {
      return false;
    }
  }

  async checkout() {
    await clickElement(this.driver, this.checkoutLocator);
  }
}

export { Cart };
