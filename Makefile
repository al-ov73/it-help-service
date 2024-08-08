start:
	python manage.py runserver

migrate:
	python manage.py makemigrations
	python manage.py migrate

superuser:
	python manage.py createsuperuser

docker-build:
		docker compose -f docker-compose.yml build

docker-run:
		docker compose -f docker-compose.yml up

docker: docker-build docker-run