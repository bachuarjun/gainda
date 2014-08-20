load('./dist/gainda.js');
//load("gainda-v1.js");
var options = {
	appName:'Gainda-v1-demo',
	uses:['base','graphics','controls','fxml','web','media','swing','swt'],
	//views:[],
	//tiles:[],
	onStartup:function(){
		this.render("landing","loginView");
	}
}

var app = Gaint.application(options);
/*
	All the views registered here, we can keep these views as seperate file
 	and we can make use of load() method later point
*/
app.view({
			name:'loginView',
			content:function(){
				var application = this.application;
				var button = new Button();
				button.text = 'Yeah! Clik Me';
				button.onAction = function() {
					
					application.render("home","homeView");
					print("from login view working !!!")
				}
				return button;
			}
});

app.view({
			tile:'home',
			name:'homeView',
			content:function(){
				var application = this.application;
				var button = new Button();
				button.text = 'Home Button';
				button.onAction = function() { 
					application.render("landing","loginView");
					print("from home view working !!!")
				}
				return button;
			}
});

/*
	All the tiles registered here, we can keep these tiles as seperate file
 	and we can make use of load() method later point
*/

app.tile({
			name:'landing',
			content:function(){
				var pane = new StackPane();
				pane.title = "Landing"; 
				return new Scene(pane,500,500);
			}
});

app.tile({
			name:'home',
			content:function(){
				var pane = new StackPane();
				pane.title = "Home"; 
				return new Scene(pane,500,500);
			}
});

app.run();