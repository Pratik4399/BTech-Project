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
        stock_list = []
        dataframe = pd.read_csv(os.path.join(settings.BASE_DIR, 'stock_list.csv'))
        # head = dataframe.head()
        for index, row in dataframe.iterrows():
            stock_dict = {}
            stock_dict['id'] = index + 1
            stock_dict['name'] = row['Company Name']
            stock_dict['index_nm'] = row['Symbol']
            stock_dict['currency'] = "INR"
            stock_dict["market"] = "NSE"
            stock_value = self.nse.get_quote(row['Symbol'])
            # stock_value = self.nse.get_quote(row)
            stock_dict['value'] = str(stock_value['lastPrice'])
            if isinstance(stock_value['pChange'], str) and stock_value['pChange'].find('-') != -1:
                stock_dict['state'] = '-'
                stock_dict['state_value'] = str(stock_value['change'])
                stock_dict['percent_state'] = str(stock_value['pChange']) + "%"
            else:
                stock_dict['state'] = "+"
                stock_dict['state_value'] = str(stock_value['change'])
                stock_dict['percent_state'] = str(stock_value['pChange']) + "%" 
            
            stock_list.append(stock_dict)

        return JsonResponse({"data": stock_list})
		
    def post(self, request):
        
        lastprice_dict = {}
        symbols = dict(request.data)['symbols']
        for index, symbol in enumerate(symbols):

            last_price = self.nse.get_quote(symbol)['lastPrice']
            lastprice_dict[symbol] = last_price

        return JsonResponse(lastprice_dict)


