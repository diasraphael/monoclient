# 🚀 GitHub Actions Workflows Guide

This folder contains CI/CD workflows for automatic deployment to Azure.

---

## 📁 Current Workflows

### `azure-static-web-apps-good-shepherd.yml`

**Purpose**: Automatically builds and deploys the good-shepherd app to Azure Static Web Apps

**Triggers**:

1. ✅ **Push to main branch** (automatic)
2. ✅ **Pull Request** (preview deployment)
3. ✅ **Manual trigger** (workflow_dispatch)

---

## 🔄 How Deployments Work

### Automatic Deployment (Push to Main)

```bash
# When you push code:
git add .
git commit -m "Update good-shepherd app"
git push origin main
```

**What happens:**

1. GitHub detects changes in `monoclient/apps/good-shepherd/` or `monoclient/packages/`
2. Workflow starts automatically
3. Installs dependencies with pnpm
4. Builds the Next.js app
5. Deploys to Azure Static Web Apps
6. Your app is live in ~3-5 minutes! 🎉

---

### Pull Request Preview

```bash
# When you create a PR:
git checkout -b feature/new-feature
git push origin feature/new-feature
# Create PR on GitHub
```

**What happens:**

1. Workflow creates a **preview deployment**
2. You get a unique URL to test changes
3. Preview URL is posted as a comment on the PR
4. When PR is closed, preview is deleted

---

### Manual Deployment

**From GitHub UI:**

1. Go to your repository on GitHub
2. Click **"Actions"** tab
3. Select **"Deploy Good Shepherd to Azure Static Web Apps"**
4. Click **"Run workflow"** button
5. Select branch (usually `main`)
6. Click **"Run workflow"**

**Manually triggers a deployment without pushing code!**

---

## 🔐 Required GitHub Secrets

The workflow needs these secrets to work:

### Setup Instructions:

1. **Go to GitHub**: Your repo → Settings → Secrets and variables → Actions

2. **Add these secrets**:

| Secret Name                          | Where to Get It                 | Required? |
| ------------------------------------ | ------------------------------- | --------- |
| `AZURE_STATIC_WEB_APPS_API_TOKEN`    | `terraform output -raw api_key` | ✅ YES    |
| `STRIPE_SECRET_KEY`                  | Stripe Dashboard                | ✅ YES    |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard                | ✅ YES    |
| `NEXT_PUBLIC_APP_URL`                | Your Azure app URL              | ✅ YES    |

### Get Azure API Token:

```bash
cd monoclient/terraform/apps/good-shepherd
terraform output -raw api_key
```

Copy the output and add as `AZURE_STATIC_WEB_APPS_API_TOKEN` secret.

---

## 📊 Workflow Breakdown

### Step 1: Checkout Code

```yaml
- uses: actions/checkout@v3
```

Downloads your repository code.

### Step 2: Setup pnpm

```yaml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 9.15.0
```

Installs pnpm for monorepo dependency management.

### Step 3: Setup Node.js

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v3
  with:
    node-version: "18"
    cache: "pnpm"
```

Installs Node.js 18 with pnpm caching for faster builds.

### Step 4: Install Dependencies

```yaml
- name: Install dependencies
  working-directory: ./monoclient
  run: pnpm install
```

Installs all dependencies from your monorepo.

### Step 5: Build App

```yaml
- name: Build Good Shepherd app
  working-directory: ./monoclient
  run: pnpm build:shepherd
  env:
    STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: ${{ secrets.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY }}
    NEXT_PUBLIC_APP_URL: ${{ secrets.NEXT_PUBLIC_APP_URL }}
```

Builds your Next.js app with environment variables.

### Step 6: Deploy to Azure

```yaml
- name: Deploy to Azure Static Web Apps
  uses: Azure/static-web-apps-deploy@v1
  with:
    azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
    repo_token: ${{ secrets.GITHUB_TOKEN }}
    action: "upload"
    app_location: "/monoclient/apps/good-shepherd"
    output_location: ".next"
    skip_app_build: true
```

Uploads the built app to Azure.

---

## 🎯 Triggering Deployments

### Automatic Triggers:

**1. Any push to main that changes:**

- `monoclient/apps/good-shepherd/**` (your app code)
- `monoclient/packages/**` (shared packages)

**2. Pull requests that change the same paths**

### Manual Trigger:

**Via GitHub UI:**

```
GitHub → Actions → Deploy Good Shepherd → Run workflow
```

**Via GitHub CLI:**

```bash
gh workflow run "Deploy Good Shepherd to Azure Static Web Apps"
```

**Via API:**

```bash
curl -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/actions/workflows/azure-static-web-apps-good-shepherd.yml/dispatches \
  -d '{"ref":"main"}'
```

---

## 🔍 Monitoring Deployments

### View Workflow Runs:

1. **GitHub**: Repository → Actions tab
2. See all workflow runs, their status, and logs
3. Click on a run to see detailed logs

### Deployment Status:

- ✅ **Green checkmark**: Deployment successful
- ❌ **Red X**: Deployment failed (check logs)
- 🟡 **Yellow dot**: Deployment in progress

### View Logs:

1. Click on a workflow run
2. Click on "Build and Deploy" job
3. Expand each step to see logs
4. Look for errors if deployment failed

---

## 🚨 Troubleshooting

### Deployment Fails: "API token invalid"

**Problem**: `AZURE_STATIC_WEB_APPS_API_TOKEN` is missing or wrong

**Solution**:

```bash
# Get the correct token
cd monoclient/terraform/apps/good-shepherd
terraform output -raw api_key

# Update GitHub secret with this value
```

### Deployment Fails: "Build error"

**Problem**: Build fails during `pnpm build:shepherd`

**Solution**:

1. Check the build logs in GitHub Actions
2. Test build locally:
   ```bash
   cd monoclient
   pnpm install
   pnpm build:shepherd
   ```
3. Fix errors locally, then push

### Deployment Doesn't Trigger

**Problem**: Pushed code but workflow didn't run

**Possible causes**:

1. **Changed files outside monitored paths**
   - Workflow only triggers for changes in `monoclient/apps/good-shepherd/**` or `monoclient/packages/**`
   - Solution: Manually trigger or update paths in workflow

2. **Pushed to wrong branch**
   - Workflow only triggers on `main` branch
   - Solution: Push to main or update workflow to include your branch

3. **Workflow file has errors**
   - YAML syntax error
   - Solution: Check workflow file syntax

### Environment Variables Not Working

**Problem**: App deployed but Stripe doesn't work

**Solution**:

1. Check secrets are added in GitHub: Settings → Secrets → Actions
2. Verify secret names match exactly (case-sensitive)
3. Redeploy after adding secrets

---

## 📝 Workflow File Location

```
monoclient/
└── .github/
    └── workflows/
        └── azure-static-web-apps-good-shepherd.yml
```

**This file should be committed to Git!** ✅

---

## 🔄 Updating the Workflow

### To change when it triggers:

Edit the `on:` section:

```yaml
on:
  push:
    branches:
      - main
      - develop # Add more branches
    paths:
      - "monoclient/apps/good-shepherd/**"
      - "monoclient/packages/**"
      - "monoclient/apps/shared/**" # Add more paths
```

### To change build command:

Edit the build step:

```yaml
- name: Build Good Shepherd app
  working-directory: ./monoclient
  run: pnpm build:shepherd # Change this command
```

### To add more environment variables:

Add to the `env:` section:

```yaml
env:
  STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
  NEW_VARIABLE: ${{ secrets.NEW_VARIABLE }} # Add here
```

---

## 🎯 Best Practices

### 1. Test Locally First

```bash
# Always test build locally before pushing
cd monoclient
pnpm install
pnpm build:shepherd
```

### 2. Use Pull Requests

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes, commit, push
git push origin feature/new-feature

# Create PR → Gets preview deployment
# Test preview → Merge to main → Auto-deploys to production
```

### 3. Monitor Deployments

- Check GitHub Actions after every push
- Verify deployment succeeded
- Test the live site

### 4. Keep Secrets Updated

- Rotate API keys regularly
- Update GitHub secrets when keys change
- Never commit secrets to code!

---

## 📊 Deployment Timeline

```
Push to GitHub
    ↓
GitHub detects changes (instant)
    ↓
Workflow starts (~10 seconds)
    ↓
Setup environment (~30 seconds)
    ↓
Install dependencies (~1-2 minutes)
    ↓
Build app (~1-2 minutes)
    ↓
Deploy to Azure (~30 seconds)
    ↓
App is live! (~3-5 minutes total)
```

---

## ✅ Quick Reference

### Deploy Commands:

```bash
# Automatic deployment
git push origin main

# Manual deployment
# Go to GitHub → Actions → Run workflow

# Check deployment status
# Go to GitHub → Actions → View runs
```

### Get API Token:

```bash
cd monoclient/terraform/apps/good-shepherd
terraform output -raw api_key
```

### View Deployment URL:

```bash
terraform output app_url
```

---

## 🎉 Summary

Your workflow is configured to:

- ✅ Auto-deploy on push to main
- ✅ Create preview deployments for PRs
- ✅ Allow manual triggering
- ✅ Build with pnpm (monorepo support)
- ✅ Include Stripe environment variables
- ✅ Deploy to Azure Static Web Apps

**Everything is ready! Just push your code and it deploys automatically!** 🚀
