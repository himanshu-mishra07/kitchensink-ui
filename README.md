# kitchensink-ui

This project is a React application built with Vite. It includes various components and features for managing members, authentication, and more.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (version 6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/kitchensink-ui.git
   cd kitchensink-ui
   ```

2. Install the dependencies:
  ```bash
   npm install
  ```

3. Running the Project. To start the development server, run:
  ```bash
   npm run dev
  ```

This will start the Vite development server and you can view the application in your browser at http://localhost:5173.

## Building the Project

To build the project for production, run:
```bash
 npm run build
```

## Project Structure
The project structure is as follows:
```markdown
kitchensink-ui/
├── public/                 # Public assets
├── src/                    # Source files
│   ├── components/         # React components
│   │   ├── header/         # Header component
│   │   ├── footer/         # Footer component
│   │   ├── login/          # Login component
│   │   ├── signup/         # SignUp component
│   │   ├── members/        # Member management components
│   │   ├── modals/         # Modal components
│   │   ├── admin/          # Admin dashboard components
│   │   ├── user/           # User dashboard components
│   │   ├── endpoints/      # API details component
│   │   └── ProtectedRoute.jsx  # Protected route component
│   ├── services/           # API service files
│   ├── utils/              # Utility functions
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── App.css             # Global styles
├── .gitignore              # Git ignore file
├── index.html              # HTML template
├── package.json            # NPM package file
└── README.md               # Project README
```

