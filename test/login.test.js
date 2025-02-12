import { Browser, Builder } from "selenium-webdriver";
import { expect } from "chai";
import { Login } from "../pages/login.js";

describe("Saucedemo - Login", function () {
  let driver;
  /** @type {Login} */
  let loginPage;

  beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    loginPage = new Login(driver);
    //1. Otvori web stranicu https://www.saucedemo.com/ u maksimiziranom prozoru
    await loginPage.goTo();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Test 1 - Prijava bez unosa kredencijala", async function () {
    //2. Klikni "Login" dugme bez unosa vrijednosti u "Username" i "Password" polje
    await loginPage.login();

    //3. Verifikuj da je error ikonica prikazana u "Username" polju
    expect(await loginPage.isUsernameErrorIconDisplayed()).to.be.true;

    //4. Verifikuj da je error ikonica prikazana u "Password" polju
    expect(await loginPage.isPasswordErrorIconDisplayed()).to.be.true;

    //5.Verifikuj da je sljedeća error poruka prikazana ispod "Password" polja: "Epic sadface: Username is required"
    expect(await loginPage.getErrorMessageText()).to.equal(
      "Epic sadface: Username is required"
    );

    //6. Zatvori error poruku klikom na ikonicu u gornjem desnom uglu poruke
    await loginPage.closeErrorMessage();

    //7. Verifikuj da je error poruka nestala
    expect(await loginPage.hasErrorMessageDisappeared()).to.be.true;
  });

  it("Test 2 - Prijava koristenjem pogresne sifre", async function () {
    //Unesi ispod navedene vrijednosti u "Username" i "Password" polje:
    //Username: standard_user
    //Password: pogresnaSifra
    //3. Klikni "Login" dugme
    await loginPage.login("standard_user", "pogresnaSifra");

    //4. Verifikuj da je error ikonica prikazana u "Username" polju
    expect(await loginPage.isUsernameErrorIconDisplayed()).to.be.true;

    //6. Verifikuj da je error ikonica prikazana u "Password" polju
    expect(await loginPage.isPasswordErrorIconDisplayed()).to.be.true;

    //7.Verifikuj da je sljedeca error poruka prikazana ispod "Password" polja: "Epic sadface: Username and password do not match any user in this service"
    expect(await loginPage.getErrorMessageText()).to.equal(
      "Epic sadface: Username and password do not match any user in this service"
    );

    //6. Zatvori error poruku klikom na ikonicu u gornjem desnom uglu poruke
    await loginPage.closeErrorMessage();

    //7. Verifikuj da je error poruka nestala
    expect(await loginPage.hasErrorMessageDisappeared()).to.be.true;
  });
});
