import loginPage from "../pages/login-page";
import scanPage from "../pages/scan-table-page";

beforeEach(() => {
  cy.fixture("example").then((userData) => {
    const urlData = userData.urlData;
    cy.visit(urlData.devUrl);
  });
});

it("Should check that elements are exists and have correct naming", () => {
  loginPage.checkThatLoginFormElementsContainCorrectText();
  loginPage.checkThatPageElementsAreExists();
});

it("Should successful login to main page with status code 200", () => {
  cy.fixture("example").then((userData) => {
    const aoData = userData.autotest;
    const urlData = userData.urlData;
    loginPage.loginAndCheckStatusCode(
      aoData.user,
      aoData.password,
      urlData.logInUrl,
      200
    );
    scanPage.checkUrlPattern(urlData.scansPageUrl);
    scanPage.checkThatScanTitlesContain();
  });
});

it("Should check that login is unavailable with wrong credentials and status code 401", () => {
  cy.fixture("example").then((userData) => {
    const aoData = userData.autotest;
    const urlData = userData.urlData;
    loginPage.loginAndCheckStatusCode(
      aoData.wrongUserName,
      aoData.wrongUserPassword,
      urlData.logInUrl,
      401
    );
  });
});

it("Should check email form mask", () => {
  cy.fixture("example").then((userData) => {
    const aoData = userData.autotest;
    loginPage.checkEmailIncorrectFormatError(aoData.incorrectUserNameMask);
  });
});

it("Should check that email and password fields are required notification", () => {
  loginPage.checkThatEmailPasswordFieldsAreRequiredError();
});
