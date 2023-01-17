from django.conf import settings
from django.views.static import serve
from django.shortcuts import render

# Create your views here.


def render_page(request):
    return render(request, 'Home.html')


def dress_detail(request, dress_id):
    if (dress_id == 1):
        image_path = 'sleeve.svg'
        return serve(request, image_path, document_root=settings.MEDIA_ROOT)
    else:
        image_path = 'choli.svg'
        return serve(request, image_path, document_root=settings.MEDIA_ROOT)
