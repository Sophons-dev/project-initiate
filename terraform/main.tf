terraform {
  required_providers {
    mongodbatlas = {
      source  = "mongodb/mongodbatlas"
      version = "~> 1.16.0"
    }
  }
}

provider "mongodbatlas" {
  public_key  = var.mongodbatlas_public_key
  private_key = var.mongodbatlas_private_key
}

# Dev environment module
module "dev" {
  source = "./dev"

  mongodbatlas_org_id      = var.mongodbatlas_org_id
  mongodbatlas_public_key  = var.mongodbatlas_public_key
  mongodbatlas_private_key = var.mongodbatlas_private_key
  dev_db_username          = var.dev_db_username
  dev_db_password          = var.dev_db_password
}

# Prod environment module
module "prod" {
  source = "./prod"

  mongodbatlas_org_id      = var.mongodbatlas_org_id
  mongodbatlas_public_key  = var.mongodbatlas_public_key
  mongodbatlas_private_key = var.mongodbatlas_private_key
  prod_db_username         = var.prod_db_username
  prod_db_password         = var.prod_db_password
}

output "dev_connection_string" {
  value     = module.dev.connection_string
  sensitive = true
}

output "prod_connection_string" {
  value     = module.prod.connection_string
  sensitive = true
}
