import { By } from "selenium-webdriver";
import { getElementText } from "../utils/helper.js";

class CheckoutComplete {
  constructor(driver) {
    this.driver = driver;
    this.checkoutCompleteTitleLocator = By.className("title");
  }

  async isAt() {
    if (
      (await getElementText(this.driver, this.checkoutCompleteTitleLocator)) ===
      "Checkout: Complete!"
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export { CheckoutComplete };
