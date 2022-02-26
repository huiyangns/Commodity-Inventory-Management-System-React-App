# Commodity Inventory Management System React App


## App Description

1. This is a commodity inventory management system SPA, including PC front end and back end app.
2. I have implemented **Front End** part, according to API document.
3. Front end app includes Home page, Category Management page, Product Management page, User Management page, Role Management page and Charts page.
## App Feature
1. It can add, modify, or look over merchandise's first class categories and corresponding sub categories.
2. It can add, update or inspect a product. And it can also set product status between sold out and on sale. Customers can search products by name and description respectively.
3. It can add, modify and delete an user and assign it to different roles. Then customers can use their account to login or logout.
4. It can add a role and set its permission. With different permissions, users are restricted to specific operations.
5. Charts page offer pie chart, bar chart and line chart to show data visually.

## Technical Choice
###  Componential Programming
1. react
2. react-router-dom
3. antd
4. redux
### Interaction between Front and Back End
1. axios
2. promise/async/await
3. postman
### Modular Design
1. ES6
### Project Build
1. webpack
2. create-react-app
3. eslint
### Other Plugins
#### Rich Text Editor: 
1. react-draft-wysiwyg
2. draftjs-to-html
3. draft-js
#### Charts
1. echarts-for-react
## How to Run It
1. Run mongodb service.
2. Run back end app using *npm start*
3. Run front end app using *npm start*. And using super account (admin/admin) to login.