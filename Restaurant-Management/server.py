from flask import Flask, render_template, request
from pymysql import connect

app = Flask(__name__)

def dbconnect(sql):
    result = []
    db = connect(host='remotemysql.com', database='auU7xuAZEh', user='auU7xuAZEh', password='65hNeLjWPR')
    cursor = db.cursor()
    cursor.execute(sql)
    db.commit()
    for i in cursor.fetchall():
        result.append(i)
    cursor.close()
    return result

@app.route('/',methods = ['POST', 'GET'])
def home():
    pcount=[]
    prcount=[]
    tcount=[]
    visits=0
    if request.method == 'POST':
        res1 = request.form
        print(res1['date'])
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 1 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*199)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 1 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[0]=pcount[0]+(int(res[0][0]))
        prcount[0]=prcount[0]+(int(res[0][0]))*199
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 1 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[0]=pcount[0]+(int(res[0][0]))
        prcount[0]=prcount[0]+(int(res[0][0]))*199
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 2 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*199) 
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 2 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[1]=pcount[1]+(int(res[0][0]))
        prcount[1]=prcount[1]+(int(res[0][0]))*199
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 2 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[1]=pcount[1]+(int(res[0][0]))
        prcount[1]=prcount[1]+(int(res[0][0]))*199  
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 3 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*399)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 3 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[2]=pcount[2]+(int(res[0][0]))
        prcount[2]=prcount[2]+(int(res[0][0]))*399
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 3 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[2]=pcount[2]+(int(res[0][0]))
        prcount[2]=prcount[2]+(int(res[0][0]))*399
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 4 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*120)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 4 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[3]=pcount[3]+(int(res[0][0]))
        prcount[3]=prcount[3]+(int(res[0][0]))*120
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 4 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[3]=pcount[3]+(int(res[0][0]))
        prcount[3]=prcount[3]+(int(res[0][0]))*120
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 5 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*100)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 5 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[4]=pcount[4]+(int(res[0][0]))
        prcount[4]=prcount[4]+(int(res[0][0]))*100
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 5 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[4]=pcount[4]+(int(res[0][0]))
        prcount[4]=prcount[4]+(int(res[0][0]))*100
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 6 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*150)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 6 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[5]=pcount[5]+(int(res[0][0]))
        prcount[5]=prcount[5]+(int(res[0][0]))*150
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 6 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[5]=pcount[5]+(int(res[0][0]))
        prcount[5]=prcount[5]+(int(res[0][0]))*150
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 7 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*150)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 7 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[6]=pcount[6]+(int(res[0][0]))
        prcount[6]=prcount[6]+(int(res[0][0]))*150
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 7 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[6]=pcount[6]+(int(res[0][0]))
        prcount[6]=prcount[6]+(int(res[0][0]))*150
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 8 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*120)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 8 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[7]=pcount[7]+(int(res[0][0]))
        prcount[7]=prcount[7]+(int(res[0][0]))*120
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 8 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[7]=pcount[7]+(int(res[0][0]))
        prcount[7]=prcount[7]+(int(res[0][0]))*120
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 9 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*130)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 9 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[8]=pcount[8]+(int(res[0][0]))
        prcount[8]=prcount[8]+(int(res[0][0]))*130
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 9 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[8]=pcount[8]+(int(res[0][0]))
        prcount[8]=prcount[8]+(int(res[0][0]))*130
        sql = "SELECT count(ProdID1) from customers where ProdID1 = 10 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount.append(int(res[0][0]))
        prcount.append(int(res[0][0])*150)
        sql = "SELECT count(ProdID2) from customers where ProdID2 = 10 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[9]=pcount[9]+(int(res[0][0]))
        prcount[9]=prcount[9]+(int(res[0][0]))*150
        sql = "SELECT count(ProdID3) from customers where ProdID3 = 10 and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        pcount[9]=pcount[9]+(int(res[0][0]))
        prcount[9]=prcount[9]+(int(res[0][0]))*150
        print(pcount)
        sql = "SELECT count(tag1) from customers where tag1 = 'pizza' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount.append(int(res[0][0]))
        sql = "SELECT count(tag2) from customers where tag2 = 'pizza' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount[0]=tcount[0]+int(res[0][0])
        sql = "SELECT count(tag3) from customers where tag3 = 'pizza' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount[0]=tcount[0]+int(res[0][0])
        sql = "SELECT count(tag1) from customers where tag1 = 'bread' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount.append(int(res[0][0]))
        sql = "SELECT count(tag2) from customers where tag2 = 'bread' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount[1]=tcount[1]+int(res[0][0])
        sql = "SELECT count(tag3) from customers where tag3 = 'bread' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount[1]=tcount[1]+int(res[0][0])
        sql = "SELECT count(tag1) from customers where tag1 = 'icecream' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount.append(int(res[0][0]))
        sql = "SELECT count(tag2) from customers where tag2 = 'icecream' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount[2]=tcount[2]+int(res[0][0])
        sql = "SELECT count(tag3) from customers where tag3 = 'icecream' and Date = '{0}'".format(res1['date'])
        res = dbconnect(sql)
        print(res[0][0])
        tcount[2]=tcount[2]+int(res[0][0])
        sql = "SELECT count(gmail) from customers where Date = '{0}'".format(res1['date'])
        print(sql)
        res = dbconnect(sql)
        print(res[0])
        visits=res[0][0]
        return render_template('index.html',pcount=pcount,prcount=prcount,tcount=tcount,ptotal=sum(pcount),prtotal=sum(prcount),visits=visits)
    return render_template('index.html',pcount=pcount,prcount=prcount,tcount=tcount,ptotal=sum(pcount),prtotal=sum(prcount),visits=0)
            
if __name__ == '__main__':
    app.run('0.0.0.0',port=8000,debug = True)