# Team H - Aircraft Routing Optimization

A project for optimizing aircraft routing problems using advanced algorithms including Christofides and Chained Lin-Kernighan heuristics.

## Team Members
- Logan Markley
- Maanav Damaraju
- Matthew Dominicis
- Shreyas Mocherla
- Ayman Rahman
- Vishaanth Muddu

## Project Overview
This project focuses on solving aircraft routing optimization problems using algorithmic approaches. It consists of:

- A **frontend** built with Next.js that provides a user interface for visualization and interaction
- A **backend** written in Python that implements the Christofides algorithm with Chained Lin-Kernighan optimization

## Quick Start with Docker Compose

The easiest way to run the entire application is using Docker Compose:

1. Make sure you have [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your system.

2. Clone this repository:
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

3. Start the application:
   ```bash
   docker compose up --build
   ```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

The application will automatically restart unless stopped. To stop the application, use:
```bash
docker compose down
```

## Manual Setup

If you prefer to run the components separately without Docker:

### Backend
Navigate to the `backend-directory` folder and follow the instructions in its README to set up the Python environment and run the optimization algorithms.

### Frontend
Navigate to the `frontend-directory` folder and follow the instructions in its README to set up the Next.js development environment and interact with the application.

## Project Structure
- `/backend-directory` - Contains the core optimization algorithms and problem generators
- `/frontend-directory` - Contains the web interface for interacting with the optimization engine

## Data Persistence
The application uses a shared volume for data persistence:
- Data is stored in `./backend-directory/data`
- This data is accessible to both the backend and frontend containers
- Any changes made to the data will persist across container restarts
