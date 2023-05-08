class Auth {
  constructor() {
    this.authData = null;
    this.token = null;
  }

  loadAuthData() {
    return cy.fixture("example").then((authData) => {
      this.authData = authData;
    });
  }

  getToken() {
    const urlData = this.authData.urlData;
    const authCreds = this.authData.authBody;
    const authHeaders = this.authData.authHeaders;
    return cy
      .request({
        method: "POST",
        url: urlData.afUrl,
        headers: authHeaders,
        body: authCreds,
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("accessToken");
        this.token = response.body.accessToken;
        return this.token;
      });
  }
}

module.exports = Auth;
