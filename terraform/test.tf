provider "aws" {
    alias = "us-east-1"
    region = "us-east-1"
}

provider "aws" {
    alias = "us-west-2"
    region = "us-west-2"
}

variable ami_var {
    description = "value"
    type = string
    default = "aws ami-0202022"
}

resource "aws-instance" "example" {
    # ami = "dwad"
    ami = var.ami_var
    instance_type = ""
    provider = "aws.us-east-1"
}

resource "aws-instance" "example" {
    ami = "dwad"
    isntance_type = ""
    provider = "aws.us-west-2"
}