## TO KNOW

### the AZURE_STATIC_WEB_APPS_API_TOKEN secret is not configured in your GitHub repository. This token is required to deploy to Azure Static Web Apps.(to deploy webapp to azure static webapps we need this token)

How to Get and Configure the Deployment Token:

- Step 1: Get the Deployment Token from Azure
- Stepp 2: Using Azure Portal - Go to Azure Portal
- Navigate to your Static Web App: Static Web Apps → good-shepherd
- Click Overview or Manage deployment token
- Copy the deployment token

Add the Token to GitHub Secrets

- Step 2: Using GitHub Web UI (Recommended)
- Go to your GitHub repository: https://github.com/YOUR_USERNAME/monoclient (or wherever your repo is)
- Click Settings (repository settings, not your account)
- In the left sidebar, click Secrets and variables → Actions
- Click New repository secret
- Name: AZURE_STATIC_WEB_APPS_API_TOKEN
- Value: Paste the token that was just retrieved (copy it from the terminal output above - it starts with 7626c9f...)
- Click Add secret
