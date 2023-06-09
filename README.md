# SmartKart Ecommerce 

![Version](https://img.shields.io/badge/version-0.0.1--beta-orange)  
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

This is an ecommerce website for clothes built using React.js and Tailwind CSS. The website includes a landing page with featured categories, a product listing page with filters, a product detail page, cart management, wishlist management, search functionality, sign-up and login pages, address management, and checkout.

## Live Link
https://smartkart-ecommerce.netlify.app/

## Demo Video

https://github.com/ncrptd/smartkart/assets/85108386/3e6c3f50-1b58-4c74-be39-06355e25b93f



## Getting Started

1. Clone the repository: ```git clone https://github.com/ncrptd/smartkart```
2. Install dependencies: ```npm install```
3. Start the development server: ```npm start```
## Features

- **Landing Page**: The landing page displays a list of featured categories. Clicking on any category redirects the user to the product listing page with the selected category.

- **Product Listing Page**: The product listing page displays all products with filters. Filters include price, category, and product rating. There is a button to clear all filters. Each product card includes two call-to-action buttons: Add to Cart and Add to Wishlist.

- **Product Detail Page**: Clicking on any product redirects the user to a single product page with all details and the Add to Cart and Add to Wishlist buttons with persisted data.

- **Cart Management**: The navbar includes a link to the cart where all products that the user wants to buy are displayed. On the product card, the user can see the quantity of a particular product, increase or decrease the quantity, remove the product from the cart, and add the product to the wishlist. The price details card of the cart contains a button to checkout which shows the total price of the products with their quantity.

- **WishlistManagement**: The navbar also includes a link to the wishlist where all products that the user would like to buy are displayed. On the product card, the user can remove the item from the wishlist or add the item to the cart. If the cart already contains that item, it only increases the quantity.

- **Search**: The website includes a search functionality where the user can search for an item via the input text box on the header navbar.

- **Loading & Alerts**: The user can see loading spinners when the data, such as the products, are loading. The website displays acknowledgement alerts whenever the user adds or removes an item from the cart or wishlist.

- **Sign-up & Login Pages**: The user can sign-up and log in using their email and password. The sign-up page includes an option to show or hide the password.

- **Logout**: The user can log out of the app from the header navbar.

- **Address Management**: The user can add multiple addresses, update or delete them, and choose a single address to deliver their order.

- **Checkout**: Once the user chooses the address, they can click on the checkout button which shows the order summary.


## Conclusion

This ecommerce website for clothes is designed to provide a seamless shopping experience for users. It includes all the necessary features such as product listing, cart and wishlist management, search functionality, and checkout. The website is built using React.js and Tailwind CSS, and React Router is used for navigation. With its user-friendly interface and easy-to-use features, this website is sure to make shopping for clothes a breeze.
