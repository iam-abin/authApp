# Variables
DOCKER_COMPOSE = docker compose
COMPOSE_FILE_DEVELOPMENT = docker-compose.dev.yaml
COMPOSE_FILE_PRODUCTION = docker-compose.prod.yaml



# Default action (ie, make help)
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  make up-dev        Start development services (detached)"
	@echo "  make up-dev-non    Start development services (non-detached)"
	@echo "  make up-prod       Start production services (detached)"
	@echo "  make up-prod-non   Start production services (non-detached)"
	@echo "  make down-dev      Stop development services"
	@echo "  make down-prod     Stop production services"



# Start development services (detached)
.PHONY: up-dev
up-dev:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE_DEVELOPMENT) up --build -d

# Start development services (non-detached)
.PHONY: up-dev-non
up-dev-non:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE_DEVELOPMENT) up --build

# Start production services (detached)
.PHONY: up-prod
up-prod:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE_PRODUCTION) up --build -d

# Start production services (non-detached)
.PHONY: up-prod-non
up-prod-non:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE_PRODUCTION) up --build

# Stop development services
.PHONY: down-dev
down-dev:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE_DEVELOPMENT) down

# Stop production services
.PHONY: down-prod
down-prod:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE_PRODUCTION) down
