#!/bin/bash

cd api
python manage.py makemigrations
python manage.py migrate

cd ..
cd frontend
npm install