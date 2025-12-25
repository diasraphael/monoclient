# Good Shepherd App - Terraform Configuration

This folder manages Azure resources specifically for the good-shepherd app.

## What This Creates

- **Azure Static Web App** (Free tier)
- **Custom domain configuration** (optional)

## Prerequisites

1. ✅ Shared infrastructure deployed (`terraform/shared`)
2. ✅ Resource group exists: `my-apps-rg`
3. ✅ GitHub repository connected

## Quick Start

```bash
cd terraform/apps/good-shepherd

# Configure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your subscription ID

# Deploy
terraform init
terraform apply
```

## After Deployment

1. Get the API key:

```bash
terraform output -raw api_key
```

2. Add to GitHub Secrets:
   - Go to GitHub → Settings → Secrets → Actions
   - Add secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: (paste the API key)

3. Get the app URL:

```bash
terraform output app_url
```

4. Visit your app at the URL shown!

## Environment Variables

To add Stripe keys and other environment variables:

1. Go to Azure Portal
2. Navigate to your Static Web App
3. Configuration → Application settings
4. Add:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_APP_URL`

Or use Azure CLI:

```bash
az staticwebapp appsettings set \
  --name good-shepherd-app \
  --setting-names \
    STRIPE_SECRET_KEY=sk_test_your_key \
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key \
    NEXT_PUBLIC_APP_URL=https://good-shepherd-app.azurestaticapps.net
```

## Outputs

```bash
# Get all outputs
terraform output

# Get specific output
terraform output app_url
terraform output -raw api_key
```

---

## 🗑️ Deleting the App

To delete the good-shepherd app:

```bash
cd terraform/apps/good-shepherd

# Preview what will be deleted
terraform plan -destroy

# Delete the app
terraform destroy

# Or use the safe script (recommended)
.\destroy.ps1
```

**✅ This only deletes this app**, not the resource group or other apps.

To recreate: just run `terraform apply` again
