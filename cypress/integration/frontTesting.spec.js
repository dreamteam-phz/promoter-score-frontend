describe("Rendering the login page", () => {
  it("Testing correct rendering", () => {
    cy.visit("/");
  });
});
describe("Testing the Creating a survey", () => {
  beforeEach(() => {
    cy.visit("/Home");
  });
  it("test 1:navigating to create survey", () => {
    // cy.get("a").click();
    cy.get('[name="create"]').click();
    cy.get("#create").check({ force: true }); // To override the build-in checker and for disable the error checker.
  });

  it("test 2: creating the survey", () => {
    // cy.get("a").click();
    cy.get('[name="create"]').click();
    cy.get("#create").check({ force: true }); // To override the build-in checker and for disable the error checker.
    cy.get('[name="name"]').clear();
    cy.get('[name="name"]').type("Cypress Testing");
    cy.get('[name="question"]').clear();
    cy.get('[name="question"]').type("How likely will succeed in testing ?");
    cy.get(".Create_container__aFRss > button").click();
  });
});
describe("render the form page", () => {
  it("Test 1:correct rendering", () => {
    cy.visit("/626b165a5d6d45d312dae8aa");
  });
  it("Test 2: allows picking a score", () => {
    cy.visit("/626b165a5d6d45d312dae8aa");
    cy.get('[for="9"]').click();
    cy.get("#\\39 ").check({ force: true }); // To override the build-in checker and for disable the error checker.
    cy.get("textarea").click();
    cy.get(".Form_button__cZwvL").click();
  });
  it("Test 3: allows entering comment", () => {
    cy.visit("/626b165a5d6d45d312dae8aa");
    cy.get("textarea").click();
  });
  it("Test 4: allows submitting form", () => {
    cy.visit("/626b165a5d6d45d312dae8aa");
    cy.get(".Form_buttonArea__GFbuR").click();
  });
});

describe("testing the Dashboard", () => {
  beforeEach(() => {
    cy.visit("/Home");
  });
  it("Test 1: Correct rendering", () => {
    cy.visit("/Home");
  });
  it("test 2: fetching surveys", () => {
    cy.get('[name="selectedSurvey"]').select("626b8b775d6d45d312dae8ef");
  });
  it("test 3: using the monthly dropdown menu", () => {
    cy.get('[name="selectedMonth"]').select("180");
  });
  it("test 4: testing chart clicking functionality", () => {
    cy.get("canvas").click();
    cy.get("canvas").click();
    cy.findByText("3 months").should("exist");
  });
  it("Navigating dash", () => {
    cy.get('[name="instructions"]').click();
    cy.get("#instructions").check({ force: true }); // To override the build-in checker and for disable the error checker.
  });
});
describe("Full Test", () => {
  it("Creating the survey", function () {
    cy.visit("http://localhost:3000/Home");
    cy.get('[name="create"]').click();
    cy.get("#create").check({ force: true }); // To override the build-in checker and for disable the error checker.
    cy.get('[name="name"]').clear();
    cy.get('[name="name"]').type("Full test");
    cy.get('[name="question"]').clear();
    cy.get('[name="question"]').type(
      "How likely you would like testing with cypress?"
    );
    cy.get(".Create_container__aFRss > button").click();
    cy.get(".Create_button__\\+Gn1X > a").click();
    cy.get('[name="dashboard"]').click();
    cy.get("#dashboard").check({ force: true }); // To override the build-in checker and for disable the error checker.
  });

  it("Testing form submission", function () {
    cy.visit("http://localhost:3000/62725255521e917e64119804");
    cy.get('[for="10"]').click();
    cy.get("#\\31 0").check({ force: true }); // To override the build-in checker and for disable the error checker.
    cy.get("textarea").click();
    cy.get(".Form_button__cZwvL").click();
    cy.get('[for="1"]').click();
    cy.get("#\\31 ").check({ force: true }); // To override the build-in checker and for disable the error checker.
    cy.get("textarea").click();
    cy.get(".Form_button__cZwvL").click(); // To override the build-in checker and for disable the error checker.
    cy.get('[for="7"]').click();
    cy.get("#\\37 ").check({ force: true }); // To override the build-in checker and for disable the error checker.
    cy.get("textarea").click();
    cy.get(".Form_button__cZwvL").click(); // To override the build-in checker and for disable the error checker.
    cy.get('[for="9"]').click();
    cy.get("#\\39 ").check({ force: true }); // To override the build-in checker and for disable the error checker.
    cy.get("textarea").click();
    cy.get(".Form_button__cZwvL").click();
  });

  it("Checking newly added survey and the scores related to it", function () {
    cy.visit("http://localhost:3000/Home");
    cy.get('[name="selectedSurvey"]').select("62725255521e917e64119804");
  });
});
