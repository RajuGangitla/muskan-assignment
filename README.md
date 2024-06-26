# Project Name

## Overview

This project is a Next.js application that integrates with the Jira API to fetch and display issues. It includes pagination and status filtering features.

## Environment Variables

This project relies on several environment variables to interact with external services securely. Follow the instructions below to set up the environment variables.

### Required Environment Variables

1. **NEXT_PUBLIC_DOMAIN**: The domain of your Jira instance.
2. **NEXT_PUBLIC_EMAIL**: The email associated with your Jira account.
3. **NEXT_PUBLIC_JIRA_TOKEN**: The API token for authenticating requests to the Jira API.

### Setting Up Environment Variables

#### Local Development

1. Create a `.env.local` file in the root of your project.
2. Add the following environment variables to the `.env.local` file:

   ```env
   NEXT_PUBLIC_DOMAIN=your_jira_domain.atlassian.net
   NEXT_PUBLIC_EMAIL=your_email@example.com
   NEXT_PUBLIC_JIRA_TOKEN=your_api_token
   ```

#### Production Deployment

##### Vercel

1. Go to your project in the [Vercel dashboard](https://vercel.com/dashboard).
2. Navigate to the **Settings** tab.
3. Go to **Environment Variables**.
4. Add each environment variable (`NEXT_PUBLIC_DOMAIN`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_JIRA_TOKEN`) and their respective values.
5. Deploy your project.

##### GitHub Actions

1. Go to your repository on [GitHub](https://github.com/).
2. Navigate to the **Settings** tab.
3. Go to **Secrets and variables** > **Actions**.
4. Click **New repository secret** and add each of the following names with their respective values:

   - `NEXT_PUBLIC_DOMAIN`
   - `NEXT_PUBLIC_EMAIL`
   - `NEXT_PUBLIC_JIRA_TOKEN`

### Important Notes

- **Do not commit** the `.env.local` file to version control. Ensure it is listed in your `.gitignore` file.
- Keep your API tokens and secrets secure. Never expose them in your codebase or version control system.

## Running the Project

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the project.

## Project Structure
