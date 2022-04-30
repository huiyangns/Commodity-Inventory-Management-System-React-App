import LoginPage_POM from "../Login/LoginPage_POM";
export default class RolePage_POM {
  login() {
    let loginPage_PO = new LoginPage_POM();
    loginPage_PO.navigate_to_Login_Page();
    loginPage_PO.submit_login_form("admin", "admin");
  }

  navigate_to_rolePage() {
    // cy.visit("http://localhost:3000/#/role")
    cy.get("[href*='role']").click();
  }

  addRole(roleName) {
    cy.get("button").contains("Add Role").click();
    cy.get("[placeholder='Pls enter role name']").type(roleName);
    cy.get("button").contains("OK").click();
  }

  navigate_to_last_page() {
    cy.get(".ant-pagination-item-link")
      .eq(1)
      .then(($ele) => {
        if ($ele.prop("disabled") == true) {
          return;
        }
        cy.wrap($ele).click();
        this.navigate_to_last_page();
      });
  }
}
