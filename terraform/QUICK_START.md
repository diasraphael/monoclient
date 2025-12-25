# 🚀 Quick Start - Organized Terraform Structure

Deploy your infrastructure in the correct order with this quick guide.

---

## 📋 Prerequisites

```bash
# Install Terraform
winget install HashiCorp.Terraform

# Login to Azure
az login

# Get your subscription ID
az account show --subscription "good-shepherd" --query id -o tsv
```

---

## 🎯 Deployment Order

### Step 1: Deploy Shared Infrastructure (5 min)

```bash
cd terraform/shared

# Configure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars - add your subscription ID

# Deploy
terraform init
terraform apply
```

**Creates**: Resource group `my-apps-rg` ✓

---

### Step 2: Deploy Good Shepherd App (5 min)

```bash
cd terraform/apps/good-shepherd

# Configure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars - add your subscription ID

# Deploy
terraform init
terraform apply
```

**Creates**: Static Web App `good-shepherd-app` ✓

---

### Step 3: Get Deployment Token (1 min)

```bash
cd terraform/apps/good-shepherd

# Get API key
terraform output -raw api_key
```

**Add to GitHub**:

- Go to GitHub → Settings → Secrets → Actions
- Create secret: `AZURE_STATIC_WEB_APPS_API_TOKEN`
- Paste the API key

---

### Step 4: Get App URL (1 min)

```bash
cd terraform/apps/good-shepherd
terraform output app_url
```

Visit the URL - your app is live! 🎉

---

## 📊 What You Created

```
Azure Subscription: good-shepherd
└── Resource Group: my-apps-rg
    └── Static Web App: good-shepherd-app
        ├── URL: https://good-shepherd-app.azurestaticapps.net
        ├── Bandwidth: 100 GB/month (FREE)
        └── Cost: $0/month ✓
```

---

## 🆕 Adding More Apps

```bash
# Copy good-shepherd folder
cp -r terraform/apps/good-shepherd terraform/apps/app-2

cd terraform/apps/app-2

# Edit terraform.tfvars
# Change app_name to "app-2"

# Deploy
terraform init
terraform apply
```

Each app is independent! ✨

---

## 🔧 Useful Commands

```bash
# View what will be created
terraform plan

# Create/update resources
terraform apply

# View current state
terraform show

# Get outputs
terraform output

# Destroy resources
terraform destroy
```

---

## 📚 More Info

- **Full Documentation**: [README.md](./README.md)
- **Shared Infrastructure**: [shared/README.md](./shared/README.md)
- **Good Shepherd App**: [apps/good-shepherd/README.md](./apps/good-shepherd/README.md)

---

**Total Time: ~15 minutes**  
**Total Cost: $0/month** 🎉
