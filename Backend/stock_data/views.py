from django.http import JsonResponse
from rest_framework.views import APIView
from nsetools import Nse
import pandas as pd
from django.conf import settings
import os

# Create your views here.
class Real_Time_Stock_Data(APIView):

    def __init__(self):

        self.nse = Nse()

    def get(self, request):

        dataframe = pd.read_csv(os.path.join(settings.BASE_DIR, 'stock_list.csv'))
        head = dataframe.head()
        stock_dict = dict(zip(list(head['SYMBOL']), list(head['NAME OF COMPANY'])))
        print(stock_dict)
        return JsonResponse({"data": stock_dict})
		
    def post(self, request):
        
        lastprice_dict = {}
        symbols = dict(request.data)['symbols']
        for index, symbol in enumerate(symbols):

            last_price = self.nse.get_quote(symbol)['lastPrice']
            lastprice_dict[symbol] = last_price

        return JsonResponse(lastprice_dict)


