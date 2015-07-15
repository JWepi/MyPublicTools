
import sys
import requests
from lxml import html
import urllib
import http.client
import webbrowser
import time
import win32clipboard
import os
import re
import shutil

myaddresses = ""
ROOTIMGS = "scrapped_images"
FULLDEBUG = False
IMAGESLOCATIONS = ["//img/@src", "//imgs/@src", "//image/@src", "//images/@src",
"//asset/@src", "//assets/@src", "//logo/@src", "//logos/@src"]
REGEXURL = '#((https?://|ftp://|www\.|[^\s:=]+@www\.).*?[a-z_\/0-9\-\#=&])(?=(\.|,|;|\?|\!)?("|\\\'|«|»|\[|\s|\r|\n|$))#iS'

if not os.path.exists(ROOTIMGS):
	os.makedirs(ROOTIMGS)
if not os.path.exists(ROOTIMGS+"/ALL"):
	os.makedirs(ROOTIMGS+"/ALL")

while myaddresses != "q":
	if myaddresses != "" and myaddresses != "q":
		try:
			if (myaddresses == "-d"):
				shutil.rmtree(ROOTIMGS)
				print("You removed the root folder '%s' !\n\n" % ROOTIMGS)
			else:
				if (myaddresses == "-c"):
					win32clipboard.OpenClipboard()
					myaddresses = win32clipboard.GetClipboardData()
					win32clipboard.CloseClipboard()
				if (myaddresses == "-b"):
					myaddresses = "boards.4chan.org/b"
				if (myaddresses == "-b*"):
					myaddresses = "boards.4chan.org/b;;boards.4chan.org/b/2;;boards.4chan.org/b/3;;boards.4chan.org/b/4;;boards.4chan.org/b/5;;boards.4chan.org/b/6;;boards.4chan.org/b/7;;boards.4chan.org/b/8;;boards.4chan.org/b/9;;boards.4chan.org/b/10"
				
				myaddresses = myaddresses.split(";;")
				
				for myaddress in myaddresses:
					if myaddress.startswith("https://"):
						raise ValueError("Did you try to get images from a https url ?")
					
					if not myaddress.startswith("http://"):
						myaddress = "http://" + myaddress

					#if len(re.findall(REGEXURL, myaddress)) == 0:
					#	raise ValueError("Your URL '%s' is not correct, process stopped !\n" % myaddress)
					#raise ValueError(str(re.findall(REGEXURL, myaddress)))
						
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
				
					f = open(ROOTIMGS+"/%s/%s.link.html" % (myaddress, myaddress.split('/')[0]), 'wb')	
					f.write(bytes("<a href='http://"+myaddress+"'>"+myaddress+"</a>", 'UTF-8'))
					f.close()
					print("Process complete for %s !\n\n" % myaddress)
					
				print("Everything is done !\n\n\n")
		except requests.exceptions.MissingSchema as my_err:
			print("MissingSchema : %s\n" % my_err)
		except NameError as my_err:
			print("NameError : %s\n" % my_err)
		except TypeError as my_err:
			print("TypeError : %s\n" % my_err)
		except ValueError as my_err:
			print("ValueError : %s\n" % my_err)
		except ConnectionError as my_err:
			print("ConnectionError : %s\n" % my_err)
		finally:
			input("Press Enter to go forth\n")
			
	myaddresses = input("URL please: ")