# MERN Mini Apps

Welcome to the **MERN Mini Apps** repository! This project is a collection of mini applications built using the MERN stack (MongoDB, Express.js, React, Node.js) combined with Vite for an optimized development experience. Each mini app is designed to be modular, easy to understand, and highly responsive.

## Live Demo

Experience the live version of the project here: [https://mern-mini-apps.vercel.app/](https://mern-mini-apps.vercel.app/)

## Features

- **Modern Technologies**: Leverages the MERN stack with Vite for fast builds, hot module replacement, and efficient development workflows.
- **Modular Architecture**: Each mini app is organized into separate, manageable components for clarity and reusability.
- **Responsive Design**: Built with mobile-first design principles ensuring compatibility across various devices.
- **RESTful API**: A robust backend built with Express.js and MongoDB, providing scalable API endpoints.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or above)
- [MongoDB](https://www.mongodb.com/) (ensure you have a running instance)

### Installation

1. Clone the Repository:

   git clone https://github.com/pavan1419/mern-mini-apps.git  
   cd mern-mini-apps

2. Install Dependencies:

   - For the server:  
     cd server  
     npm install

   - For the client:  
     cd ../client  
     npm install

3. Set Up Environment Variables:

   Create a `.env` file in the `server` directory with the following content:

   PORT=5000  
   MONGODB_URI=your_mongodb_connection_string

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

### Running the Application

1. Start the Server:

   cd server  
   npm run dev

   The server will start on http://localhost:5000/.

2. Start the Client:

   In a separate terminal window:

   cd client  
   npm run dev

   The client will start on http://localhost:5173/ (default Vite port).

## Project Structure

mern-mini-apps/  
├── client/      # React frontend powered by Vite  
└── server/      # Express.js backend with MongoDB

## Creator

This project was created by **Pavan**. For more projects and updates, visit [Pavan's GitHub Profile](https://github.com/pavan1419).

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: git checkout -b feature/your-feature-name.
3. Commit your changes: git commit -m 'Add some feature'.
4. Push to the branch: git push origin feature/your-feature-name.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

