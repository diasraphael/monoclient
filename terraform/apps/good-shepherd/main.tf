# Good Shepherd App Infrastructure
# This creates Azure resources specific to the good-shepherd app

terraform {
  required_version = ">= 1.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

# Reference the shared resource group
data "azurerm_resource_group" "shared" {
  name = var.resource_group_name
}

# Static Web App for good-shepherd
resource "azurerm_static_web_app" "good_shepherd" {
  name                = var.app_name
  resource_group_name = data.azurerm_resource_group.shared.name
  location            = var.location
  sku_tier            = "Free"  # FREE TIER
  sku_size            = "Free"
  
  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Project     = "Good Shepherd"
    App         = "good-shepherd"
  }
}

# Configure app settings (environment variables)
resource "azurerm_static_web_app_custom_domain" "custom_domain" {
  count               = var.custom_domain != "" ? 1 : 0
  static_web_app_id   = azurerm_static_web_app.good_shepherd.id
  domain_name         = var.custom_domain
  # Use dns-txt-token for apex domains (no www), cname-delegation for subdomains (www)
  validation_type     = can(regex("^www\\.", var.custom_domain)) ? "cname-delegation" : "dns-txt-token"
}

# Outputs
output "app_name" {
  description = "Name of the Static Web App"
  value       = azurerm_static_web_app.good_shepherd.name
}

output "app_id" {
  description = "ID of the Static Web App"
  value       = azurerm_static_web_app.good_shepherd.id
}

output "default_host_name" {
  description = "Default hostname of the Static Web App"
  value       = azurerm_static_web_app.good_shepherd.default_host_name
}

output "api_key" {
  description = "API key for deploying to the Static Web App"
  value       = azurerm_static_web_app.good_shepherd.api_key
  sensitive   = true
}

output "app_url" {
  description = "Full URL of the deployed app"
  value       = "https://${azurerm_static_web_app.good_shepherd.default_host_name}"
}

