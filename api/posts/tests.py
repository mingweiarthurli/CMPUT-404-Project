from django.test import TestCase
from django.urls import reverse, resolve


class PostsTests(TestCase):
    def test_posts_view_status_code(self):
        url = reverse('posts')
        response = self.client.get(url)
        self.assertEquals(response.status_code, 200)

    def test_posts_url_resolves(self):
        view = resolve('/posts/')
        self.assertEquals(view.view_name, 'posts')
# Create your tests here.
