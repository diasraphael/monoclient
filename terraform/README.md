# Terraform Infrastructure - Organized Structure

Infrastructure as Code for your Azure resources, organized by shared and app-specific resources.

---

## 📁 Directory Structure

```
terraform/
├── shared/                    # Shared infrastructure
│   ├── main.tf               # Resource group, Cosmos DB
│   ├── variables.tf
│   ├── terraform.tfvars.example
│   └── README.md
│
├── apps/                      # App-specific infrastructure
│   ├── good-shepherd/        # Good Shepherd app
│   │   ├── main.tf          # Static Web App for good-shepherd
│   │   ├── variables.tf
│   │   ├── terraform.tfvars.example
│   │   └── README.md
│   │
│   ├── app-2/               # Future: Your second app
│   └── app-3/               # Future: Your third app
│
└── README.md                 # This file
```

---

## 🎯 Architecture Overview

### Deployment Order:

```
1. terraform/shared/           Deploy FIRST
   └── Creates: Resource Group, (optional) Cosmos DB

2. terraform/apps/good-shepherd/   Deploy SECOND
   └── Creates: Static Web App for good-shepherd

3. terraform/apps/app-2/      Deploy for each additional app
   └── Creates: Static Web App for app-2
```

### Why This Structure?

✅ **Separation of Concerns**: Shared resources separate from app-specific  
✅ **Independent State**: Each app has its own Terraform state  
✅ **Easier Management**: Update one app without affecting others  
✅ **Scalability**: Easy to add new apps  
✅ **Team Collaboration**: Different teams can manage different apps

---

## 🚀 Quick Start

### Step 1: Install Prerequisites

```bash
# Install Terraform
winget install HashiCorp.Terraform

# Login to Azure
az login

# Set subscription
az account set --subscription "good-shepherd"

# Get subscription ID
az account show --query id -o tsv
```

### Step 2: Deploy Shared Infrastructure

```bash
cd terraform/shared

# Configure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your subscription ID

# Deploy
terraform init
terraform apply
```

**Result:** Resource group `my-apps-rg` created ✓

### Step 3: Deploy Good Shepherd App

```bash
cd terraform/apps/good-shepherd

# Configure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your subscription ID

# Deploy
terraform init
terraform apply
```

**Result:** Static Web App `good-shepherd-app` created ✓

### Step 4: Get Deployment Token

```bash
# Get the API key for GitHub Actions
terraform output -raw api_key
```

Copy this and add to GitHub Secrets as `AZURE_STATIC_WEB_APPS_API_TOKEN`

---

## 📊 What Gets Created

### After Step 2 (Shared):

```
Azure Subscription: good-shepherd
└── Resource Group: my-apps-rg
    ├── Location: West Europe
    ├── Status: Ready
    └── (Optional) Cosmos DB: 25 GB free
```

### After Step 3 (Good Shepherd):

```
Azure Subscription: good-shepherd
└── Resource Group: my-apps-rg
    ├── Static Web App: good-shepherd-app
    │   ├── SKU: Free
    │   ├── URL: https://good-shepherd-app.azurestaticapps.net
    │   └── Bandwidth: 100 GB/month
    └── (Optional) Cosmos DB: shared across all apps
```

---

## 🔧 Common Tasks

### Deploy Shared Infrastructure

```bash
cd terraform/shared
terraform init
terraform apply
```

### Deploy Good Shepherd App

```bash
cd terraform/apps/good-shepherd
terraform init
terraform apply
```

### Update Good Shepherd App

```bash
cd terraform/apps/good-shepherd
terraform apply
```

### Get App URL

```bash
cd terraform/apps/good-shepherd
terraform output app_url
```

### Get API Key for GitHub

```bash
cd terraform/apps/good-shepherd
terraform output -raw api_key
```

### Destroy Good Shepherd App (careful!)

```bash
cd terraform/apps/good-shepherd
terraform destroy
```

### View All Resources

```bash
# Shared
cd terraform/shared
terraform state list

# Good Shepherd
cd terraform/apps/good-shepherd
terraform state list
```

---

## 🆕 Adding a New App

### Step 1: Copy Template

```bash
# Copy good-shepherd folder as template
cp -r terraform/apps/good-shepherd terraform/apps/app-2
```

### Step 2: Update Configuration

Edit `terraform/apps/app-2/terraform.tfvars`:

```hcl
subscription_id     = "your-subscription-id"
resource_group_name = "my-apps-rg"  # Same resource group
app_name           = "app-2"         # Different app name
location           = "West Europe"
environment        = "production"
```

### Step 3: Deploy

```bash
cd terraform/apps/app-2
terraform init
terraform apply
```

**Done!** New app created in same resource group ✓

---

## 💰 Cost Management

### All Resources Are FREE!

- **Shared Resource Group**: Free
- **Static Web Apps**: Free tier (100 GB bandwidth each)
- **Cosmos DB** (optional): Free tier (25 GB)

### Verify Zero Cost:

```bash
# Azure Portal → Cost Management + Billing
# Should show: $0.00
```

### Set Budget Alert:

```bash
az consumption budget create \
  --amount 1 \
  --budget-name stay-free \
  --resource-group my-apps-rg \
  --time-grain Monthly
```

---

## 🔐 Security Best Practices

### 1. Never Commit Secrets

Already protected by `.gitignore` in each folder:

```
*.tfvars
*.tfstate
*.tfstate.backup
.terraform/
```

### 2. Use Environment Variables

Instead of `terraform.tfvars`, you can use:

```bash
export TF_VAR_subscription_id="your-id"
export TF_VAR_resource_group_name="my-apps-rg"
terraform apply
```

### 3. Secure State Files

For production, use remote state:

```hcl
# In main.tf
terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "tfstate12345"
    container_name       = "tfstate"
    key                  = "good-shepherd.terraform.tfstate"
  }
}
```

---

## 📈 Scaling Strategy

### Current: All Apps in One Resource Group

```
Resource Group: my-apps-rg
├── good-shepherd-app (100 GB bandwidth)
├── app-2 (100 GB bandwidth)
├── app-3 (100 GB bandwidth)
└── Shared Cosmos DB (25 GB)
```

### Future: Separate Resource Groups per App

```
Resource Group: good-shepherd-rg
└── good-shepherd-app

Resource Group: app-2-rg
└── app-2

Resource Group: app-3-rg
└── app-3
```

**When to separate?**

- App needs isolation
- Different teams manage different apps
- Different billing requirements

---

## 🔄 State Management

### Current: Local State

Each folder has its own `terraform.tfstate` file (gitignored).

**Pros:**

- Simple to get started
- No additional setup

**Cons:**

- State files stored locally
- Difficult for team collaboration
- Risk of state file loss

### Recommended: Remote State in Azure

Store state in Azure Storage Account:

**Benefits:**

- ✅ Team collaboration
- ✅ State locking (prevents conflicts)
- ✅ Secure and backed up
- ✅ Version history

**Setup:**

1. Create storage account:

```bash
az storage account create \
  --name tfstate12345 \
  --resource-group my-apps-rg \
  --location westeurope \
  --sku Standard_LRS
```

2. Create container:

```bash
az storage container create \
  --name tfstate \
  --account-name tfstate12345
```

3. Update each `main.tf`:

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "my-apps-rg"
    storage_account_name = "tfstate12345"
    container_name       = "tfstate"
    key                  = "shared.terraform.tfstate"  # unique per folder
  }
}
```

---

## 🆘 Troubleshooting

### Error: "Resource group not found" (in app deployment)

**Solution**: Deploy shared infrastructure first:

```bash
cd terraform/shared
terraform apply
```

### Error: "Subscription not found"

**Solution**:

```bash
az account list --output table
az account set --subscription "good-shepherd"
```

### Error: "State locked"

**Solution**: Previous operation didn't complete:

```bash
terraform force-unlock LOCK_ID
```

### Want to start fresh?

**For one app:**

```bash
cd terraform/apps/good-shepherd
rm -rf .terraform terraform.tfstate*
terraform init
```

**For all:**

```bash
# In each folder
find terraform -name ".terraform" -type d -exec rm -rf {} +
find terraform -name "terraform.tfstate*" -exec rm {} +
```

---

## 📚 Documentation

- **Shared Infrastructure**: [terraform/shared/README.md](./shared/README.md)
- **Good Shepherd App**: [terraform/apps/good-shepherd/README.md](./apps/good-shepherd/README.md)
- **Terraform Docs**: [terraform.io/docs](https://www.terraform.io/docs)
- **Azure Provider**: [registry.terraform.io/providers/hashicorp/azurerm](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)

---

## ✅ Deployment Checklist

### Initial Setup:

- [ ] Terraform installed
- [ ] Azure CLI installed and logged in
- [ ] Subscription ID obtained
- [ ] Configured `terraform/shared/terraform.tfvars`
- [ ] Deployed shared infrastructure
- [ ] Verified resource group created

### Per App:

- [ ] Copied app template or configured from scratch
- [ ] Updated `terraform.tfvars` with unique app name
- [ ] Ran `terraform init`
- [ ] Ran `terraform apply`
- [ ] Got API key: `terraform output -raw api_key`
- [ ] Added API key to GitHub Secrets
- [ ] Configured app environment variables in Azure Portal
- [ ] Verified app is accessible

---

## 💡 Pro Tips

### 1. Use Workspaces for Environments

```bash
terraform workspace new dev
terraform workspace new staging
terraform workspace new production

terraform workspace select dev
terraform apply
```

### 2. Format All Code

```bash
# From terraform root
terraform fmt -recursive
```

### 3. Validate Before Apply

```bash
terraform validate
terraform plan
terraform apply
```

### 4. Output All Values

```bash
# Get all outputs from all apps
cd terraform/shared && terraform output
cd terraform/apps/good-shepherd && terraform output
```

### 5. Graph Your Infrastructure

```bash
terraform graph | dot -Tsvg > graph.svg
```

---

## 🎯 Summary

### What You Have:

✅ **Organized structure**: Shared vs app-specific  
✅ **Scalable**: Easy to add new apps  
✅ **Independent state**: Apps don't interfere  
✅ **Professional setup**: Industry best practices  
✅ **All FREE**: Using Azure free tier

### Deployment Order:

```
1. terraform/shared           → Resource group
2. terraform/apps/good-shepherd → First app
3. terraform/apps/app-2        → Second app (when ready)
4. terraform/apps/app-N        → More apps (as needed)
```

### Monthly Cost: $0 🎉

---

**Ready to deploy? Start with `terraform/shared/`!** 🚀
