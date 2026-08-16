# LinkedIn AI Post Generator

An AI-powered web application that helps users create professional and engaging LinkedIn posts from a simple topic or idea.

The application uses a modern web frontend, a FastAPI backend, and Groq's AI API to generate customized LinkedIn content based on the user's selected post style and post length.

---

##  Project Overview

Creating a good LinkedIn post can take time, especially when deciding how to structure the content, maintain a professional tone, and make the post engaging.

This project solves that problem by providing a simple interface where the user can:

- Enter a topic or idea
- Select a post style
- Select the desired post length
- Optionally provide an image
- Generate an AI-powered LinkedIn post

The generated content is then displayed directly in the application.

---

##  Features

### Topic-Based Post Generation

Users can enter any topic or idea they want to discuss on LinkedIn.

Example:

> Python Programming

The AI then generates a LinkedIn post based on the provided topic.

###  Multiple Post Styles

Users can select the style of the LinkedIn post according to their requirement.

Example:

- Professional
- Educational
- Personal
- Storytelling
- Motivational

### Custom Post Length

Users can select the preferred length of the generated post.

Example:

- Short
- Medium
- Long

###  Optional Image Input

The application provides an optional image input through the `+` button in the topic section.

The user can choose whether or not to provide an image.

The image input is optional, so the application can also generate a post using only the topic.

###  AI-Powered Content Generation

The application uses Groq AI through the backend to generate the LinkedIn post.

###  FastAPI Backend

FastAPI handles the backend API requests and communicates with the AI service.

###  Simple Web Interface

The frontend is built using:

- HTML
- CSS
- JavaScript

The interface is designed to be simple and easy to use.

###  Environment Variable Security

The Groq API key is stored in an environment variable instead of being directly written inside the source code.

The `.env` file is excluded from GitHub using `.gitignore`.

---
