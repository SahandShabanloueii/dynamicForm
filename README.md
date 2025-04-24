# React + Vite,  Dynamic Form with Redux

A modern React application featuring a dynamic form with Redux state management, form validation, and responsive design.

## Features

- Dynamic form generation based on configuration
- Form validation using react-hook-form
- Redux state management
- Responsive design with Tailwind CSS
- Support for multiple field types (text, email, number, checkbox)
- Error handling and loading states

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Dependencies

The project uses the following main dependencies:

- **React**: UI library
- **@reduxjs/toolkit**: Redux state management
- **react-redux**: React bindings for Redux
- **react-hook-form**: Form handling and validation
- **Tailwind CSS**: Styling
- **Vite**: Build tool and development server

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd dynamicForm
```

2. Install dependencies:
```bash
npm install
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`

Previews the production build locally.

## Project Structure

```
dynamicForm/
├── src/
│   ├── components/
│   │   └── DynamicForm.jsx
│   ├── redux/
│   │   ├── formSlice.js
│   │   └── store.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
└── vite.config.js
```

## Form Configuration

The form is configured through the `formConfig` object in `DynamicForm.jsx`. You can customize:

- Form title and description
- Field types (text, email, number, checkbox)
- Validation rules
- Required fields
- Placeholder text
- API endpoint for form submission

## State Management

The application uses Redux for state management with the following state structure:

```javascript
{
  formData: {},      // Current form data
  loading: false,    // Loading state during submission
  error: null,       // Error message if submission fails
  success: false     // Success state after submission
}
```
