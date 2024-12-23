# quoteme-github-action-frontend

This is the frontend for the motivational quote generator app built with **React** and **Tailwind CSS**. The app fetches random quotes from the backend and displays them in a beautiful UI. It also allows users to save their favorite quotes. The app uses **GitHub Actions** to automate the build, test, and deployment processes.

## Features

- Display random quotes fetched from the backend.
- Save favorite quotes to the backend.
- Responsive design using **Tailwind CSS**.
- **GitHub Actions** integrated for continuous integration and deployment.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **GitHub Actions**: For automating workflows such as testing, linting, and deploying.
- **Axios**: For making HTTP requests to the backend.
- **gsap**: Used for animations.

## Setup and Installation

To get started with the project locally:

1. Clone the repository:

    ```bash
    git clone https://github.com/<your-username>/quoteme-github-action-frontend.git
    ```

2. Navigate to the project folder:

    ```bash
    cd quoteme-github-action-frontend
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the development server:

    ```bash
    npm start
    ```

Visit [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## Workflow Configuration

You can find the GitHub Actions configuration file in the `.github/workflows` directory. The actions are triggered for each push to the main branch and will run automated tests, lint the code, and deploy the app.

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.
