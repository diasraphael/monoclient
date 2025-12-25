# Shared Infrastructure

This folder manages shared Azure resources used across all apps.

## What This Creates

- **Resource Group**: Shared resource group for all apps
- **Cosmos DB** (optional): Shared database (25 GB free tier)

## Quick Start

### Creating Resources

```bash
cd terraform/shared

# Configure
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your subscription ID

# Deploy
terraform init
terraform apply
```

### Deleting Resources

```bash
cd terraform/shared

# Preview what will be deleted
terraform plan -destroy

# Delete all resources
terraform destroy

# Or use the safe script (recommended)
.\destroy.ps1
```

**⚠️ Warning**: This deletes ALL apps in the resource group!

See [DESTROY.md](./DESTROY.md) for detailed destruction guide.

## Usage

Deploy this **first** before deploying individual apps.

Apps reference this resource group when creating their resources.

isses:

- terraform cmd not found

export PATH=$PATH:"/c/Users/iamra/AppData/Local/Microsoft/WinGet/Packages/Hashicorp.Terraform_Microsoft.Winget.Source_8wekyb3d8bbwe"

# 🗑️ Destroying Shared Infrastructure

This guide shows how to safely delete the shared infrastructure using Terraform.

---

## ⚠️ WARNING

**Destroying shared infrastructure will:**

- ❌ Delete the resource group `my-apps-rg`
- ❌ Delete ALL resources inside it (including all apps!)
- ❌ Delete Cosmos DB and all data (if created)
- ❌ This action CANNOT be undone!

**Before destroying, ensure:**

- [ ] All apps are backed up or no longer needed
- [ ] All data is backed up (especially Cosmos DB)
- [ ] You've informed your team
- [ ] You understand this is permanent

---

## 🔍 Preview What Will Be Deleted

**Always preview first:**

```bash
cd terraform/shared

# See what will be destroyed (dry run)
terraform plan -destroy
```

This shows everything that will be deleted WITHOUT actually deleting it.

---

## 🗑️ Option 1: Destroy Everything (Recommended)

**Using Terraform destroy command:**

```bash
cd terraform/shared

# Destroy all resources
terraform destroy
```

Terraform will:

1. Show you what will be deleted
2. Ask for confirmation: type `yes`
3. Delete all resources

**Example output:**

```
Plan: 0 to add, 0 to change, 2 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes
```

---

## 🗑️ Option 2: Destroy Without Confirmation

**For automation (use carefully!):**

```bash
cd terraform/shared

# Destroy without prompting
terraform destroy -auto-approve
```

⚠️ **Use this only when you're 100% sure!**

---

## 🗑️ Option 3: Destroy Specific Resources

**Delete only the resource group (not Cosmos DB):**

```bash
cd terraform/shared

# Target specific resource
terraform destroy -target=azurerm_resource_group.shared_rg
```

**Delete only Cosmos DB:**

```bash
cd terraform/shared

# Target Cosmos DB
terraform destroy -target=azurerm_cosmosdb_account.shared_db
```

---

## 🗑️ Option 4: Destroy Using PowerShell Script

I'll create a safe wrapper script:

```powershell
# Run from terraform/shared/
.\destroy.ps1
```

This script:

- ✅ Shows what will be deleted
- ✅ Requires explicit confirmation
- ✅ Logs the destruction
- ✅ Provides rollback guidance

---

## 📋 Safe Destruction Process

### Step 1: Backup Important Data

```bash
# Export Cosmos DB data (if using)
az cosmosdb sql database list --account-name my-apps-cosmosdb --resource-group my-apps-rg

# Backup any important configuration
terraform show > backup-state-$(date +%Y%m%d).txt
```

### Step 2: Destroy Apps First

```bash
# Destroy good-shepherd app first
cd terraform/apps/good-shepherd
terraform destroy

# Destroy other apps...
```

### Step 3: Destroy Shared Infrastructure

```bash
cd terraform/shared
terraform destroy
```

### Step 4: Verify Deletion

```bash
# Check Azure Portal or CLI
az group show --name my-apps-rg
# Should return: ResourceNotFound
```

---

## 🔄 Recreating After Destruction

If you want to recreate everything:

```bash
cd terraform/shared

# Recreate shared infrastructure
terraform apply

cd terraform/apps/good-shepherd
# Recreate good-shepherd app
terraform apply
```

**Note**: This creates NEW resources with NEW IDs. URLs and connection strings will be different!

---

## 🆘 Troubleshooting

### Error: "Resource group not empty"

**Solution**: Delete apps first, then shared resources

```bash
# Delete apps in order
cd terraform/apps/good-shepherd && terraform destroy
cd terraform/apps/app-2 && terraform destroy

# Then delete shared
cd terraform/shared && terraform destroy
```

### Error: "State lock"

**Solution**: Force unlock

```bash
terraform force-unlock LOCK_ID
```

### Want to remove from Terraform without deleting in Azure?

**Solution**: Remove from state

```bash
# Remove from Terraform management (keeps in Azure)
terraform state rm azurerm_resource_group.shared_rg
```

---

## 💡 Alternative: Keep Infrastructure, Clear Data

If you want to keep the infrastructure but clear data:

```bash
# Just clear Cosmos DB collections
az cosmosdb sql container list \
  --account-name my-apps-cosmosdb \
  --database-name mydb \
  --resource-group my-apps-rg

# Delete specific containers (collections)
az cosmosdb sql container delete \
  --account-name my-apps-cosmosdb \
  --database-name mydb \
  --name mycontainer \
  --resource-group my-apps-rg
```

---

## 📊 Cost Check Before Destroying

```bash
# Verify you're paying $0 before destroying
az consumption usage list \
  --start-date 2025-12-01 \
  --end-date 2025-12-31 \
  --query "[?contains(instanceName, 'my-apps')]"
```

Should show $0.00 for free tier resources.

---

## ✅ Destruction Checklist

- [ ] Backed up all important data
- [ ] Informed team members
- [ ] Removed any custom domains (to avoid DNS issues)
- [ ] Exported Terraform state: `terraform state pull > backup.json`
- [ ] Ran `terraform plan -destroy` to preview
- [ ] Destroyed apps first (if any exist)
- [ ] Ready to run `terraform destroy`
- [ ] Confirmed deletion in Azure Portal

---

## 🔐 Safety Features

Terraform provides these safety features:

1. **Preview**: `terraform plan -destroy` shows what will be deleted
2. **Confirmation**: Must type `yes` to confirm
3. **State tracking**: Terraform only deletes resources it created
4. **Dependency order**: Deletes in correct order automatically

---

## 📝 Destruction Log

After destroying, Terraform shows:

```
Destroy complete! Resources: 2 destroyed.
```

Your infrastructure is now deleted from Azure.

---

## 🆘 Emergency Recovery

If you accidentally destroyed something:

### 1. Check if you have backups

```bash
# List Terraform state backups
ls terraform.tfstate.backup
```

### 2. Recreate from code

```bash
terraform apply
```

**Note**: This creates NEW resources. Old data is gone unless backed up separately.

### 3. Azure Recovery (within 14 days for some resources)

```bash
# Some resources can be recovered
az resource show --ids /subscriptions/.../resourceGroups/my-apps-rg
```

---

## 💰 Cost After Destruction

After running `terraform destroy`:

- ✅ Monthly cost: $0 (nothing running)
- ✅ Azure billing stops immediately
- ✅ No hidden charges

---

**Remember**: Destruction is permanent. Always backup first! 🛡️
