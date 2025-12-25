# Variables for shared Azure infrastructure

variable "subscription_id" {
  description = "Azure subscription ID (good-shepherd)"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the shared resource group"
  type        = string
  default     = "my-apps-rg"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "westeurope"
}

variable "environment" {
  description = "Environment tag"
  type        = string
  default     = "production"
}

variable "create_cosmos_db" {
  description = "Whether to create a Cosmos DB account (free tier)"
  type        = bool
  default     = false
}

variable "cosmos_db_name" {
  description = "Name of the Cosmos DB account"
  type        = string
  default     = "my-apps-cosmosdb"
}

