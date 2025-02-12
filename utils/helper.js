import { until } from "selenium-webdriver";

const timeout = 10000;

async function openUrl(driver, url) {
  try {
    await driver.get(url);
    await driver.manage().window().maximize();
  } catch (error) {
    console.error("Error in openUrl function:", error);
    throw error;
  }
}

async function elementToBeClickable(driver, locator) {
  try {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.wait(until.elementIsVisible(element), timeout);
    await driver.wait(until.elementIsEnabled(element), timeout);
    return element;
  } catch (error) {
    console.error("Error in elementToBeClickable function:", error);
    throw error;
  }
}

async function getElementText(driver, locator) {
  try {
    const element = await elementToBeClickable(driver, locator);
    return element.getText();
  } catch (error) {
    console.error("Error in getElementText function:", error);
    throw error;
  }
}

async function elementToBeStale(driver, element) {
  try {
    await driver.wait(until.stalenessOf(element), timeout);
  } catch (error) {
    console.error("Error in elementToBeStale function:", error);
    throw error;
  }
}

async function clickElement(driver, locator) {
  try {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    await driver.wait(until.elementIsVisible(element), timeout);
    await driver.wait(until.elementIsEnabled(element), timeout);
    await element.click();
  } catch (error) {
    console.error("Error in clickElement function:", error);
    throw error;
  }
}

async function fillElement(driver, locator, text) {
  try {
    const element = await driver.wait(until.elementLocated(locator), timeout);
    await driver.executeScript("arguments[0].scrollIntoView(true);", element);
    await driver.wait(until.elementIsVisible(element), timeout);
    await driver.wait(until.elementIsEnabled(element), timeout);
    await element.click();
    await element.clear();
    await element.sendKeys(text);
  } catch (error) {
    console.error("Error in fillElement function:", error);
    throw error;
  }
}

export {
  openUrl,
  elementToBeClickable,
  getElementText,
  elementToBeStale,
  clickElement,
  fillElement,
};
