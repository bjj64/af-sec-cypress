class ApiTest {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async performRequest(endpoint, method, headers, body) {
    const options = {
      method: method,
      url: this.baseUrl + endpoint,
      headers: headers,
    };
    if (method !== "GET" && body) {
      options.body = body;
    }
    const response = await cy.request(options);
    return response;
  }

  loadHeadersFixture(filename) {
    cy.fixture(filename).then((headers) => {
      this.headers = headers;
    });
  }

  loadBodyFixture(filename) {
    cy.fixture(filename).then((body) => {
      this.body = body;
    });
  }
}

module.exports = ApiTest;
