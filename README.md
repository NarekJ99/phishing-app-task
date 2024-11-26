# Project Setup with Docker

This project uses **Docker** to run four main services: **Frontend**, **Management**, **Simulation**, and **MongoDB**. The **Frontend** is built with **Vite**, **React**, **TailwindCSS**, **Shadcn UI**, **React Router**, and **Axios**.

## Services Overview

- **Frontend**: The user interface built with Vite, React, and TailwindCSS.
- **Management**: Backend that handles phishing management features.
- **Simulation**: Backend that runs phishing simulations.
- **MongoDB**: A database to store data for the application.

## Prerequisites

Before running the project, you need:

- **Docker**
- **Docker Compose**

## Steps to Run the Project

### 1. Clone the repository

First, clone the project to your local machine:

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Set up environment variables

Create a `.env` file in the project root with the following content:

```env
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
```

Make sure to replace `your_jwt_secret`, `your_email_user`, and `your_email_password` with your own values.

### 3. Run the application
Run the following command to start the services:

```bash
docker-compose up --build
```

This command will build the containers and start the frontend, management, simulation, and MongoDB services.

### 4. Access the application

- **Frontend**: Go to `http://localhost:5173` in your browser.
- **Management API**: Go to `http://localhost:5001`.
- **Simulation API**: Go to `http://localhost:5000`.
- **MongoDB**: The database is available at `mongodb://localhost:27017`.

### 5. Stop the application

To stop all services, run:

```bash
docker-compose down
```

This will stop and remove the containers.

## Service Details

### Frontend

- **Image**: `node:20`
- **Working Directory**: `/app`
- **Ports**: `5173:5173`
- **Environment**:
  - `VITE_MANAGMENT_URL=http://localhost:5001`
- **Command**: Installs dependencies and starts the frontend app: `sh -c "npm install && npm run dev"`
- **Dependencies**: Depends on the **Management** service (only starts when Management is healthy).

### Management

- **Image**: `node:20`
- **Working Directory**: `/app`
- **Ports**: `5001:5001`
- **Environment**:
  - `PORT=5001`
  - `MONGO_URL=mongodb://mongo:27017`
  - `JWT_SECRET={JWT_SECRET}`
  - `PHISHING_SIMULATOR_URL=http://localhost:5000`
- **Command**: Installs dependencies and starts the management app: `sh -c "npm install && npm run start:dev"`
- **Dependencies**: Depends on the **MongoDB** service.
- **Health Check**: Checks if the management service is running by sending a request to `http://localhost:5001`.
- **Networks**: Uses the **app-network**.

### Simulation

- **Image**: `node:20`
- **Working Directory**: `/app`
- **Ports**: `5000:5000`
- **Environment**:
  - `PORT=5000`
  - `MONGO_URL=mongodb://mongo:27017`
  - `EMAIL_USER={EMAIL_USER}`
  - `APP_URL=http://localhost:5000`
  - `EMAIL_PASSWORD=${EMAIL_PASSWORD}`
- **Command**: Installs dependencies and starts the simulation app: `sh -c "npm install && npm run start:dev"`
- **Dependencies**: Depends on the **MongoDB** service.
- **Networks**: Uses the **app-network**.

### MongoDB

- **Image**: `mongo:latest`
- **Container Name**: `mongo`
- **Ports**: `27017:27017`
- **Volumes**: Stores MongoDB data in `mongo-data:/data/db`.
- **Networks**: Uses the **app-network**.

## Volumes

- **mongo-data**: Stores MongoDB data.
- **node_modules**: Stores Node.js dependencies.

## Networks

- **app-network**: A network that allows the services to communicate with each other.

## Notes

- Make sure to set the required environment variables in the `.env` file before starting the services.
- The services will automatically restart if they fail.
- You can edit the `.env` file to change settings like the secret keys and email credentials.
