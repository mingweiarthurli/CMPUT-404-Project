from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework import permissions
from .models import Post
from .forms import NewPostForm
from users.models import Author
from .serializers import PostsSerializer

class PostsViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostsSerializer
    permission_classes = [permissions.IsAuthenticated]

def home(request):
    posts = Post.objects.all()
    return render(request, 'posts.html', {'posts':posts})

@login_required
def new(request):
    #author = Author.objects.first() #get logged in user later
    if request.method == 'POST':
        form = NewPostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            #post.author = author
            post.user = request.user
            post.content = form.cleaned_data.get('content')
            post.save()
            return redirect('posts')
    else:
        form = NewPostForm()

    return render(request, 'new_post.html', {'form' : form})
