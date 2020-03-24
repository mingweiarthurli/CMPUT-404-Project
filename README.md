# CMPUT-404-Project

## Server Code

All server codes are under `/api`. Run the following shell command to start the server:

```console
cd api
pipenv install
pipenv shell
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### API documentation

After running the server, you can check out the API documentation at `http://localhost:8000/swagger/` or `http://localhost:8000/redoc/` depending on what kind of documentation UI you prefer.

## UI Mockup

See the `UI_mockup.fig` under the root directory.

[Online vewing](https://www.figma.com/file/sKnTrhQ3f2uaiexQ0A8OSJ/CMPUT-404-Project?node-id=6%3A272)
