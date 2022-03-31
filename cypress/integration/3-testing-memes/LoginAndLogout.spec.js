beforeEach(() => {
  cy.viewport(1440, 1440);
});

it("test del flujo de login", () => {
  cy.visit("localhost:3000");
  cy.get('[data-testid="login-button"]').click();
  cy.get("input").should("be.visible");
  cy.get("[data-testid=username-input]").type("funny-eli");
  cy.get("[data-testid=username-save").click();
  cy.url().should("contain", "/mis-memes");
  cy.contains("funny-eli");
  cy.contains("Mis Memes");
  cy.contains("Bienvenidos funny-eli");
  cy.getCookie("bitmemes-user").should("exist");
  cy.getCookie("bitmemes-user").should("have.property", "value", "funny-eli");
});

describe("test de flujo de logout", () => {
  beforeEach(() => {
    cy.setCookie("bitmemes-user", "funny-eli");
  });
  it("test de flujo de logout", () => {
    cy.visit("localhost:3000/mis-memes");
    cy.contains("Bienvenidos funny-eli");
    cy.getCookie("bitmemes-user").should("exist");
    cy.getCookie("bitmemes-user").should("have.property", "value", "funny-eli");
    cy.get("[data-testid=username-button]").click();
    cy.get("[data-testid=username-input]").clear();
    cy.get("[data-testid=username-save").click();
    cy.url().should("eq", "http://localhost:3000/");
    cy.getCookie("bitmemes-user").should("exist");
    cy.getCookie("bitmemes-user").should("have.property", "value", "");
  });
});
