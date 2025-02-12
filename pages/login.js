import { By } from "selenium-webdriver";
import {
  openUrl,
  elementToBeClickable,
  getElementText,
  elementToBeStale,
  clickElement,
  fillElement,
} from "../utils/helper.js";

class Login {
  constructor(driver) {
    this.driver = driver;
    this.usernameLocator = By.id("user-name");
    this.passwordLocator = By.id("password");
    this.loginLocator = By.id("login-button");
    this.loginLogoLocator = By.className("login_logo");
    this.usernameErrorIconLocator = By.css("#user-name + svg.error_icon");
    this.passwordErrorIconLocator = By.css("#password + svg.error_icon");
    this.errorMessageLocator = By.css("[data-test='error']");
    this.errorButtonLocator = By.className("error-button");
    this.errorMessageElement = null;
  }

  async goTo() {
    await openUrl(this.driver, "https://www.saucedemo.com");
  }

  async isAt() {
    if (
      (await getElementText(this.driver, this.loginLogoLocator)) === "Swag Labs"
    ) {
      return true;
    } else {
      return false;
    }
  }

  async fillInUsernameField(username) {
    await fillElement(this.driver, this.usernameLocator, username);
  }

  async fillInPasswordField(password) {
    await fillElement(this.driver, this.passwordLocator, password);
  }

  async submitLoginForm() {
    await clickElement(this.driver, this.loginLocator);
  }

  async login(username = "", password = "") {
    if (username) {
      await this.fillInUsernameField(username);
    }
    if (password) {
      await this.fillInPasswordField(password);
    }
    await this.submitLoginForm();
  }

  async isUsernameErrorIconDisplayed() {
    try {
      await elementToBeClickable(this.driver, this.usernameErrorIconLocator);
      return true;
    } catch (error) {
      return false;
    }
  }

  async isPasswordErrorIconDisplayed() {
    try {
      await elementToBeClickable(this.driver, this.passwordErrorIconLocator);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getErrorMessageText() {
    this.errorMessageElement = await elementToBeClickable(
      this.driver,
      this.errorMessageLocator
    );
    return await this.errorMessageElement.getText();
  }

  async closeErrorMessage() {
    await clickElement(this.driver, this.errorButtonLocator);
  }

  async hasErrorMessageDisappeared() {
    try {
      await elementToBeStale(this.driver, this.errorMessageElement);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export { Login };
