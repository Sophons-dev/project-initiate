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

resource "mongodbatlas_project" "dev" {
  name   = "project-initiate-dev-project"
  org_id = var.mongodbatlas_org_id
}

resource "mongodbatlas_cluster" "dev" {
  project_id                  = mongodbatlas_project.dev.id
  name                        = "project-initiate-dev-cluster"
  provider_name               = "TENANT"
  backing_provider_name       = "AWS"
  provider_region_name        = "US_EAST_1"
  provider_instance_size_name = "M0"
}

resource "mongodbatlas_database_user" "dev_user" {
  project_id         = mongodbatlas_project.dev.id
  username           = var.dev_db_username
  password           = var.dev_db_password
  auth_database_name = "admin"

  roles {
    role_name     = "readWriteAnyDatabase"
    database_name = "admin"
  }
}

resource "mongodbatlas_project_ip_access_list" "dev_allow_all" {
  project_id = mongodbatlas_project.dev.id
  cidr_block = "0.0.0.0/0"
}

output "connection_string" {
  value     = "mongodb+srv://${mongodbatlas_database_user.dev_user.username}:${var.dev_db_password}@${mongodbatlas_cluster.dev.connection_strings[0].standard_srv}/?retryWrites=true&w=majority"
  sensitive = true
}
