load('./dist/gainda.js');
//load("gainda-v1.js");
var options = {
	appName:'Gainda-v1-demo',
	uses:['base','graphics','controls','fxml','web','media','swing','swt'],
	//views:[],
	//tiles:[],
	onStartup:function(){
		this.renderScreen("main");
	}
}

var app = Gaint.application(options);


app.tile({
			name:'header',
			content:function(){
				var header = new HBox();
				header.getChildren().add(new Text("Header")); 
				//header.
				return header;
			}
});

app.tile({
			name:'footer',
			content:function(){
				var footer = new HBox();
				footer.getChildren().add(new Text("footer @copy 2005"));
				var btn = new Button(); 
				btn.text = "Login";
				btn.onAction = function(){
					var contentPart = app.screens.get('main').getPart('content');
					contentPart.getChildren().clear();
					contentPart.getChildren().add(new Text("Login Success"));
				};
				footer.getChildren().add(btn); 
				return footer;
			}
});

app.tile({
			name:'content',
			content:function(){
				var content = new VBox();
				var line1 = new HBox();
				var line2 = new HBox();
				line1.getChildren().add(new Label("un")); 
				line1.getChildren().add(new TextField()); 
				line2.getChildren().add(new Label("un")); 
				line2.getChildren().add(new TextField());
				content.getChildren().add(line1);
				content.getChildren().add(line2);

				return content;
			}
});
app.screen({
	name:'main',
	tiles:['header','content','footer'],
	layout:function(stage,header,content,footer){
		var pane = new VBox();
		try{
			
			pane.getChildren().add(header);
			pane.getChildren().add(content);
			pane.getChildren().add(footer);
		
		}catch(e){
			e.printStackTrace();
		}
		 var scene  = new Scene(pane,500,500);
		// scene.getRoot().children.add(landing);
		 //scene.getRoot().children.add(home);
		stage.scene = scene ;
	}
});

app.run();
