# 🛋️ Kanap – Project 5 
![16329291678171_image2](https://github.com/user-attachments/assets/09cec739-8217-4404-8ebc-f00d70244902)

## 💻 OpenClassrooms Web Developer Path

> 🛒 Build a complete e-commerce site using JavaScript  
> 🔌 Connect frontend to a Node.js backend API

---

## 📖 Project Description

**Kanap** is an online furniture store selling customizable sofas.  
This project focuses on developing the frontend logic in **vanilla JavaScript**, and interacting with a backend API to fetch product data and handle order submissions.

You will build a multi-page e-commerce site with dynamic product pages, cart management, and form validation.

---

## 🛠️ Technologies Used

- 🟨 **JavaScript (ES6)**  
- 🧱 **HTML5**  
- 🎨 **CSS3**  
- 🌐 **Node.js** (for backend API)

---

## 🗂️ Project Structure

- `backend/` → Contains the Node.js API (product data & order handling)  
- `frontend/` → Contains the static website (HTML/CSS/JS)

---

## 🚀 Backend Setup

### 1. Install Dependencies


```bash
cd backend
npm install
```

### 2. Start the Server


```bash
node server
```

By default, the server runs on:
👉 http://localhost:3000

---

## 🔁 API Routes

### 📦 Get all products

```bash
GET /api/products/
```
Returns the full list of available products.

### 🔍 Get product by ID

```bash
GET /api/products/:id
```
id = unique product ID
Returns the product details for the given ID.

### 🛍️ Submit an order

```bash
POST /api/products/order
```
Request body (JSON format):

```bash
{
  "contact": {
    "firstName": "John",
    "lastName": "Doe",
    "address": "123 Main Street",
    "city": "Paris",
    "email": "john.doe@example.com"
  },
  "products": [
    "5be9c8541c9d440000665243",
    "5beaa8bf1c9d440000a57d94"
  ]
}
```
- products is an array of product IDs.
- contact must contain valid user information.

## 🌐 Frontend Setup
The frontend is a static website that communicates with the backend API.

###✅ To run the frontend:

- Open the frontend/ folder in VS Code
- Use a local server such as Live Server
- Make sure the backend server is running at http://localhost:3000

## ⚙️ Config

A config file allows you to set:

- host
- port
- SSL usage

Make sure this is correctly set to match your backend server URL.

---

## 📄 License
This project is part of the OpenClassrooms Web Developer Path and is intended for educational purposes only.

---
## 👨‍💻 Author

Made by **Jessica Garrido**  
🔗 [LinkedIn](https://www.linkedin.com/in/jessica-garrido/)  
🐙 [GitHub](https://github.com/jessicagarrido)
