# 🌐 Custom Domain Setup Guide

Your app is live! Now let's add your custom domain: `goodshepherdlanka.no`

---

## ✅ App Successfully Created!

**Your App URL**: Check with `terraform output app_url`

**Status**: ✅ Static Web App is running!

---

## 🔧 Fix the Custom Domain Error

### The Issue:

- Azure requires **DNS TXT validation** for apex domains (root domains without `www`)
- Your domain: `goodshepherdlanka.no` is an apex domain
- The Terraform code tried to use CNAME validation (wrong for apex domains)

### The Fix:

✅ **Already applied!** The code now automatically detects apex vs subdomain.

---

## 🚀 Steps to Complete Setup

### Step 1: Apply the Fixed Configuration

```bash
cd /c/raphael/code/progress/monoclient/terraform/apps/good-shepherd
terraform apply
```

Terraform will try to add the custom domain again with the correct validation method.

---

### Step 2: Get the Validation Token

After running `terraform apply`, get the validation token:

```bash
terraform show | grep validation_token
```

Or check in Azure Portal:

1. Go to [portal.azure.com](https://portal.azure.com)
2. Navigate to: Resource groups → faith-baptist-oslo-rg → good-shepherd-app
3. Click "Custom domains"
4. You'll see the TXT record you need to add

---

### Step 3: Add DNS TXT Record

Go to your domain provider (where you bought `goodshepherdlanka.no`) and add:

**DNS Record:**

```
Type: TXT
Name: @ (or root/apex)
Value: <validation token from Azure>
TTL: 3600
```

**Example providers:**

- **Namecheap**: Domain List → Manage → Advanced DNS → Add New Record
- **GoDaddy**: DNS Management → Add → TXT
- **Cloudflare**: DNS → Add record → TXT

---

### Step 4: Verify Domain

After adding the DNS record:

1. Wait 5-15 minutes for DNS propagation
2. Azure will automatically verify the domain
3. Check status in Azure Portal → Custom domains

---

## 📋 Alternative: Use Subdomain Instead

If you want faster setup, use `www.goodshepherdlanka.no`:

### Update terraform.tfvars:

```hcl
custom_domain = "www.goodshepherdlanka.no"  # Use www subdomain
```

### DNS Configuration (easier):

```
Type: CNAME
Name: www
Value: <your-app>.azurestaticapps.net
TTL: 3600
```

CNAME validates faster than TXT!

---

## 🎯 Comparison: Apex vs Subdomain

| Domain Type   | Example                    | Validation | DNS Record   | Setup Time |
| ------------- | -------------------------- | ---------- | ------------ | ---------- |
| **Apex**      | `goodshepherdlanka.no`     | DNS TXT    | TXT record   | 15-30 min  |
| **Subdomain** | `www.goodshepherdlanka.no` | CNAME      | CNAME record | 5-10 min   |

**Recommendation**: Start with `www` subdomain for faster setup, add apex later.

---

## 🔍 Check Current Status

### Get App URL:

```bash
terraform output app_url
```

### Get API Key (for GitHub):

```bash
terraform output -raw api_key
```

### See All Outputs:

```bash
terraform output
```

---

## ✅ What's Already Working

Even without custom domain, your app is live at:

- `https://good-shepherd-app-<random>.azurestaticapps.net`
- Free SSL certificate
- Global CDN
- 100 GB bandwidth/month

You can use this URL while setting up the custom domain!

---

## 🆘 Troubleshooting

### Error: "Domain already in use"

- Domain might be registered to another Azure app
- Remove from other app first

### Error: "DNS validation failed"

- Wait 15-30 minutes for DNS propagation
- Verify TXT record is correct
- Use `nslookup -type=TXT goodshepherdlanka.no` to check

### Want to skip custom domain?

Set in `terraform.tfvars`:

```hcl
custom_domain = ""  # Empty = no custom domain
```

Then run `terraform apply` again.

---

## 📝 Summary

1. ✅ **Static Web App created** (already done!)
2. ⏳ **Custom domain pending** (needs DNS configuration)
3. 📋 **Next**: Add DNS record or use www subdomain

**Your app is LIVE and working!** Custom domain is just for branding. 🎉
