from __future__ import print_function
from telesign.messaging import MessagingClient
import sys, json, numpy as np, pandas as pd

customer_id = "FFFFFFFF-EEEE-DDDD-1234-AB1234567890"
api_key = "EXAMPLE----TE8sTgg45yusumoN6BYsBVkh+yRJ5czgsnCehZaOYldPJdmFh6NeX8kunZ2zU1YWaUw/0wV6xfw=="

phone_number = "phone_number"
message = "This is a huge purchase that doesn't seem to fall within your usual spending habits. Are you sure you are okay with it?"
message_type = "ARN"


def main():

    messaging_client = MessagingClient(customer_id, api_key)
	response = messaging_client.message(phone_number, message, message_type)

	print(response.json)



#start process
if __name__ == '__main__':
    main()