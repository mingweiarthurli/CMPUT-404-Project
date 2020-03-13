from django.test import TestCase
from django.urls import reverse, resolve
from django.contrib.auth import views as auth_views
from .views import signup
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class UsersTests(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user('temporary', 'temporary@gmail.com', 'temporary')

    def test_signup_view_status_code(self):
        url = reverse('signup')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)

    def test_login_view_status_code(self):
        url = reverse('login')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)
    
    def test_logout_view_status_code(self):
        url = reverse('logout')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 302)

    def test_signup_url_resolves(self):
        view = resolve('/signup/')
        self.assertEquals(view.func, signup)
    
    def test_signup_view_contains_login_link(self):
        signup_url = reverse('signup')
        response = self.client.get(signup_url)
        login_url = reverse('login')
        self.assertContains(response, 'href="{0}"'.format(login_url))
    
    def test_login_view_contains_signup_link(self):
        login_url = reverse('login')
        response = self.client.get(login_url)
        signup_url = reverse('signup')
        self.assertContains(response, 'href="{0}"'.format(signup_url))

    def test_signup_form_valid_data(self):
        url = reverse('signup')
        data = {
            'username' : 'test',
            'password' : 'A74hdsidsa',
            'email' : 'a@a.com'
        }
        response = self.client.post(url, data)
        self.assertEquals(response.status_code, 200)
        self.assertTrue(User.objects.exists())

# Create your tests here.
