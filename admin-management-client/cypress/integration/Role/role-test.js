///<reference types="cypress"/>
import RolePage_POM from "../../support/POM/Role/RolePage_POM";

describe("test role page", () => {
  let roleName = Math.random().toString(36).substring(2, 9);
  let rolePage_PO = new RolePage_POM();

  beforeEach(() => {
    rolePage_PO.login();
    rolePage_PO.navigate_to_rolePage();
    cy.fixture("example").as("data");
  });
  it("add a new role", () => {
    rolePage_PO.addRole(roleName);
    rolePage_PO.navigate_to_last_page();
    cy.get("tbody tr:last-child td:nth-child(2)")
      .invoke("text")
      .should("eq", roleName);
  });

  it("set permissions to a specific role", () => {
      let menus = null
    cy.intercept({
      method: "POST",
      url: "**/role/update",
    }).as("postXHR");

    rolePage_PO.navigate_to_last_page();
    cy.get("tbody tr:last-child td:nth-child(1)").click();
    cy.get("button").contains("Set Role Permission").click();

    cy.get("@data")
      .then((data) => {
          menus = data.menus
        data.menus.forEach((menu) => {
          cy.get(".ant-tree-list").find(`[title=${menu}]`).prev("span").click();
        });
      })
      .then(() => {
        cy.get("button").contains("OK").click();
        cy.wait("@postXHR").should(({ request, response }) => {
            
          let targetMenus = response.body.data.menus;
          targetMenus.sort();
          let targetMenusToString = targetMenus.map(menu => menu.toLowerCase().substring(1)).join("-");

          menus.sort();
          let menusToString = menus.map(menu => menu.toLowerCase()).join("-");
          // compare select items with XHR object
          expect(targetMenusToString).to.eq(menusToString);
        });
      });
  });
});
