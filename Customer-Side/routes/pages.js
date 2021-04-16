const express=require('express');
const User=require('../core/user');
const router=express.Router();
const path=require('path');
const multer=require('multer');
const upload=require('express-fileupload');
const user=new User();


const isLoggedIn = (req, res, next) => {
    let user=req.session.passport.user;

    if (user) {
        next();
    } else {
        res.sendStatus(401);
    }
}


router.get('/good', isLoggedIn, (req, res,next) =>{

    var customer=[];
    var dateTime = require('node-datetime');
    var dt = dateTime.create();
    var formatted = dt.format('w');    
    var tim=dt.format('H')
    console.log(formatted);
    console.log(tim);
    var day=[];
    day.push(formatted);
    day.push(13);
    Weeklycus(day,function(result)
    {
        console.log(result);
        
        
          customer.push(result[0][formatted]);
    });
    Lastweek(formatted,function(result)
    {
        console.log(result);
        
        
          customer.push(result[0]['SUM('+formatted+')']);
          console.log(customer[1]);

    });

    Today(day,function(result)
    {
        console.log(result);
        
        
          customer.push(result[0][formatted]);
    });
    function sayHi() {
        res.render('cart.hbs',{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value,pastweektim:customer[0],pastweektot:customer[2],today:customer[1]})
    }
      
      setTimeout(sayHi, 3000);
})

router.post('/order',function(req,res,next)
{
    console.log(req.body);
    req.body.gmail=req.session.passport.user.emails[0].value;
    var count=0;
    
        
    user.addorder(req.body,function(result)
    {
            if(result)
            {
                res.redirect('ongoing')
            }
    });



});


router.get('/ongoing',(req,res,next)=>{
    var email=req.session.passport.user.emails[0].value;
    console.log(email);
var customer=[];
  

    function say() {
        orderdetails(email,function(result)
        {
            //console.log(result);
            customer.push(result[0].Product1);
            customer.push(result[0].Prodqty1);
            customer.push(result[0].RemarkPd1);
            customer.push(result[0].Product2);
            customer.push(result[0].Prodqty2);
            customer.push(result[0].RemarkPd2);
            customer.push(result[0].Product3);
            customer.push(result[0].Prodqty3);
            customer.push(result[0].RemarkPd3);
    
    
        });

    token(email,function(result)
    {
        console.log(result);
        customer.push(result[result.length-1].TokenNumber);
        customer.push(result[result.length-1].EstimatedTime);

        
    });
}
setTimeout(say, 20000);
 
    function sayHi() {


        res.render('order',{res1:customer[0],res2:customer[1],res3:customer[2],res4:customer[3],res5:customer[4],res6:customer[5],res7:customer[6],res8:customer[7],res9:customer[8],res10:customer[9],res11:customer[10] });

    }
      
      setTimeout(sayHi, 30000);
 });



//serving up the index page
router.get('/',(req,res,next)=>{
 /* let user=req.session.user;
   if(user)
   {
       res.redirect('/home');
       return;
   }*/

res.render('index',{title:"My application"});

});

/*
//get home page 
router.get('/home',(req,res,next)=>{


    var data=[];
    alljobs(function(result)
    {
        console.log(result);
        if(result.length>=3)
        {
          data.push(result[result.length-1]);
          data.push(result[result.length-2]);
          data.push(result[result.length-3]);

        }
        else 
        {
            data.push(result[result.length-1]);
        }
        
        
    });

    var daata=[];
    allevents(function(result)
    {
        console.log(result);
        
        
          daata.push(result[result.length-1]);
          daata.push(result[result.length-2]);

        
        
    });

    var info=[];
    profile(req.session.user.username,function(result)
    {
        console.log(result);
        
        
          info.push(result[0]);

        
        
    });





    let user=req.session.user;
    if(user)
    {
       res.render('home',{app:req.session.app,name:user.fullname,info,daata,data});
       
        return;
    }
    res.redirect('https://www.iiitdmalumniportal.com/');
});

//register page
router.get('/register',(req,res,next)=>{

    let user=req.session.user;
    if(user)
    {
        res.redirect('/home');
        return;
    }
 
     res.render('register');
 });

//get login page
router.get('/login',(req,res,next)=>
{
    res.render('login');
}
);



// post login data
router.post('/login',(req,res,next)=>{
  user.login(req.body.username,req.body.password,function(result)
  {
      if(result)
      {
          req.session.user=result;
          req.session.app=1;
          res.redirect('/home');
      }
      else{
          res.send('Username/Password is incorrect'); 
      }
  })
});
//post register
router.post('/register',(req,res,next)=>
{

let userInput={
    username:req.body.username,
    fullname:req.body.fullname,
    password:req.body.password
};
  user.find(req.body.username,function(user)
  {
    if(user)
    {
        res.send('User already exists');
        return;
    }
  });
 user.create(userInput,function(lastId)
 {
    if(lastId) {
        // Get the user data by it's id. and store it in a session.
        user.find(lastId, function(result) {
            req.session.user = result;
            req.session.opp = 0;
            res.redirect('/login');
        });

    }else{
       console.log('Error creating a new User');
   }
     
 });
});


router.get('/logout',(req,res,next) =>
{
if(req.session.user)
{
    req.session.destroy(function()
    {
        res.redirect('https://www.iiitdmalumniportal.com/');
    });
}
});



//Taking basic registration information

router.get('/event',(req,res,next)=>{
    let user=req.session.user;
    if(user)
    {
       res.render('events',{app:req.session.app,name:user.fullname});
       
        return;
    }
    res.redirect('/');
});


router.get('/job',(req,res,next)=>{
    let user=req.session.user;
    if(user)
    {
       res.render('oppurtunitiy',{app:req.session.app,name:user.fullname});
       
        return;
    }
    res.redirect('https://www.iiitdmalumniportal.com/');
});


router.get('/info',(req,res,next)=>{
    let user=req.session.user;
    if(user)
    {
       res.render('info',{app:req.session.app,name:user.fullname});
       
        return;
    }
    res.redirect('https://www.iiitdmalumniportal.com/');
});


router.get('/alljobs',(req,res,next)=>{
    var data=[];
    alljobs(function(result)
    {
        console.log(result);
        for(var i=result.length-1;i>=0;i--)
        {
          data.push(result[i]);
        }
        
    });
   
    let user=req.session.user;
    
    if(user)
    {
       
           
            res.render('completeevents',{app:req.session.app,data});

        
        
       
        return;
    }

    res.redirect('https://www.iiitdmalumniportal.com/');
});

router.get('/allevents',(req,res,next)=>{
    var data=[];
    allevents(function(result)
    {
        console.log(result);
        
        for(var i=result.length-1;i>=0;i--)
        {
          data.push(result[i]);
        }
        
    });
   
    let user=req.session.user;
    
    if(user)
    {
       
           
            res.render('completejobs',{app:req.session.app,data});

        
        
       
        return;
    }

    res.redirect('https://www.iiitdmalumniportal.com/');
});

router.get('/profile',(req,res,next)=>{
    var info=[];
    profile(req.session.user.username,function(result)
    {
        console.log(result);
        
        
          info.push(result[0]);

        
        
    });
  let user=req.session.user;
    if(user)
    {
       res.render('profile',{app:req.session.app,info});
       
        return;
    }
    res.redirect('https://www.iiitdmalumniportal.com/');
});


  router.get('/search',(req,res,next)=>
  {
    var data=[];  
    var str=req.query.key;
    var num=str.length;
    var rest=str.slice(1,num);
    search(rest,function(result)
    {
        console.log(result);

        for( var i=0;i<result.length;i++)
        {
        data.push(result[i].username);
        }
        console.log(data);
        res.send(data);

    });
    
    
  });
  
  router.get('/searchresult',(req,res,next)=>{
    var info=[];
    var str=req.query.key;
    var num=str.length;
    var rest=str.slice(1,num);
    profile(rest,function(result)
    {
        console.log(result);
        
        
          info.push(result[0]);

        
        
    });
  let user=req.session.user;
    if(user)
    {
       res.render('profile',{app:req.session.app,info});
       
        return;
    }
    res.redirect('/https://www.iiitdmalumniportal.com/');
});

*/
module.exports=router;