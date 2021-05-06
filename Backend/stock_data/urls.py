from django.urls import path
from stock_data.views import Real_Time_Stock_Data

urlpatterns = [
    path('real_time_data', Real_Time_Stock_Data.as_view(), name = 'real_time_stock_data')
]