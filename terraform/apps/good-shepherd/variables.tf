# Variables for good-shepherd app

variable "subscription_id" {
  description = "Azure subscription ID (good-shepherd)"
  type        = string
}

variable "resource_group_name" {
  description = "Name of the shared resource group (created in terraform/shared)"
  type        = string
  default     = "my-apps-rg"
}

variable "app_name" {
  description = "Name of the Static Web App"
  type        = string
  default     = "good-shepherd-app"
}

variable "location" {
  description = "Azure region for the Static Web App"
  type        = string
  default     = "West Europe"
  
  validation {
    condition = contains([
      "West Europe",
      "East US 2",
      "West US 2",
      "Central US",
      "East Asia",
      "West US 3"
    ], var.location)
    error_message = "Static Web Apps are only available in specific regions."
  }
}

variable "environment" {
  description = "Environment tag"
  type        = string
  default     = "production"
}

variable "custom_domain" {
  description = "Custom domain for the app (optional)"
  type        = string
  default     = ""
}

