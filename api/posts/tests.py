from django.test import TestCase
from django.urls import reverse, resolve
from django.utils import timezone
from .views import new, home
from .models import Post
from .forms import NewPostForm
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model



class PostsTests(TestCase):
    def setUp(self):
        User = get_user_model()
        user = User.objects.create_user('temporary', 'temporary@gmail.com', 'temporary')

    def test_posts_view_status_code(self):
        url = reverse('posts')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)

    def test_new_posts_view_status_code(self):
        User = get_user_model()
        self.client.login(username='temporary', password='temporary')
        url = reverse('new_post')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)

    def test_posts_url_resolves(self):
        view = resolve('/posts/')
        self.assertEquals(view.func, home)

    def test_new_post_url_resolves(self):
        view = resolve('/posts/new/')
        self.assertEquals(view.func, new)

    def test_new_post_form(self):
        User = get_user_model()
        self.client.login(username='temporary', password='temporary')
        url = reverse('new_post')
        response = self.client.get(url)
        form = response.context.get('form')
        self.assertIsInstance(form, NewPostForm)

    def test_new_post_valid_data(self):
        User = get_user_model()
        self.client.login(username='temporary', password='temporary')
        url = reverse('new_post')
        data = {
            'title':"Tile",
            'content': 'Content'
        }
        response = self.client.post(url, data)
        self.assertTrue(Post.objects.exists())

    def test_new_post_invalid_data(self):
        User = get_user_model()
        self.client.login(username='temporary', password='temporary')
        url = reverse('new_post')
        data = {
            'title':"Tile",
        }
        response = self.client.post(url, data)
        self.assertEquals(response.status_code,200)
        self.assertFalse(Post.objects.exists())
# Create your tests here.
