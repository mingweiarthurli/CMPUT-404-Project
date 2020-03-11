from django import forms
from .models import Post

class NewPostForm(forms.ModelForm):
    content = forms.CharField(widget=forms.Textarea(), max_length=2000)

    class Meta:
        model = Post
        fields = ['title', 'content']