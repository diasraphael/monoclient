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

### Step-by-Step: Connect Domeneshop Domain to Vercel

- Step 1: Add Domain in Vercel

1. Go to your Vercel dashboard: vercel.com/dashboard
2. Click on your good-shepherd project
3. Go to Settings → Domains
4. Enter your domain name (e.g., faithbaptistoslo.no or www.faithbaptistoslo.no)
5. Click Add
6. Vercel will show you the DNS records you need to configure.

- Step 2: Choose Your Setup

1. Root Domain (e.g., faithbaptistoslo.no)

```
Type: A
Name: @
Value: 76.76.21.21
```

2. Subdomain (e.g., www.faithbaptistoslo.no)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Recommendation: Use both (root domain + www subdomain) so visitors can access your site either way.

- Step 3: Configure DNS in Domeneshop

1. Log in to Domeneshop:
2. Go to domeneshop.no
3. Click Logg inn
4. Log in with your credentials
5. Go to DNS Settings:
6. Click Domener (Domains)
7. Find your domain
8. Click Endre (Edit) → DNS
9. Add DNS Records:
