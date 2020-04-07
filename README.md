# CMPUT-404-Project

## Online demo

[https://cmput-404-project.herokuapp.com/](https://cmput-404-project.herokuapp.com/)

Default superuser account:
username: demoadmin
password: demoadmin

### How to upgrade the account to "admin" (admin of the host)

Upgrade an account to "admin" can only performed by an existing admin account or a superuser account.
Therefore, for first time upgrading account to "admin", you need a superuser account.

1. Create a superuser account.
2. Log in `https://{host_address}/admin/users/user/` using the created superuser.
3. Select the user and set its userType to "admin".

**Note:** If you are using a Heroku instance, Heroku seems to not support check user type by "user.is_superuser" (this bug has not yet been fixed). Therefore, rather than update userType field of a user by the update API, please use the admin panel offered by Django.

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

## API documentation

After running the server, you can check out the API documentation at `http://localhost:8000/swagger/` or `http://localhost:8000/redoc/` depending on what kind of documentation UI you prefer.

[Online viewing](https://cmput-404-project.herokuapp.com/swagger/)

## UI Mockup

See the `UI_mockup.fig` under the root directory.

[Online vewing](https://www.figma.com/file/sKnTrhQ3f2uaiexQ0A8OSJ/CMPUT-404-Project?node-id=6%3A272)
