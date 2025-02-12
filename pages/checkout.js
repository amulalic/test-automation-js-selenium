import { By } from "selenium-webdriver";
import { getElementText, clickElement, fillElement } from "../utils/helper.js";

class Checkout {
  constructor(driver) {
    this.driver = driver;
    this.checkoutTitleLocator = By.className("title");
    this.firstNameLocator = By.id("first-name");
    this.lastNameLocator = By.id("last-name");
    this.zipCodeLocator = By.id("postal-code");
    this.continueLocator = By.id("continue");
  }

  async isAt() {
    if (
      (await getElementText(this.driver, this.checkoutTitleLocator)) ===
      "Checkout: Your Information"
    ) {
      return true;
    } else {
      return false;
    }
  }

  async fill(firstName, lastName, zipCode) {
    await fillElement(this.driver, this.firstNameLocator, firstName);
    await fillElement(this.driver, this.lastNameLocator, lastName);
    await fillElement(this.driver, this.zipCodeLocator, zipCode);
  }

  async proceed() {
    await clickElement(this.driver, this.continueLocator);
  }
}

export { Checkout };
