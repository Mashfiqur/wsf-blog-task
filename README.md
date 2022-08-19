# Installation

```
# run docker
docker-compose up -d

# Go inside the laravel app container
docker exec -it wsf-task-app sh

# copy .env file
cp .env.example .env

# install packages
composer install

# Generate Application Key
php artisan key:generate

# Migrate
php artisan migrate

# create  JWT Key
php artisan jwt:secret

# install Node dependency
npm install && npm run dev
```


