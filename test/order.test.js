import { Browser, Builder } from "selenium-webdriver";
import { expect } from "chai";
import { Login } from "../pages/login.js";
import { Products } from "../pages/products.js";
import { Cart } from "../pages/cart.js";
import { Checkout } from "../pages/checkout.js";
import { CheckoutOverview } from "../pages/checkoutOverview.js";
import { CheckoutComplete } from "../pages/checkoutComplete.js";

describe("Saucedemo - Order", function () {
  let driver;
  /** @type {Login} */
  let loginPage;
  /** @type {Products} */
  let productsPage;
  /** @type {Cart} */
  let cartPage;
  /** @type {Checkout} */
  let checkoutPage;
  /** @type {CheckoutOverview} */
  let checkoutOverviewPage;
  /** @type {CheckoutComplete} */
  let checkoutComplete;

  beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    loginPage = new Login(driver);
    productsPage = new Products(driver);
    cartPage = new Cart(driver);
    checkoutPage = new Checkout(driver);
    checkoutOverviewPage = new CheckoutOverview(driver);
    checkoutComplete = new CheckoutComplete(driver);
    //1. Otvori web stranicu https://www.saucedemo.com/ u maksimiziranom prozoru
    await loginPage.goTo();
  });

  afterEach(async function () {
    await driver.quit();
  });

  it("Test 3 - Kupovina proizvoda", async function () {
    //2. Unesi ispod navedene vrijednosti u "Username" i "Password" polje:
    //Username: standard_user
    //Password: secret_sauce
    //3. Klikni "Login" dugme
    await loginPage.login("standard_user", "secret_sauce");

    //4. Verifikuj da se nalaziš na "Products" web stranici
    expect(await productsPage.isAt()).to.be.true;

    //5. Klikni "Add to cart" dugme za dva različita proizvoda (po ličnom izboru)
    await productsPage.addProduct("Sauce Labs Bike Light");
    await productsPage.addProduct("Sauce Labs Fleece Jacket");

    //6. Verifikuj da se pojavio bedž sa brojem dodatih proizvoda (2) na "Shopping Cart" ikonici u gornjem desnom uglu
    expect(await productsPage.getShoppingCartBadgeText()).to.equal("2");

    //7. Klikni "Shopping Cart" ikonicu u gornjem desnom uglu
    await productsPage.openCart();

    //8. Verifikuj da se nalaziš na "Your Cart" web stranici
    expect(await cartPage.isAt()).to.be.true;

    //9. Korištenjem imena prethodno dodanih proizvoda, verifikuj da se isti nalaze u košarici
    expect(await cartPage.isProductInCart("Sauce Labs Bike Light")).to.be.true;
    expect(await cartPage.isProductInCart("Sauce Labs Fleece Jacket")).to.be
      .true;

    //10. Klikni "Checkout" dugme
    await cartPage.checkout();

    //11. Verifikuj da se nalaziš na "Checkout: Your Information" web stranici
    expect(await checkoutPage.isAt()).to.be.true;

    //12. Unesi ispod navedene vrijednosti u "First Name", "Last Name" i "Zip/Postal Code" polje:
    //First Name: <vaše ime>
    //Last Name: <vaše prezime>
    //Zip/Postal Code: 71000
    await checkoutPage.fill("Ahmet", "Mulalic", "71000");

    //13. Klikni "Continue" dugme
    await checkoutPage.proceed();

    //14. Verifikuj da se nalaziš na "Checkout: Overview" web stranici
    expect(await checkoutOverviewPage.isAt()).to.be.true;

    //15. Korištenjem imena prethodno dodanih proizvoda, verifikuj da se isti nalaze na "Checkout: Overview" web stranici
    expect(
      await checkoutOverviewPage.isProductConfirmed("Sauce Labs Bike Light")
    ).to.be.true;
    expect(
      await checkoutOverviewPage.isProductConfirmed("Sauce Labs Fleece Jacket")
    ).to.be.true;

    //16. Klikni "Finish" dugme na "Checkout: Overview" web stranici
    await checkoutOverviewPage.finish();

    //17. Verifikuj da se nalaziš na "Checkout: Complete!" web stranici
    expect(await checkoutComplete.isAt()).to.be.true;

    //18. Klikni na izbornik ikonicu u gornjem lijevom uglu
    //19. Kada se izbornik učita, klikni "Logout" link u izborniku
    await productsPage.logOut();

    //20. Verifikuj da se nalaziš na "Login" stranici
    expect(await loginPage.isAt()).to.be.true;
  });
});
