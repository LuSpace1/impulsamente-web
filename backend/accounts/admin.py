from django.contrib import admin

from .models import AdminProfile


@admin.register(AdminProfile)
class AdminProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "must_change_password", "active_session_key", "updated_at")
    search_fields = ("user__username", "user__email")
    list_filter = ("must_change_password",)
