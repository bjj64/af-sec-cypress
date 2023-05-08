import Auth from "../support/auth";
import ApiTest from "../support/api-test";
import dashboardPage from "../pages/table-page";

let api;

beforeEach(() => {
  const auth = new Auth();
  auth.loadAuthData().then(() => {
    return auth.getToken().then((token) => {
      cy.wrap(token).as("token");
      localStorage.setItem("token", token);
    });
  });
});

describe("API Test with bearer token", () => {
  it("should perform an API request", () => {
    cy.fixture("example").then((apiUrl) => {
      api = new ApiTest(apiUrl.urlData.afUrl1);
      api.loadHeadersFixture("users-headers.json");
      // api.loadBodyFixture("users-body.json");
    });
    cy.get("@token").then((token) => {
      api.headers["Authorization"] = `Bearer ${token}`;
      api
        .performRequest(
          "/ts-auth/frontegg/identity/resources/users/v2/me",
          "GET",
          api.headers
        )
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.headers).to.have.property(
            "content-type",
            "application/json; charset=utf-8"
          );
          expect(response.body).to.have.property("name", "Itzchak  Mizgalsky");
        });
    });
  });
});
let api1;

describe("API Test set up data and visiting protected resource via UI using bearer token auth", () => {
  beforeEach(() => {
    cy.fixture("example").then((apiUrl) => {
      api1 = new ApiTest(apiUrl.urlData.afUrl2);
      api1.loadHeadersFixture("users-headers1.json");
      api1.loadBodyFixture("users-body1.json");
      const token = localStorage.getItem("token");
      if (token) {
        cy.window().then((window) => {
          window.localStorage.setItem("Authorization", `Bearer ${token}`);
        });
      }
    });
  });

  it("should perform an API request and visit protected resource", () => {
    api1
      .performRequest("/v3/users/upsert", "POST", api1.headers, api1.body)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers).to.have.property(
          "content-type",
          "application/json; charset=utf-8"
        );
      });

    cy.fixture("example").then((apiUrl) => {
      const url = `${apiUrl.urlData.afUrl3}`;
      const token = localStorage.getItem("token");
      if (token) {
        cy.visit(url, {
          onBeforeLoad(win) {
            win.localStorage.setItem("Authorization", `Bearer ${token}`);
          },
        });
      }
      dashboardPage.checkThatScanTitlesContain();
    });
  });
});
