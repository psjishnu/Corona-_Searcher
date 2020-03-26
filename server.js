var express = require('express');
var app = express();
var request = require("request");
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });





var port = process.env.PORT || 8000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {


		  res.render('index',{result:""});
});
app.post('/done',urlencodedParser ,function(req,res){
		var country = req.body.name;
		var qtn = req.body.selector;
		var URL = "https://coronavirus-tracker-api.herokuapp.com/x1";
		URL=URL.replace("x1",qtn);
		country = country.toLowerCase();
	request({
		uri: URL ,
	  }, function(error, response, body) {

			body = JSON.parse(body);
			body = (JSON.stringify(body));
			var i=0;var j=0,i1=0,j1=0,l1=0;
			var leng = body.length;
			var clen = country.length;
			var sum=0;
			
			for(i=0;i<leng;i++){
				if(country[0]==body[i].toLowerCase()){
					j=i;
					if((body.substring(j,j+clen)).toLowerCase()==country  && body[j+clen]=='\"'  && body[j-1]=='\"' ) {
						for(i1=i;i1<leng;i1++){
							if(body[i1]=='l'){
								j1=i1
								if(body.substring(j1,j1+6)=="latest"){
									l1=j1+8;
									while(body[l1]!=','){
										l1=l1+1;
									}
									sum=sum+Number(body.substring(j1+8,l1));
									break
								}
							}
						}
					}
				}
			}
			msg="";
			if(qtn=="deaths")
			{
				msg=sum+" people died in "+country;
			}
			if(qtn=="confirmed")
			{
				msg="There are "+sum+" confirmed cases of Corona in "+country;
			}
			if(qtn=="recovered")
			{
				msg=sum+" people have been recovered from Corona in "+country;
			}

			res.render('index',{result:msg});

	  });

}); 
  



app.listen(port, function() {
	console.log('Corona details is running on http://localhost:' + port);
});
