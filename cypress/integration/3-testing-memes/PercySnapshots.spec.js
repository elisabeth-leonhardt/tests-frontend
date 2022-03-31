beforeEach(() => {
  cy.setCookie("bitmemes-user", "funny-eli");
});

describe("sacar capturas con percy", () => {
  it("sacar captura del home", () => {
    cy.visit("localhost:3000");
    cy.wait(2000);
    cy.percySnapshot();
  });
  it("sacar captura de dashboard del usuario", () => {
    cy.visit("localhost:3000/mis-memes");
    cy.wait(2000);
    cy.percySnapshot();
  });
});
