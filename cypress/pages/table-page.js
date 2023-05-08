require("cypress-xpath");

class tablePage {
  elements = {
    tableNameLable: () => cy.get('h1[data-test="page-title"]'),
  };

  checkThatScanTitlesContain() {
    cy.wait(5000);
    this.elements.tableNameLable().should("be.visible");
    this.elements.tableNameLable().should("contain", "Moderation - All");
  }

  checkUrlPattern(urlPart) {
    cy.url().should("include", urlPart);
  }
}
module.exports = new tablePage();
