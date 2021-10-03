# coding: utf-8
from http.server import BaseHTTPRequestHandler, HTTPServer
import os 
import serial
import json
import time
import csv 

ser=serial.Serial('/dev/ttyUSB0',9600)
filename = "encoder_data.csv"
fields = ['timestamp(in ms)', 'commanded_speed_right', 'actual_speed_right', 'commanded_speed_left', 'actual_speed_left']

check=''
data_received=""

def connection():
    print("hey")
    while(1):
        check=ser.read(1)
        print(check) 
        if check==b'r':
            break
        print("connection established\n")

def data_recieving():
    print("data recieving\n")
    while(1):
        data_received=ser.readline()
        print(data_received) 
        if len(data_received)>0:
            break

    print("data recieved\n")

    global SOC
    global Distance
    global Speed
    global Overvoltage_fault
    global Undervoltage_fault
    global Overcurrent_fault
    global commanded_speed_right
    global commanded_speed_left
    global actual_speed_right
    global actual_speed_left
    global timestamp

    SOC=""
    Distance=""
    Speed=""
    Overvoltage_fault=""
    Undervoltage_fault=""
    Overcurrent_fault=""
    commanded_speed_right=""
    commanded_speed_left=""
    actual_speed_right=""
    actual_speed_left=""
    timestamp=""

    data = data_received.split()
	
    SOC=float(data[0])
    Distance=float(data[1])
    Speed=float(data[2])
    Overvoltage_fault=int(data[3])
    Undervoltage_fault=int(data[4])    
    Overcurrent_fault=int(data[5])
    commanded_speed_right=float(data[6])
    commanded_speed_left=float(data[7])
    actual_speed_right=float(data[8])
    actual_speed_left=float(data[9])
    timestamp=float(data[10])



    print(SOC)
    print(Distance)
    print(Speed)
    print(Overvoltage_fault)
    print(Undervoltage_fault)
    print(Overcurrent_fault)
    print(commanded_speed_right)
    print(commanded_speed_left)
    print(actual_speed_right)
    print(actual_speed_left)
    print(timestamp)

    row=[timestamp, commanded_speed_right, actual_speed_right, commanded_speed_left, actual_speed_left]
    with open(filename, 'w', newline='') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerow(row)
		
#connection()
data_recieving()

myrequestsk = None
myrequestemp = None
mystatus = None
class RequestHandler_httpd(BaseHTTPRequestHandler):
  def do_GET(self):
    global myrequestsk
    global filename
    print('you got this requests')
    myrequestsk = self.requestline

    print('cleaned request')
    myrequestsk = myrequestsk[5 : int(len(myrequestsk) - 9)]
    print(myrequestsk)
    data_recieving()
    g = {"SOC" : SOC, "currentDistance" : Distance, "speed" : Speed, "overvoltageFault" : Overvoltage_fault, "undervoltageFault" : Undervoltage_fault,"overcurrentFault" : Overcurrent_fault}
    h=json.dumps(g)
    messagetosend=bytes(h,"utf")
    self.send_response(200)
    self.send_header('Content-Type', 'text/plain')
    self.send_header('Content-Length', len(messagetosend))
    self.send_header('Access-Control-Allow-Origin','http://localhost:3000')
    self.send_header('Access-Control-Allow-Credentials','true')
    self.end_headers()
    self.wfile.write(messagetosend)
    return  


server_address_httpd = ('127.0.0.1',8081)

httpd = HTTPServer(server_address_httpd, RequestHandler_httpd)
print('starting the server ')
httpd.serve_forever()




