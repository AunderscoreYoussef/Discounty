from django.shortcuts import render, redirect, get_object_or_404
from .forms import StoreRegistrationForm, StoreLoginForm, DiscountInputForm
from .models import Store, Discount
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import authenticate, login, logout
from django.views.generic.edit import UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib import messages
from django.contrib import auth
from django.http import JsonResponse
from .serializers import StoreSerializer, DiscountSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


class StoreListAPIView(generics.ListAPIView):
    queryset = Store.objects.all()  
    serializer_class = StoreSerializer 

class DiscountList(APIView):
    def get(self, request):
        store_id = request.query_params.get('store_id')
        discounts = Discount.objects.filter(store_id=store_id)
        serializer = DiscountSerializer(discounts, many=True)
        return Response(serializer.data)

def store_list(request):
    stores = Store.objects.all()
    data = []

    for store in stores:
        data.append({
            'name': store.name,
            'picture': store.picture,
        })

    return JsonResponse(data, safe=False)

def register_store(request):
    if request.method == 'POST':
        form = StoreRegistrationForm(request.POST, request.FILES)

        if form.is_valid():
            store = form.save(commit=False)
            store.password = make_password(form.cleaned_data['password'])
            store.save()
            return redirect('/')
    else:
        form = StoreRegistrationForm()

    return render(request, 'register.html', {'form': form})


def login_store(request):
    print("LOGIN", request.method)
    if request.method == 'POST':
        form = StoreLoginForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']

            try:
                store = Store.objects.get(username=username)
            except Store.DoesNotExist:
                print("Username:", username)
                return redirect('/')

            if check_password(password, store.password):
                print("Password:", password, store.password)
                request.session['store_id'] = store.id
                print("REACHED")
                return redirect('dashboard')
            else:
                return redirect('/')
        else:
            print("ERRORS:", form.errors)

    else:
        form = StoreLoginForm()

    return render(request, 'index.html', {'form': form})


def dashboard(request):
    store_id = request.session.get('store_id')
    store = Store.objects.get(id=store_id)
    return render(request, 'discount_list.html', {'store': store})
    
class DiscountUpdateView(UpdateView):
    model = Discount
    template_name = 'discount_update.html'
    fields = ['url', 'original_price', 'discounted_price', 'code']

    def get_success_url(self):
        return reverse_lazy('dashboard')

class DiscountDeleteView(DeleteView):
    model = Discount
    template_name = 'discount_delete.html'
    success_url = reverse_lazy('dashboard')


def add_discount(request):
    if request.method == 'POST':
        form = DiscountInputForm(request.POST)
        if form.is_valid():
            discount = form.save(commit=False)
            store_id = request.session.get('store_id')
            store = Store.objects.get(id=store_id)
            discount.store = store
            discount.save()
            return redirect('dashboard')
    else:
        form = DiscountInputForm()
    return render(request, 'create_discount.html', {'form': form})



def discount_list(request):
    store_id = request.session.get('store_id')
    print("STORE ID:", store_id)
    store = Store.objects.get(id=store_id)
    discounts = store.discount_set.all()
    return render(request, 'discount_list.html', {'store': store, 'discounts': discounts})

def logout_store(request):
    logout(request)
    return redirect('/')


def contact(request):
    return render(request, "contact.html")