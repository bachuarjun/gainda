(function(globalObj){
	/*function that loads mofules*/
	function loadmodules(modules){
		for(i in modules){
			load("fx:"+modules[i]+".js");
		}
	};

	function makeViews(app, views){
		for(i in views){
			print("view"+i);
			app.view(views[i]);
		}
	}

	function makeTiles(app, tiles){
		for(i in tiles){
			print("tile"+i);
			app.tile(tiles[i]);
		}
	}

	this.Gaint = {
		/*
			@options
				it can be an plain js object with fallowing properties.
				#uses -- array of module names that are used inside the app
				#appName--Application name
				#views--Array of view options object @see application.view() function's options
				#tiles--Array of tile options object @see application.tile() function's options
		*/
		"application":function(options){
			loadmodules(requiredModules);
			/*private variable for returned object form this function*/
			var requiredModules = [].concat(options.uses);		
			var HashMap = Java.type("java.util.HashMap"); 
			//var WeakHashMap = Java.type("java.util.WeakHashMap"); 
			return {
				
				appName:options.appName,
				tiles: new HashMap(),
				views: new HashMap(),
				screens:new HashMap(),

				init:function(){
					print("Init...");
					var app = this;
					loadmodules(requiredModules);
					/*
						making all the viwes & tiles ready
					*/
					if(options.views != undefined)
						makeViews(app,options.views);
					/**/
					if(options.views != undefined)
						makeTiles(app,options.tiles);
				},
				/*Keep updated*/
				tile:function(options){
					var app = this;
					var tileDef = {
						application:app,
						content:options.content
					};
					app.tiles.put(options.name,tileDef);
				},
				getTile:function(tileName){
					var app = this;
					return app.tiles.get(tileName).content();
				},
				getView:function(viename){
					return this.views.get(viename);
				},
				/*Keep updated*/
				view:function(options){
					var me = this;
					var viewDef =  {
						application:me,
						content:options.content
					};
					this.views.put(options.name,viewDef);
					return viewDef;

				},
				render:function(tileName,viewName){
					var tile = this.tiles.get(tileName);
					var view = this.views.get(viewName);
					//tile.content().getRoot().children.removeAll();
					var scene = tile.content();
					scene.getRoot().children.add(view.content());
					$STAGE.scene = scene;
				},
				run:function(){
					var app = this;
					app.init();
					options.onStartup.apply(app,[]);
				},
				screen:function(options){
					var app = this;
					var screendef = {};
					screendef.tiles = [];
					if(options && typeof options =="object"){
						screendef.tiles = screendef.tiles.concat(options.tiles);
						screendef.layout = options.layout;
						screendef.getPart = function(name){
							return this.parts[name];
						};
						app.screens.put(options.name,screendef);
						

					}
				},
				renderScreen:function(screenname){
					var app = this;
					var scr = app.screens.get(screenname);
					var injects = [$STAGE];
					var tiles = scr.tiles;
					scr.parts = {};

					//print("rSC"+scr.tiles);
					for(i in tiles){
						print("tile"+i);
						var til = app.getTile(tiles[i]);

						injects.push(til);
						scr.parts[tiles[i]] = til; 
					}
					//print("rSC"+ injects.length);
					scr.layout.apply(app,injects);
					}


			}
		}
	}
})(this);