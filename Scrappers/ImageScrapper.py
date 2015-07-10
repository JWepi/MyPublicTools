
import sys
import requests
from lxml import html
import urllib.parse
import webbrowser
import time
import win32clipboard
import os

myaddress = ""
ROOTIMGS = "scrapped_images"
FULLDEBUG = False
IMAGESLOCATIONS = ["//img/@src", "//imgs/@src", "//image/@src", "//images/@src",
"//asset/@src", "//assets/@src", "//logo/@src", "//logos/@src"]

if not os.path.exists(ROOTIMGS):
	os.makedirs(ROOTIMGS)
if not os.path.exists(ROOTIMGS+"/ALL"):
	os.makedirs(ROOTIMGS+"/ALL")

while myaddress.lower != "q":
	if myaddress != "":
		try:
			if (myaddress == "-c"):
				win32clipboard.OpenClipboard()
				myaddress = win32clipboard.GetClipboardData()
				win32clipboard.CloseClipboard()
			
			if myaddress.startswith("https://"):
				raise ValueError("Did you try to get images from a https url ?")
			
			if not myaddress.startswith("http://"):
				myaddress = "http://" + myaddress
				
			response = requests.get(myaddress)
			parsed_body = html.fromstring(response.text)
			
			myaddress = myaddress[7:]
			if myaddress.startswith("/"):
				myaddress = myaddress[1:]
			
			for imagesPaths in IMAGESLOCATIONS:
				images = parsed_body.xpath(imagesPaths)
				
				if images:
					images = [urllib.parse.urljoin(response.url, url) for url in images]  
					print("I Found %s image(s) in %s" % (len(images), imagesPaths))

					if (len(images) > 0):
						if not os.path.exists(ROOTIMGS+"/"+myaddress):
							os.makedirs(ROOTIMGS+"/"+myaddress)
					
					for ind, url in enumerate(images):
						imgName = url.split('/')[-1].split('.')[0]
						imgType = url.split('/')[-1].split('.')[-1].split('?')[-1]
						imgFullName = imgName + "." + imgType
						
						placetowrite = ROOTIMGS+"/%s/%s%s" % (myaddress, time.strftime("%d%m%Y-%H%M%S_"),imgFullName)
						try:
							open(placetowrite, 'w').close()
						except OSError:
							defaultImgName = "defaultImgName"
							if not "." not in imgFullName:
								defaultImgName += "." + imgFullName.split('.')[-1]
							placetowrite = ROOTIMGS+"/%s/%s%s" % (myaddress, time.strftime("%d%m%Y-%H%M%S_"), defaultImgName)
						r = requests.get(url)
						
						if FULLDEBUG:
							print("%d%% - Saving at FullPath %s" % (round((ind + 0.33) / len(images) * 100), placetowrite.split("/")[-1]))
						else:
							print("%d%%" % (round((ind + 0.33) / len(images) * 100)))
						f = open(placetowrite, 'wb')
						f.write(r.content)
						f.close()
						
						if placetowrite != ROOTIMGS+"/"+placetowrite.split("/")[1]+"/"+placetowrite.split("/")[-1]:
							placetowrite = ROOTIMGS+"/"+placetowrite.split("/")[1]+"/"+placetowrite.split("/")[-1]
							if FULLDEBUG:
								print("%d%% - Saving at HomePath %s" % (round((ind + 0.67) / len(images) * 100), placetowrite.split("/")[-1]))
							else:
								print("%d%%" % (round((ind + 0.67) / len(images) * 100)))
							f = open(placetowrite, 'wb')
							f.write(r.content)
							f.close()
						
						placetowrite = ROOTIMGS+"/ALL/"+placetowrite.split("/")[-1]
						
						if FULLDEBUG:
							print("%d%% - Saving at ALL %s" % (round((ind + 1) / len(images) * 100), placetowrite.split("/")[-1]))
						else:
							print("%d%%" % (round((ind + 1) / len(images) * 100)))
						f = open(placetowrite, 'wb')
						f.write(r.content)
						f.close()
		
			print("Process complete !\n\n\n")
		except requests.exceptions.MissingSchema as my_err:
			print("MissingSchema : %s\n" % my_err)
		except NameError as my_err:
			print("NameError : %s\n" % my_err)
		except TypeError as my_err:
			print("TypeError : %s\n" % my_err)
		except ValueError as my_err:
			print("ValueError : %s\n" % my_err)
		finally:
			input("Press Enter to go forth\n")
			
	myaddress = input("URL please: ")