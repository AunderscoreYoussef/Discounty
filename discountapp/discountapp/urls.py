"""discountapp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from discounty import views
from django.conf import settings
from django.conf.urls.static import static
from discounty.views import StoreListAPIView

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', views.login_store, name='/'),

    path('store/register', views.register_store, name='register'),

    path('create-discount', views.add_discount, name='add-discount'),

    path('discount-list', views.discount_list, name='dashboard'),

    path('discounts/<int:pk>/update/', views.DiscountUpdateView.as_view(), name='discount-update'),

    path('discounts/<int:pk>/delete/', views.DiscountDeleteView.as_view(), name='discount-delete'),

    path('contact', views.contact, name="contact"),

    path('logout', views.logout_store, name='logout'),

    path('api/stores/', StoreListAPIView.as_view(), name='store-list'),

    path('api/discounts', views.DiscountList.as_view(), name='discount-list'),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# URL pattern for serving media files during development, using the static function
