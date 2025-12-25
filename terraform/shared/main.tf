# Shared Azure Infrastructure
# This manages resources shared across all apps (resource group, Cosmos DB, etc.)

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

# Shared Resource Group for all apps
resource "azurerm_resource_group" "shared_rg" {
  name     = var.resource_group_name
  location = var.location
  
  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Project     = "MonoClient Apps"
    Type        = "Shared"
  }
}

# Optional: Cosmos DB (Free Tier) - shared across all apps
resource "azurerm_cosmosdb_account" "shared_db" {
  count               = var.create_cosmos_db ? 1 : 0
  name                = var.cosmos_db_name
  location            = azurerm_resource_group.shared_rg.location
  resource_group_name = azurerm_resource_group.shared_rg.name
  offer_type          = "Standard"
  kind                = "GlobalDocumentDB"
  
  free_tier_enabled = true  # FREE TIER - 25 GB, 1000 RU/s
  
  consistency_policy {
    consistency_level = "Session"
  }
  
  geo_location {
    location          = azurerm_resource_group.shared_rg.location
    failover_priority = 0
  }
  
  tags = {
    Environment = var.environment
    ManagedBy   = "Terraform"
    Type        = "Shared"
  }
}

# Outputs
output "resource_group_name" {
  description = "The name of the shared resource group"
  value       = azurerm_resource_group.shared_rg.name
}

output "resource_group_id" {
  description = "The ID of the shared resource group"
  value       = azurerm_resource_group.shared_rg.id
}

output "resource_group_location" {
  description = "The location of the shared resource group"
  value       = azurerm_resource_group.shared_rg.location
}

output "cosmos_db_endpoint" {
  description = "The endpoint for the Cosmos DB account"
  value       = var.create_cosmos_db ? azurerm_cosmosdb_account.shared_db[0].endpoint : null
}

output "cosmos_db_primary_key" {
  description = "The primary key for the Cosmos DB account"
  value       = var.create_cosmos_db ? azurerm_cosmosdb_account.shared_db[0].primary_key : null
  sensitive   = true
}

output "cosmos_db_primary_connection_string" {
  description = "Primary connection string for the Cosmos DB account"
  value       = var.create_cosmos_db ? azurerm_cosmosdb_account.shared_db[0].primary_sql_connection_string : null
  sensitive   = true
}

