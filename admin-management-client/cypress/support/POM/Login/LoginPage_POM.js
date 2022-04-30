export default class LoginPage_POM {
    navigate_to_Login_Page() {
      cy.visit("http://localhost:3000/#/login");
    }
  
    submit_login_form(userName, password) {
      if (userName.trim()) {
        cy.get("[placeholder='Username']").type(userName);
      }
      if (password.trim()) {
        cy.get("[placeholder='Password']").type(password);
      }
  
      cy.get("button[type='submit']").click()
    }
  }
  