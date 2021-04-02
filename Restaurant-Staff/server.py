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
    sql = "SELECT * FROM customers LIMIT 1"
    res = dbconnect(sql)
    print(res[0])
    if request.method == 'POST':
        res1 = request.form
        print(res1)
        sql = "insert into tokens values({0},'{1}','{2}')".format(res1['tnum'],res[0][1],res1['esttime'])
        print(sql)
        res = dbconnect(sql)
        res1=[]
        return render_template('index.html',res=res1)    
    return render_template('index.html',res=res[0])

if __name__ == '__main__':
    app.run('0.0.0.0',debug = True)