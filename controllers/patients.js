var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require ('multer');



var db = require.main.require ('./models/db_model');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, "public/assets/images/upload_images");
    },
    filename: function(req, file, cb) {
      console.log(file); 
      cb(null, file.originalname);
    }
  });

var upload = multer({ storage: storage });


router.get('/',function(req,res){

    db.getAllPatient(function(err,result){
        if(err)
        throw err;
        res.render('patients.ejs',{list : result})
    });
    
});

router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());

router.get('/add_patient',function(req,res){
    db.getalldept(function(err,result){
        res.render('add_patient.ejs',{list:result});
    });

    
});

router.post('/add_patient',upload.single("image"),function(req,res){


        db.add_patient(req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone);
        if(db.add_patient){
            console.log('1 patient inserted');
        }
        res.redirect('/patients');
    });

    router.get('/edit_patient/:id',function(req,res){
        var id = req.params.id;

        db.getPatById(id,function(err,result){
            
                res.render('edit_patient.ejs' ,{list : result});
                       
        });
    });

    router.post('/edit_patient/:id',function(req,res){
        var id = req.params.id;
        db.editPatient(id,req.body.first_name,req.body.last_name,req.body.email,req.body.dob,req.body.gender,req.body.address,req.body.phone,function(err,result){
            if (err) throw err;
            
        res.redirect('back');
         
        
            
        });
});

router.get('/delete_patient/:id',function(req,res){
    var id = req.params.id;
    db.getPatById(id,function(err,result){
        res.render('delete_patient.ejs',{list:result})
    });

    
});

router.post('/delete_patient/:id',function(req,res){
    var id = req.params.id;
    db.deletePatient(id,function(err,result){
        res.redirect('/patients');
    });
});



    router.get('/',function(req,res){

        db.getAllPatient(function(err,result){
            if(err)
            throw err;
            res.render('patients.ejs',{list : result})
        });
        
    });


    router.post('/search',function(req,res){
        var key = req.body.search;
        db.searchPatient(key,function(err,result){
            console.log(result);
            
            res.render('patients.ejs',{list : result});
        });
    });

module.exports = router;