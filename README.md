# Car Listing App

A web application that allows users to manage car listings with full authentication, upload of images, and CRUD operations for cars. The project is split into two parts: a **backend** built with **Node.js** and **Express**, and a **frontend** built with **React** and **Vite**.

---

## **Table of Contents**

1. [Project Structure](#project-structure)
2. [Backend Setup](#backend-setup)
   - [Environment Variables](#environment-variables)
   - [Install Dependencies](#install-dependencies)
   - [Run the Server](#run-the-server)
3. [Frontend Setup](#frontend-setup)
   - [Environment Variables](#frontend-environment-variables)
   - [Install Dependencies](#install-dependencies-frontend)
   - [Run the Frontend](#run-the-frontend)
4. [Features](#features)
5. [Folder Structure](#folder-structure)
6. [Additional Notes](#additional-notes)

---

## **Project Structure**

### **Backend**

```
*backend*
    - .env
    - .gitignore
    - app.js
    - package-lock.json
    - package.json
    - server.js
    - *config*
        - cloudinaryConfig.js
        - db.js
    - *controllers*
        - authController.js
        - carController.js
    - *middleware*
        - authMiddleware.js
    - *models*
        - Car.js
        - User.js
    - *routes*
        - authRoutes.js
        - carRoutes.js
    - *uploads*
        - 1731513654946-sanjeevani.png
        - 1731513855077-KxdKA9dT_codolio_card.png
        - 1731514557916-ashutosh.jpeg
```

### **Frontend**

```
*frontend*
    - .env
    - .gitignore
    - eslint.config.js
    - index.html
    - package-lock.json
    - package.json
    - postcss.config.js
    - README.md
    - tailwind.config.js
    - vite.config.js
    - *public*
        - vite.svg
    - *src*
        - App.css
        - App.jsx
        - index.css
        - main.jsx
        - *api*
            - axiosConfig.js
        - *assets*
            - react.svg
        - *components*
            - Navbar.jsx
            - *Auth*
                - Login.jsx
                - Signup.jsx
            - *Car*
                - CarDetail.jsx
                - CarForm.jsx
                - CarList.jsx
        - *pages*
            - Dashboard.jsx
            - Home.jsx
```

---

## **Backend Setup**

### **1. Environment Variables**

Create a `.env` file in the `backend` directory to store environment variables. This file should not be committed to Git, so make sure `.env` is listed in `.gitignore`.

Here is an example `.env` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carDB
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **2. Install Dependencies**

Navigate to the `backend` directory and install the necessary dependencies.

```bash
cd backend
npm install
```

This will install all the dependencies listed in the `package.json` file, such as `express`, `mongoose`, `jsonwebtoken`, `multer`, etc.

### **3. Run the Server**

Once the dependencies are installed, you can run the backend server. Make sure MongoDB is running on your machine or use a remote MongoDB service.

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

---

## **Frontend Setup**

### **1. Environment Variables**

Create a `.env` file in the `frontend` directory to store environment variables. This file should also be ignored in `.gitignore`.

Here’s an example of what the `.env` file might look like for the frontend:

```
VITE_API_URL=http://localhost:5000/api
```

### **2. Install Dependencies**

Navigate to the `frontend` directory and install the necessary dependencies.

```bash
cd frontend
npm install
```

This will install all the dependencies listed in the `package.json` file, such as `react`, `react-router-dom`, `axios`, and `tailwindcss`.

### **3. Run the Frontend**

Once the dependencies are installed, you can run the frontend development server with:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## **Features**

- **Authentication:**
  - User registration and login with JWT tokens for secure authentication.
  - Password hashing and validation.
  
- **Car Management:**
  - Users can add, edit, delete, and view cars.
  - Car details include images, specifications, pricing, condition, and more.
  
- **Image Upload:**
  - Car images (front, rear, side, etc.) are uploaded and stored using Cloudinary.

- **Responsive Design:**
  - The frontend is built using React and TailwindCSS, ensuring a responsive layout.

---

## **Folder Structure**

### **Backend Folder Structure**

- **`config/`**: Contains configuration files for connecting to the database and Cloudinary.
  - `db.js`: MongoDB connection.
  - `cloudinaryConfig.js`: Configuration for Cloudinary.

- **`controllers/`**: Contains the logic for handling requests and responses.
  - `authController.js`: Handles user authentication (login, registration).
  - `carController.js`: Handles CRUD operations for cars.

- **`middleware/`**: Contains middleware functions.
  - `authMiddleware.js`: Verifies JWT tokens for protected routes.

- **`models/`**: Contains Mongoose models for database schemas.
  - `Car.js`: Schema for car data.
  - `User.js`: Schema for user data.

- **`routes/`**: Defines the API routes.
  - `authRoutes.js`: Authentication-related routes.
  - `carRoutes.js`: Routes for car CRUD operations.

- **`uploads/`**: Stores uploaded car images.

### **Frontend Folder Structure**

- **`api/`**: Contains the `axiosConfig.js` file to configure Axios for making API requests.

- **`components/`**: Contains React components.
  - `Navbar.jsx`: Navbar component.
  - **`Auth/`**: Components for authentication (login, signup).
  - **`Car/`**: Components for displaying and managing cars (car form, car list, car detail).

- **`pages/`**: Contains the page components for routing.
  - `Dashboard.jsx`: User dashboard.
  - `Home.jsx`: Home page for the app.

- **`public/`**: Contains static files, such as images, icons, and the `index.html` file.

- **`src/`**: Contains all source code files, including CSS, JS, and component files.

---

## **Additional Notes**

- **JWT Authentication**: In the backend, JWT is used to authenticate users. Ensure you use the `JWT_SECRET` value from the `.env` file when generating tokens in the backend.

- **Image Upload**: The backend uses Cloudinary for image storage. You'll need to create a Cloudinary account and provide the API credentials in the `.env` file for it to work properly.

- **CORS**: Ensure that CORS is enabled on the backend so that the frontend can communicate with the backend.

- **MongoDB**: This app uses MongoDB for storing user and car data. You can either run a local MongoDB instance or use a cloud-based solution like MongoDB Atlas.

---

## **License**

This project is open-source and available under the [MIT License](LICENSE).

