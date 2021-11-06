local: ## Run project on Local env
	@docker-compose stop && \
		docker-compose \
			-f docker-compose.yml \
		up --build -d --remove-orphans

prod: ## Run project on Prod env
	@docker-compose stop && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.prod.yml \
		up --build -d --remove-orphans
