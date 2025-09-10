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

resource "mongodbatlas_project" "prod" {
  name   = "project-initiate-prod-project"
  org_id = var.mongodbatlas_org_id
}

resource "mongodbatlas_cluster" "prod" {
  project_id                  = mongodbatlas_project.prod.id
  name                        = "project-initiate-prod-cluster"
  provider_name               = "TENANT"
  backing_provider_name       = "AWS"
  provider_region_name        = "US_EAST_1"
  provider_instance_size_name = "M0"
}

resource "mongodbatlas_database_user" "prod_user" {
  project_id         = mongodbatlas_project.prod.id
  username           = var.prod_db_username
  password           = var.prod_db_password
  auth_database_name = "admin"

  roles {
    role_name     = "readWriteAnyDatabase"
    database_name = "admin"
  }
}

resource "mongodbatlas_project_ip_access_list" "prod_allow_all" {
  project_id = mongodbatlas_project.prod.id
  cidr_block = "0.0.0.0/0"
}

output "connection_string" {
  value     = "mongodb+srv://${mongodbatlas_database_user.prod_user.username}:${var.prod_db_password}@${mongodbatlas_cluster.prod.connection_strings[0].standard_srv}/?retryWrites=true&w=majority"
  sensitive = true
}
