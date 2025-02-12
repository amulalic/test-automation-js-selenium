import { By } from "selenium-webdriver";
import {
  elementToBeClickable,
  getElementText,
  clickElement,
} from "../utils/helper.js";

class CheckoutOverview {
  constructor(driver) {
    this.driver = driver;
    this.checkoutOverviewTitleLocator = By.className("title");
    this.finishLocator = By.id("finish");
    this.productConfirmed = null;
  }

  async isAt() {
    if (
      (await getElementText(this.driver, this.checkoutOverviewTitleLocator)) ===
      "Checkout: Overview"
    ) {
      return true;
    } else {
      return false;
    }
  }

  async isProductConfirmed(name) {
    try {
      this.productConfirmed = By.xpath(
        "//div[@class='inventory_item_name' and contains(.,'" + name + "')]"
      );
      await elementToBeClickable(this.driver, this.productConfirmed);
      return true;
    } catch (error) {
      return false;
    }
  }

  async finish() {
    await clickElement(this.driver, this.finishLocator);
  }
}

export { CheckoutOverview };
