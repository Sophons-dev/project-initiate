variable "mongodbatlas_org_id" {
  type = string
}

variable "mongodbatlas_public_key" {
  type = string
}

variable "mongodbatlas_private_key" {
  type      = string
  sensitive = true
}

variable "dev_db_username" {
  type      = string
  sensitive = true
}

variable "dev_db_password" {
  type      = string
  sensitive = true
}
