from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from it_helpdesk.models import User, Ticket

admin.site.register(User, UserAdmin)
admin.site.register(Ticket)
