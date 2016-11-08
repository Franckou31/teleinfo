import csv
import MySQLdb

db = MySQLdb.connect("127.0.0.1", "root", "1234", "mysql")
c=db.cursor()

with open('test.txt', 'rb') as csvfile:
	line = csv.reader(csvfile, delimiter=',')
	for row in line:
		print row[0]
		idc = int(row[0])
		print idc
		c.execute("""insert into Stats (Indice_Bleu_HP, Indice_Bleu_HC, Indice_Blanc_HP) values ('%s', '%s', '%s')""", (idc, idc, idc))
		db.commit()
