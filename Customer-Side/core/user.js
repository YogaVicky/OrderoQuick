const pool=require('./pool');
const bcrypt=require('bcrypt');
var count=0;
function User()
{

};
User.prototype={
    //find user data by id or username
    find: function(user=null,callback)
    {   console.log('hello');
        var field;
        if(user)
        {
         field=Number.isInteger(user)?'id':'username';
        }
        let sql='SELECT * FROM users WHERE username=? ';
        pool.query(sql,user,function(err,result)
        {
          if (err) throw err;
          if(result.length)
          {   
              callback(result[0]);
          }
          else{
              callback(null);
          }
        });
    }
,

    create: function(body,callback)
    {
        let pwd=body.password;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(pwd, salt, function(err, hash) {
              body.password=hash;
                var bind=[];
       for (prop in body)
        {
          bind.push(body[prop]);
        } 
        //bind=Object.values(body);
     
        let sql ='INSERT INTO users  (username,fullname,password) VALUES (?,?,?)';

        var binds=[];
        binds.push(body.username);
        let sqll ='INSERT INTO updater (username,firstname,lastname,position,company,location,email,pastjob,pastlocation,pastcompany,university,areacode,phone,file,fi) VALUES (?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)';
           
         pool.query(sqll,binds,function(err,result)
       {
        if (err) console.log(err);
        
        });

        pool.query(sql,bind,function(err,result)
       {
        if (err) console.log(err);
        callback(result.insertId);
        });





        

            });
       });
        


        
    },
    login:function(username,password,callback)
    {
        this.find(username,function(user)
        {
        if(user)
        {
        
            if(bcrypt.compareSync(password,user.password))
            {
                callback(user);
                return;
            }
           
         
        }
        callback(null);
        });
    },

    addjob:function(body,callback)
    {
        var bind=[];
        for (prop in body)
         {
           bind.push(body[prop]);
         } 
         let sql ='INSERT INTO eevents (username,position,location,description,email,date,file,fi) VALUES (?,?,?,?,?,?,?,?)';
           
         pool.query(sql,bind,function(err,result)
       {
        if (err) console.log(err);
        callback(result);
        });

    },


    addevent:function(body,callback)
    {
        var bind=[];
        for (prop in body)
         {
           bind.push(body[prop]);
         } 
         let sql ='INSERT INTO events (username,eventname,location,description,contact,date,time,file,fi) VALUES (?,?,?,?,?,?,?,?,?)';
           
         pool.query(sql,bind,function(err,result)
       {
        if (err) console.log(err);
        callback(result);
        });

    },
    addinfo:function(body,callback)
    {   /*var binds=[];
        binds.push(body.username);*/
        var bind=[];
        for (prop in body)
         {
           bind.push(body[prop]);
         } 
        /* let sql ='INSERT INTO updaterr (username,firstname,lastname,position,company,location,email,pastjob,pastlocation,pastcompany,university,areacode,phone,file,fi) VALUES (?,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)';
           
         pool.query(sql,binds,function(err,result)
       {
        if (err) console.log(err);
        
        });*/
        var i=0;
        var buffer=bind[0];
        for(i=0;i<bind.length-1;i++)
        {
            bind[i]=bind[i+1];
        }
        bind[i]=buffer;
        let sqll =' UPDATE updater  SET firstname=?,lastname=?,position=?,company=?,location=?,email=?,pastjob=?,pastlocation=?,pastcompany=?,university=?,areacode=?,phone=?,file=?,fi=? WHERE username=?';

        pool.query(sqll,bind,function(err,result)
        {
         if (err) console.log(err);
         callback(result);
         });
    },
    
    deleteevent:function(body,callback)
    {
        
         let sql ='DELETE FROM events WHERE username=?';
           
         pool.query(sql,body,function(err,result)
       {
        if (err) console.log(err);
        callback(result);
        });

    },
    deletejob:function(body,callback)
    {
        
         let sql ='DELETE FROM eevents WHERE username=?';
           
         pool.query(sql,body,function(err,result)
       {
        if (err) console.log(err);
        callback(result);
        });

    },
    
     addorder:function(body,callback)
    {
        var bind=[];
        var count=0;
        bind.push(body.gmail);
        for (prop in body.pp)
         {
           count++;
           bind.push(body.pp[prop].name);
           bind.push(body.pp[prop].id);
           bind.push(body.pp[prop].qty);
           bind.push(body.pp[prop].remark);
           bind.push(body.pp[prop].tagg);
         } 
         var z=3-count;
         for(i=0;i<z;i++)
         {
           bind.push("");
           bind.push(NULL);
           bind.push(NULL);
           bind.push("");
           bind.push("");

         }
         var dateTime = require('node-datetime');
var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
//console.log(formatted);
         bind.push(formatted);
         let sql ='INSERT INTO customers (gmail,Product1,ProdID1,Prodqty1,RemarkPd1,Tag1,Product2,ProdID2,Prodqty2,RemarkPd2,Tag2,Product3,ProdID3,Prodqty3,RemarkPd3,Tag3,Date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
           
         pool.query(sql,bind,function(err,result)
       {
        if (err) console.log(err);
        callback(result);
        });

    }
   
    
    
    

}

Weeklycus=function(day,callback)
{
  console.log(day);
 var dayy=[];
 dayy.push(day[1]);
    let sql='SELECT * FROM Pastweek WHERE Timeslot=?';
    pool.query(sql,dayy,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}

Lastweek=function(day,callback)
{
  console.log(day);
 
    let sql='SELECT SUM(' + day + ') FROM Pastweek';
    pool.query(sql,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}

Today=function(day,callback)
{
  console.log(day);
 var dayy=[];
 dayy.push(day[1]);
    let sql='SELECT * FROM PresentWeek WHERE Timeslot=?';
    pool.query(sql,dayy,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}
orderdetails=function(email,callback)
{
  console.log(email);
var mail=[];
mail.push(email);
    let sql='SELECT * FROM customers WHERE Gmail=?';
    pool.query(sql,mail,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}
token=function(email,callback)
{
  console.log(email);
var mail=[];
mail.push(email);
    let sql='SELECT TokenNumber,EstimatedTime FROM tokens WHERE Gmail=?' ;
    pool.query(sql,mail,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}

alljobs=function(callback)
{
    let sql='SELECT * FROM eevents';
    pool.query(sql,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}
allevents=function(callback)
{
    let sql='SELECT * FROM events';
    pool.query(sql,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}
profile=function(name,callback)
{
    let sql='SELECT * FROM updater WHERE username=?';
    pool.query(sql,name,function(err,result)
    {
     if (err) console.log(err);
     callback(result);
     });
}

search=function(key,callback)
{
  let sql='SELECT username from users where username like "%'+key+'%"';
  console.log(".......................................................................")
  console.log(key);
  pool.query(sql,function(err,result)
  {
   if(err) throw err;
   console.log('first');
   callback(result);
  });

}


  
module.exports=User;