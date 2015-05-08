/**
 *
 * Fancy image popup
 * usage: to use it, simply add attribute [data-popup] to your image
 * supports all modern browsers
 *
 */

window.onload = function(){
	this.image = document.getElementsByTagName("img");

	for (var i = 0; i < this.image.length; i++){
		if (image[i].getAttribute("data-popup") != null) {
			image[i].addEventListener("click", function(e){
				createPopupOverlay();
				createImageAndHolder(this);				

				showAll();
			});
		}
	}
	
}

/**
 * Create div container with fancy dim style
 */
function createPopupOverlay(){
	this.div = document.createElement("div");
	this.div.setAttribute("class", "popup-overlay");
	this.div.setAttribute("style", "" +
						"position: absolute;" +
						"z-index: 98;" +
						"width: 100%;" +
						"height: 100%;" +
						"top: 0;" +
  						"left: 0;" +
  						"right: 0;" +
  						"-webkit-transition: all 0.2s ease-in-out;" +
  						"-moz-transition: all 0.2s ease-in-out;" +
  						"-o-transition: all 0.2s ease-in-out;" +
  						"-ms-transition: all 0.2s ease-in-out;" +
  						"transition: all 0.2s ease-in-out;" +
  						"background: #000;" +
  						"opacity: 0;" +
						"margin: 0 auto;");

	document.body.appendChild(this.div);
}

/**
 * Create abstract div container and keep image in it
 */
function createImageAndHolder(me){
	var styles = getElementStyles(me);
	var aspectRatio = calculateAspectRatio(parseFloat(styles.width), parseFloat(styles.height),
		window.innerWidth, window.innerHeight);

	/// section: popup image
	this.newImage = document.createElement("img");
	this.newImage.setAttribute("src", me.getAttribute("src"));
	this.newImage.setAttribute("class", "popup-image");
	this.newImage.setAttribute("style", "" +
			"position: absolute;" +
			"z-index: 100;" +
			"width: " + aspectRatio * parseFloat(styles.width) * 0.8 + "px;" +
			"top: 10%;" +
			"left: 10%;" +
			"right: 10%;" +
			"-webkit-transition: all 0.2s ease-in-out;" +
			"-moz-transition: all 0.2s ease-in-out;" +
			"-o-transition: all 0.2s ease-in-out;" +
			"-ms-transition: all 0.2s ease-in-out;" +
			"transition: all 0.2s ease-in-out;" +
			"opacity: 0;" +
			"margin: 0 auto;");

	/// section: create popup close button
	this.closePopup = document.createElement("div");
	this.closePopup.setAttribute("class", "close-popup");
	this.closePopup.setAttribute("style", "" +
			"position: absolute;" +
			"z-index: 101;" +
			"width: 40px;" +
			"height: 40px;" +
			"background: #FFF;" +
			"border-radius: 20px;" +
			"top: 10%;" +
			"left: " + Number(Number(Number((window.innerWidth / 2)) +
					   Number(((Number(styles.width.replace("px", ""))) * aspectRatio * 0.8).toFixed(2)) / 2)-20) + "px;" +
			
			"-webkit-transition: all 0.2s ease-in-out;" +
			"-moz-transition: all 0.2s ease-in-out;" +
			"-o-transition: all 0.2s ease-in-out;" +
			"-ms-transition: all 0.2s ease-in-out;" +
			"transition: all 0.2s ease-in-out;" + 
			"opacity: 0;" +
			"margin: 0 auto;");

	document.body.appendChild(this.newImage);
	document.body.appendChild(this.closePopup);

	createCloseButton();
}

function createCloseButton(){
	this.crossOne = document.createElement("div");
	this.crossOne.setAttribute("style", "" +
			"position: relative;" +
			"width: 30px;" +
			"height: 4px;" +
			"background: #000;" +
			"-ms-transform: rotate(45deg);" +
    		"-webkit-transform: rotate(45deg);" + 
    		"transform: rotate(45deg);" +
			"opacity: 1;" +
			"margin: 18px auto 0 auto;");

	this.crossTwo = document.createElement("div");
	this.crossTwo.setAttribute("style", "" +
			"position: relative;" +
			"width: 30px;" +
			"height: 4px;" +
			"background: #000;" +
			"-ms-transform: rotate(-45deg);" +
    		"-webkit-transform: rotate(-45deg);" + 
    		"transform: rotate(-45deg);" +
			"opacity: 1;" +
			"margin: -4px auto 0 auto;");

	var popupCloseButton = document.getElementsByClassName("close-popup")[0];
	popupCloseButton.appendChild(this.crossOne);
	popupCloseButton.appendChild(this.crossTwo);
}

/**
 * show new elements and add listeners
 */
function showAll(){
	setTimeout(function(){
		var popupImage = document.getElementsByClassName("popup-image")[0];
		popupImage.style.opacity = 1;

		var popupOverlay = document.getElementsByClassName("popup-overlay")[0];
		popupOverlay.style.opacity = 0.5;

		var closePopup = document.getElementsByClassName("close-popup")[0];
		closePopup.style.opacity = 1;

		popupOverlay.addEventListener("click", function(){
			removePopup();
		});

		closePopup.addEventListener("click", function(){
			removePopup();
		});
	}, 0);
}

function getElementStyles(element){
	return window.getComputedStyle(element, null);
}

 function calculateAspectRatio(srcWidth, srcHeight, maxWidth, maxHeight) {
    return Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
 }

 function removePopup(){
 	document.getElementsByClassName("popup-image").remove();
	document.getElementsByClassName("close-popup").remove();
	document.getElementsByClassName("popup-overlay").remove();
 }

 document.addEventListener("keyup", function(e){
 	if (e.keyCode == 27)
 		removePopup();
 });

 /**	
  * Helpers
  */
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = 0, len = this.length; i < len; i++) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
