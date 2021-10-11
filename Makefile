local: ## Run project on Local env
	@docker-compose stop && \
		docker-compose \
			-f docker-compose.yml \
		up --build -d --remove-orphans
