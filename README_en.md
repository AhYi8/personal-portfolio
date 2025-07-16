# Personal Portfolio Website

This is a personal portfolio website designed to showcase my skills, projects, and experience. It features a modern, responsive design and provides a comprehensive overview of my professional capabilities.

## Features

- **Dynamic Content Loading**: Pages are loaded asynchronously without reloading the entire site, providing a smooth user experience.
- **Responsive Design**: The layout adapts to different screen sizes, ensuring a great experience on desktops, tablets, and mobile devices.
- **Interactive Elements**: Includes interactive components like a contact form and project showcases.
- **Modular Architecture**: The code is organized into reusable components, making it easy to maintain and extend.

## Project Architecture

The project follows a modular architecture, separating concerns into different files and directories.

### File Structure

```
personal-portfolio/
├── assets/
│   └── images/         # Static image assets
├── config/
│   └── config.js       # Configuration files (e.g., EmailJS keys)
├── css/
│   └── common.css      # Shared CSS styles
├── js/
│   └── main.js         # Main JavaScript file for application logic
├── pages/
│   ├── home.html       # HTML content for the home page
│   ├── about.md        # Markdown content for the about page
│   ├── projects.html   # HTML content for the projects page
│   ├── skills.html     # HTML content for the skills page
│   └── contact.html    # HTML content for the contact page
├── index.html          # Main entry point of the application
├── README.md           # This file
└── design_plan.md      # Project design and planning document
```

### Key Components

- **`index.html`**: The main container for the application. It includes the header, footer, and a content area that is dynamically updated.
- **`js/main.js`**: Handles routing, content loading, and event handling. It's the core of the application's interactivity.
- **`pages/`**: Contains the content for different sections of the website. Using `.html` or `.md` allows for flexibility in content creation.
- **`css/common.css`**: Contains global styles to ensure a consistent look and feel across the site.
- **`config/config.js`**: Manages external service configurations, such as API keys for EmailJS, keeping them separate from the main application logic.

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: 
  - [Marked.js](https://marked.js.org/): For parsing Markdown files into HTML.
  - [EmailJS](https://www.emailjs.com/): For handling contact form submissions without a backend server.
- **Development Tools**: 
  - [http-server](https://www.npmjs.com/package/http-server): A simple, zero-configuration command-line HTTP server for local development.

## Configuration

To use the contact form, you need to configure your EmailJS credentials. 

1.  Sign up for a free account at [EmailJS](https://www.emailjs.com/).
2.  Create a new email service and a new email template.
3.  Update `config/config.js` with your `serviceID`, `templateID`, and `publicKey`:

    ```javascript:f:\ProgramFiles\Code\node\personal-portfolio\config\config.js
    const emailConfig = {
        serviceID: 'YOUR_SERVICE_ID',
        templateID: 'YOUR_TEMPLATE_ID',
        publicKey: 'YOUR_PUBLIC_KEY'
    };
    ```

## Deployment

This project is a static website and can be deployed to any static hosting provider.

### Local Development

To run the project locally, you can use a simple HTTP server.

1.  Make sure you have Node.js installed.
2.  Install `http-server` globally:
    ```bash
    npm install -g http-server
    ```
3.  Navigate to the project's root directory and run the server:
    ```bash
    http-server
    ```
4.  Open your browser and go to `http://localhost:8080`.

### Hosting Platforms

You can deploy this website to platforms like:

-   GitHub Pages
-   Netlify
-   Vercel
-   AWS S3

Simply upload the contents of the project directory to your hosting provider of choice.