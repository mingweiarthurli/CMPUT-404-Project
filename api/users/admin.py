from django.contrib import admin
from .models import Author

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('displayName', 'approved')
    actions = ['approve',]

    def approve(self, request, queryset):
        queryset.update(approved=True)
    approve.short_description = "Approve new user Requests"

admin.site.register(Author, AuthorAdmin)
