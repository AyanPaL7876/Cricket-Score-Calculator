# Cricket Score Calculator

This project is a Cricket Score Calculator, a web application for tracking and displaying cricket match scores in real-time. The application is built with React, using Tailwind CSS for styling.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Components](#components)
- [Usage](#usage)

## Features

- Input teams, toss winner, and over limit.
- Real-time score updates for each ball, including runs, wickets, extras (no balls, wides, byes, leg byes).
- Displays current run rate (CRR) and required run rate (RRR) during the chase.
- Determines and displays match results.
- Simple and interactive UI with animations for winning moments.

## Getting Started

### Prerequisites

- Node.js (>=14.0.0)
- npm (>=6.0.0)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/AyanPaL7876/Cricket-Score-Calculator
    cd cricket-score-calculator
    ```

2. Install the dependencies:

    ```bash
    npm i
    ```

### Running the Application

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Open your browser to see the application.

## Components

- **App**: The main component that manages the state and renders other components.
- **UserInput**: Handles user input for team names, toss winner, and over limit.
- **CalculateScore**: Manages the score calculation logic and displays the score, run rate, and match status.
- **ButtonsContainer**: Contains buttons for different scoring actions (runs, wickets, extras).
- **ButtonsGroup**: Groups buttons based on scoring actions.
- **DisplayButton**: Renders individual buttons for scoring actions.
- **WinAnimation**: Displays an animation when a team wins.

## Usage

1. Fill in the details for the match in the `UserInput` form:
   - Batting team name
   - Bowling team name
   - Toss winner
   - Total overs

2. Submit the form to start the match.

3. Use the buttons to update the score as the match progresses. The score, current run rate, and required run rate will be displayed in real-time.

4. The application will determine and display the match result once the match ends.

