# Project Overview

This project is a landing page for Himalkom, built using React and Vite. It features a responsive design with a navigation header, dropdown menus, and various pages representing different sections of the Himalkom organization.

## Project Structure

The project is organized as follows:

```
landing-page-himalkom
├── public
│   └── Logo HIMALKOM.svg          # Logo image used in the application
├── src
│   ├── assets
│   │   └── Logo HIMALKOM.svg      # Logo image used in the application
│   ├── components
│   │   ├── header.jsx              # Header component with logo and navigation
│   │   ├── Logo.jsx                # Logo component rendering the logo image
│   │   ├── Nav.jsx                 # Navigation component for mobile menu
│   │   └── NavLinks.jsx            # Navigation links and dropdown functionality
│   ├── index.css                   # Global styles for the application
│   ├── main.jsx                    # Entry point of the React application
│   └── pages
│       ├── Home.jsx                # Home page component
│       ├── Himalkom.jsx            # Himalkom page component
│       ├── BP.jsx                  # BP page component
│       ├── BPH.jsx                 # BPH page component
│       ├── Academic.jsx            # Academic page component
│       ├── Business.jsx            # Business page component
│       ├── External.jsx            # External page component
│       ├── Internal.jsx            # Internal page component
│       ├── Creative.jsx            # Creative page component
│       ├── Ristek.jsx              # Ristek page component
│       ├── Komunitas.jsx           # Komunitas page component
│       ├── Komnews.jsx             # Komnews page component
│       ├── Galeri.jsx              # Galeri page component
│       ├── Megaproker.jsx          # Megaproker page component
│       └── Riset.jsx               # Riset page component
├── .eslintrc.js                    # ESLint configuration
├── index.html                      # Main HTML file for the React application
├── package.json                    # npm configuration file
├── pnpm-lock.yaml                  # pnpm lock file for consistent installs
├── README.md                       # Documentation for the project
└── vite.config.js                  # Vite configuration file
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd landing-page-himalkom
   ```

2. **Install dependencies**:
   ```
   pnpm install
   ```

3. **Run the development server**:
   ```
   pnpm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Features

- Responsive design with a mobile-friendly navigation menu.
- Dropdown menus for profile and department links.
- Multiple pages representing different sections of the Himalkom organization.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.