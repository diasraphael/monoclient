# 🔐 Security Guide - What to Commit vs Ignore

This guide explains what should and shouldn't be committed to GitHub.

---

## ⚠️ CRITICAL: Never Commit These Files!

### 🚫 Files That Contain Secrets (Already in .gitignore)

```
❌ terraform.tfvars           # YOUR real subscription ID, secrets
❌ terraform.tfstate          # Contains resource IDs, may have secrets
❌ terraform.tfstate.backup   # Backup of state file
❌ .terraform/                # Downloaded provider plugins
❌ *.tfvars (except .example) # Any actual variable files
```

**These files are already protected by `.gitignore`** ✅

---

## ✅ Safe to Commit (Should be in Git)

```
✅ main.tf                    # Infrastructure code (no secrets)
✅ variables.tf               # Variable definitions (no values)
✅ terraform.tfvars.example   # Template with PLACEHOLDERS only
✅ .gitignore                 # Protection rules
✅ README.md                  # Documentation
✅ *.ps1 scripts              # Helper scripts (no secrets)
```

---

## 📋 Current .gitignore Status

Your terraform/.gitignore already protects:

```gitignore
# Terraform state files (contain resource info)
*.tfstate
*.tfstate.*

# Variable files (contain YOUR secrets)
*.tfvars
*.tfvars.json

# Downloaded providers
**/.terraform/*

# Other sensitive files
crash.log
*.log
override.tf
*_override.tf
```

**✅ This is correct!**

---

## 🔍 Check What's Being Tracked

Run these commands to verify:

```bash
cd monoclient/terraform

# Check if any .tfvars files are tracked
git ls-files | grep tfvars

# Should ONLY show:
# terraform/shared/terraform.tfvars.example
# terraform/apps/good-shepherd/terraform.tfvars.example
```

---

## 🛡️ Security Best Practices

### 1. Example Files (\*.tfvars.example)

**✅ DO:**

- Use placeholders: `"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"`
- Include comments explaining where to get values
- Commit to Git

**❌ DON'T:**

- Put real subscription IDs
- Put real API keys
- Put real secrets

**Example (CORRECT):**

```hcl
# terraform.tfvars.example
subscription_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # Get from: az account show
stripe_key      = "sk_test_xxxxxxxxxxxxx"                 # Get from Stripe dashboard
```

### 2. Actual Values Files (\*.tfvars)

**✅ DO:**

- Keep locally only (gitignored)
- Use real values here
- Never commit to Git

**Example:**

```hcl
# terraform.tfvars (NOT committed)
subscription_id = "c71e0637-ff4d-45db-a607-aff42768e3b6"  # Real ID
stripe_key      = "sk_test_51Abc123..."                   # Real key
```

### 3. Environment Variables (Alternative)

Instead of `.tfvars` files, use environment variables:

```bash
# Set in your terminal (not committed anywhere)
export TF_VAR_subscription_id="c71e0637-ff4d-45db-a607-aff42768e3b6"
export TF_VAR_stripe_key="sk_test_51..."

# Then run terraform
terraform apply
```

**Benefits:**

- No files to accidentally commit
- Better for CI/CD pipelines
- Can use different values per terminal session

---

## 🚨 If You Accidentally Committed Secrets

### Step 1: Remove from Git History

```bash
# Remove the file from Git (keeps local copy)
git rm --cached terraform/shared/terraform.tfvars

# Commit the removal
git commit -m "Remove secrets file from Git"
git push
```

### Step 2: Rotate All Secrets

If you committed real secrets:

1. **Subscription**: Create new service principal (if used)
2. **API Keys**: Regenerate in Azure portal
3. **Stripe Keys**: Regenerate in Stripe dashboard

### Step 3: Clean Git History (Nuclear Option)

If secrets are in history:

```bash
# Use git-filter-repo or BFG Repo-Cleaner
# See: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository
```

---

## 📝 Quick Security Checklist

Before pushing to GitHub:

- [ ] Check no `.tfvars` files are staged: `git status`
- [ ] Verify `.gitignore` includes `*.tfvars`
- [ ] Confirm example files have placeholders only
- [ ] No real subscription IDs in example files
- [ ] No real API keys anywhere in tracked files
- [ ] State files are gitignored
- [ ] `.terraform/` folder is gitignored

**Run this check:**

```bash
# Search for potential secrets in staged files
git diff --cached | grep -E "(subscription_id|api_key|secret|password)" | grep -v "xxxxx"
```

---

## 🔐 Recommended: Use Azure Key Vault

For production, store secrets in Azure Key Vault:

```hcl
# Reference secrets from Key Vault
data "azurerm_key_vault_secret" "subscription_id" {
  name         = "subscription-id"
  key_vault_id = azurerm_key_vault.main.id
}

resource "azurerm_resource_group" "example" {
  # Use secret from Key Vault
  # subscription_id = data.azurerm_key_vault_secret.subscription_id.value
}
```

---

## 📊 What's Safe to Share Publicly?

| Item                    | Safe to Share? | Why                               |
| ----------------------- | -------------- | --------------------------------- |
| **Subscription ID**     | ⚠️ Maybe       | Not a secret, but limits exposure |
| **Resource Group Name** | ✅ Yes         | Just a name, no access            |
| **Location**            | ✅ Yes         | Public info                       |
| **Terraform Code**      | ✅ Yes         | Infrastructure as Code            |
| **State Files**         | ❌ No          | Contains resource IDs and details |
| **API Keys**            | ❌ NO!         | Direct access to services         |
| **Connection Strings**  | ❌ NO!         | Contains credentials              |

---

## 🎯 Summary

### Always Git Ignore:

```
*.tfvars
*.tfstate
*.tfstate.*
.terraform/
```

### Safe to Commit:

```
main.tf
variables.tf
*.tfvars.example (with placeholders!)
README.md
.gitignore
```

### Use for Secrets:

1. Local `terraform.tfvars` files (gitignored)
2. Environment variables (`TF_VAR_*`)
3. Azure Key Vault (production)

---

## ✅ Your Setup Status

- [x] `.gitignore` is properly configured
- [x] Example files updated with placeholders
- [x] Real secrets should be in `terraform.tfvars` (not committed)
- [x] Infrastructure code is safe to commit

**You're secure!** 🎉

---

**Remember**: When in doubt, DON'T commit it. You can always add files later, but removing secrets from Git history is hard!
