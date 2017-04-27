(function() {



	var scriptName = "embed.js"; 
    var jQuery; //noconflict reference to jquery
    var jqueryPath = "https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"; 
	var bootstrapjs = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js";
	var bootstrap_css = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    var jqueryVersion = "1.11.3";
    var scriptTag; //reference to the html script tag

    /******** Get reference to self (scriptTag) *********/
    var allScripts = document.getElementsByTagName('script');
    var targetScripts = [];
    for (var i in allScripts) {
        var name = allScripts[i].src
        if(name && name.indexOf(scriptName) > 0)
            targetScripts.push(allScripts[i]);
    }

    scriptTag = targetScripts[targetScripts.length - 1];

    /******** helper function to load external scripts *********/
			function loadScript(src, onLoad) {
				
				var script_tag = document.createElement('script');
				script_tag.setAttribute("type", "text/javascript");
				script_tag.setAttribute("src", src);

				if (script_tag.readyState) {
					script_tag.onreadystatechange = function () {
						if (this.readyState == 'complete' || this.readyState == 'loaded') {
							onLoad();
						}
					};
				} else {
					script_tag.onload = onLoad;
				}
				(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
			}
	

    /******** helper function to load external css  *********/
			function loadCss(href) {
				
				var link_tag = document.createElement('link');
				link_tag.setAttribute("type", "text/css");
				link_tag.setAttribute("rel", "stylesheet");
				link_tag.setAttribute("href", href);
				(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(link_tag);
			}

    /******** load jquery into 'jQuery' variable then call main ********/
			if (window.jQuery === undefined || window.jQuery.fn.jquery !== jqueryVersion) {

				// load jquery
				loadScript(jqueryPath, initjQuery);
				// load bootstrap
				var bootstrap_script = document.createElement('script');
					bootstrap_script.setAttribute("type", "text/javascript");
					bootstrap_script.setAttribute("src",
				"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js");

					(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(bootstrap_script);
				// load bootstrapcss
				loadCss(bootstrap_css);
				

			} else {
				initjQuery();
			}

			function initjQuery() {
				
			   jQuery = window.jQuery;

				main();
				

			}

/******** Our main function ********/
		function main() { 
			
						jQuery(document).ready(function($) { 
						
								if (typeof jQuery != 'undefined') {  
								// jQuery is loaded => print the version to check that it is not conflicting with parent pages
								//  alert(jQuery.fn.jquery);
								}
						
						var widget_url = "http://localhost:8000/jsonp/"+Lboxid+"?callback=?";

							  
								jQuery.getJSON(widget_url, function(data) {
									jQuery('#example-widget-container').html(data.body);
								});
							
						});
		}

})();