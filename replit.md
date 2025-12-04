# AI Prompt Framework

## Overview
An interactive web application that organizes and displays AI prompting templates for building apps. Users can browse categorized prompt templates, copy them, and learn best practices for working with AI assistants.

## Current State
- Flask web application running on port 5000
- Displays the comprehensive AI prompting framework document
- Organized into tabbed sections: Initial Prompts, Iteration Prompts, App Types, Debugging, Quick Templates
- Includes Best Practices and Development Flow sections
- Copy-to-clipboard functionality for all templates

## Tech Stack
- Backend: Python Flask
- Frontend: HTML/CSS/JavaScript (vanilla)
- Styling: Custom CSS with dark theme

## Project Structure
```
/
├── app.py              # Main Flask application
├── templates/
│   └── index.html      # Main page template
├── static/             # Static assets (if needed)
├── attached_assets/    # Original framework document
└── main.py            # Legacy Cohere script (unused)
```

## Running the App
The app runs via the configured workflow which executes `python app.py` on port 5000.

## User Preferences
- None recorded yet

## Recent Changes
- December 4, 2025: Initial creation of prompt framework web app
