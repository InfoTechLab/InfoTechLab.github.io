var chainrxn = false;
Ball = new Class({
	number: 0,
	xposition: 0,
	yposition: 0,
	downspeed: 0,
	rightspeed: 0,
	color: "#fff",
	srcs: "images/shit.png",
	radius: 0,
	expanding: 0,
	sizeChangeCount: 0,
	disabled: false,
	expanded: false,
	chainlevel: 0,
	initialize: function (gameLevel, number, xposition, yposition) {
		this.number = number;
		this.gameLevel = gameLevel;
		this.radius = this.gameLevel.ballSize;
		if(xposition == null) {
			this.xposition = (this.gameLevel.xmax - 2 * this.gameLevel.ballSize) * Math.random() + this.gameLevel.ballSize;
			this.yposition = (this.gameLevel.ymax - 2 * this.gameLevel.ballSize) * Math.random() + this.gameLevel.ballSize;
			var direction = Math.random() * 360;
			this.downspeed = Math.cos(direction) * this.gameLevel.ballSpeed;
			this.rightspeed = Math.sin(direction) * this.gameLevel.ballSpeed;
			this.color = "rgb(" + Math.round(255 * Math.random()) + ", " + Math.round(255 * Math.random()) + ", " + Math.round(255 * Math.random()) + ")";
		} else {
			this.xposition = xposition;
			this.yposition = yposition;
			this.color = "rgb(150,150,150)";
			this.startExpansion();
		}
		this.gameLevel.movingBalls.push(this);
		this.draw();
	},
	move: function () {
		this.xposition += this.rightspeed;
		this.yposition += this.downspeed;
		this.draw();
		var notHit = true;
		this.gameLevel.expandedBalls.each(function (expandedBall) {
			if(notHit && this.gameLevel.movingBalls[expandedBall].expanded == true && Math.sqrt(Math.pow(this.gameLevel.movingBalls[expandedBall].xposition - this.xposition, 2) + Math.pow(this.gameLevel.movingBalls[expandedBall].yposition - this.yposition, 2)) <= this.radius + this.gameLevel.movingBalls[expandedBall].radius) {
				this.chainlevel = this.gameLevel.movingBalls[expandedBall].chainlevel + 1;
				this.startExpansion();
				notHit = false;
			}
		}.bind(this))
		if(notHit) {
			if(this.xposition <= this.gameLevel.ballSize || this.xposition >= this.gameLevel.xmax - this.gameLevel.ballSize) {
				this.rightspeed = -1 * this.rightspeed;
			}
			if(this.yposition <= this.gameLevel.ballSize || this.yposition >= this.gameLevel.ymax - this.gameLevel.ballSize) {
				this.downspeed = -1 * this.downspeed;
			}
		}
	},
	startExpansion: function () {
		this.expanded = true;
		this.gameLevel.expandedBalls.push(this.number);
		this.gameLevel.totalBallsExpanded++;
		this.gameLevel.chainrxn.ballsExpandedEl.set("text", "已经炸了" + this.gameLevel.totalBallsExpanded + "份了");
		var newPoints = 100 * Math.pow(this.chainlevel, 3);
		this.gameLevel.score += newPoints;
		this.gameLevel.chainrxn.levelScoreEl.set("text", this.gameLevel.score + "关卡分");
		this.gameLevel.chainrxn.totalScoreEl.set("text", this.gameLevel.score + this.gameLevel.chainrxn.score + " 总分");
		this.downspeed = 0;
		this.rightspeed = 0;
		this.expanding = 1;
		if(this.gameLevel.totalBallsExpanded >= this.gameLevel.ballWinCount && document.body.getStyle("background") != "#333") {
			this.gameLevel.showWinBG();
		}
		(function () {
			this.expanding = -1;
			this.sizeChangeCount = this.gameLevel.shrinkingIntervals;
		}).bind(this).delay(this.gameLevel.expandedLifeLength);
		if(this.number == this.gameLevel.numBalls) {
			return;
		}
		var coordinates = this.gameLevel.chainrxn.ballField.getCoordinates();
		var pointBox = new Element("div", {
			"text": "+" + newPoints
		}).inject(document.body);
		pointBox.addClass("points");
		pointBox.setStyles({
			"position": "absolute",
			"top": (this.yposition + coordinates.top - this.gameLevel.pointPopupHeight / 2),
			"left": (this.xposition + coordinates.left - this.gameLevel.pointPopupWidth / 2)
		});
		(function () {
			pointBox.destroy();
		}).delay(this.gameLevel.expandedLifeLength, this);
	},
	expand: function () {
		this.radius = Math.round(this.sizeChangeCount * (this.gameLevel.expandedBallSize - this.gameLevel.ballSize) / this.gameLevel.expandingIntervals + this.gameLevel.ballSize)+15;
		this.draw();
		this.sizeChangeCount++;
		if(this.gameLevel.expandingIntervals < this.sizeChangeCount) {
			this.sizeChangeCount = 0;
			this.expanding = 2;
		}
	},
	shrink: function () {
		this.radius = Math.round(this.sizeChangeCount * (this.gameLevel.expandedBallSize) / this.gameLevel.shrinkingIntervals);
		this.draw();
		if(this.sizeChangeCount == 0) {
			this.expanded = false;
			this.expanding = 0;
			this.gameLevel.expandedBalls.erase(this.number);
			this.disabled = true;
		}
		this.sizeChangeCount--;
	},
	maintain: function () {
		if(this.expanding == 1) {
			this.expand();
		} else if(this.expanding == -1) {
			this.shrink();
		} else if(this.expanded == true) {
			this.draw();
		} else if(this.disabled == false) {
			this.move();
		}
	},
	draw: function () {
		this.gameLevel.canvas.beginPath();
		this.gameLevel.canvas.fillStyle = this.color;
		this.gameLevel.canvas.moveTo(this.xposition, this.yposition);
		if(this.expanding){
			this.gameLevel.canvas.arc(this.xposition, this.yposition, this.radius, 0, Math.PI * 2, true);
		}else{
			var imgs = new Image();
			imgs.src = this.srcs;
			this.gameLevel.canvas.drawImage(imgs,this.xposition,this.yposition);
		}
		this.gameLevel.canvas.closePath();
		this.gameLevel.canvas.fill();
	}
})
var StarterBall = new Class({
	element: false,
	xposition: false,
	yposition: false,
	gameLevel: false,
	initialize: function (gameLevel) {
		this.gameLevel = gameLevel;
		var coordinates = this.gameLevel.chainrxn.ballField.getCoordinates();
		var dimensions = this.gameLevel.chainrxn.ballField.getSize();
		this.element = new Element("div", {
			"id": "starterBall"
		}).inject(document.body);
		this.xposition = coordinates.left + dimensions.x / 2;
		this.yposition = coordinates.top + dimensions.y / 2;
		this.move();
	},
	checkBounds: function () {
		var coordinates = this.gameLevel.chainrxn.ballField.getCoordinates();
		var max_y = this.gameLevel.ymax + coordinates.top;
		var max_x = this.gameLevel.xmax + coordinates.left;
		if(this.xposition > max_x) {
			this.xposition = max_x;
		} else if(this.xposition < coordinates.left) {
			this.xposition = coordinates.left;
		}
		if(this.yposition > max_y) {
			this.yposition = max_y;
		} else if(this.yposition < coordinates.top) {
			this.yposition = coordinates.top;
		}
	},
	move: function () {
		this.checkBounds();
		this.element.setStyles({
			"top": this.yposition - this.gameLevel.starterBallSize,
			"left": this.xposition - this.gameLevel.starterBallSize
		})
	},
	place: function (e) {
		if(e.pageX){
			this.xposition = e.pageX;
			this.yposition = e.pageY;
		}else{
			this.xposition = e.page.x;
			this.yposition = e.page.y;
		}
		
		this.checkBounds();
		var coordinates = this.gameLevel.chainrxn.ballField.getCoordinates();
		new Ball(this.gameLevel, this.gameLevel.numBalls, this.xposition - coordinates.left, this.yposition - coordinates.top);
		this.element.removeClass("starterBall");
		this.element.destroy();
		$$("body")[0].removeEvents("mousemove");
		$$("body")[0].removeEvents("click");
	}
})
var GameLevel = new Class({
	ballSize: 5,
	expandedBallSize: 5,
	ballSpeed: 4,
	numBalls: 5,
	ballWinCount: 4,
	checkInterval: 30,
	expandDelay: 300,
	shrinkDelay: 1500,
	expandedLifeLength: 3300,
	starterBallSize: 92,
	ballOpacity: 0,
	xmax: 640,
	ymax: 960,
	chainrxn: false,
	ballField: false,
	expandedBalls: [],
	movingBalls: [],
	repeater: false,
	totalBallsExpanded: -1,
	score: 0,
	expandingIntervals: 0,
	pointPopupHeight: 20,
	pointPopupWidth: 50,
	canvas: false,
	initialize: function (ballDetails, chainrxn) {
		this.chainrxn = chainrxn;
		this.chainrxn.ballField.setStyle("background-color", "#333");

		this.xmax = parseInt(this.chainrxn.ballField.getStyle("width"));
		this.ymax = parseInt(this.chainrxn.ballField.getStyle("height"));
		if ((this.xmax)*(this.ymax) < 500000) {
			this.expandedBallSize = 24;
			this.ballSize = 4;
			this.ballSpeed = 2;
		}
		if ((this.xmax)*(this.ymax) >= 800000 && (this.xmax)*(this.ymax) < 1200000) {
			this.expandedBallSize = 45;
			this.ballSize = 6;
			this.ballSpeed = 5;
		}
		if ((this.xmax)*(this.ymax) >= 1200000) {
			this.expandedBallSize = 55;
			this.ballSize = 7;
			this.ballSpeed = 5;
		}
		if(this.chainrxn.ballField.getContext) {
			this.canvas = this.chainrxn.ballField.getContext("2d");
		} else {
			return alert("Your browser does not appear to support canvas, and our attempts to emulate it have failed.");
		}
		/*this.chainrxn.ballField.set({
			"height": this.ymax,
			"width": this.xmax
		});*/
		this.chainrxn.ballField.set({
			"height": this.ymax,
			"width": this.xmax
		});
		this.canvas.globalAlpha = 0.7;
		this.numBalls = ballDetails[1];
		this.ballWinCount = ballDetails[0];
		this.expandingIntervals = Math.round(this.expandDelay / this.checkInterval);
		this.shrinkingIntervals = Math.round(this.shrinkDelay / this.checkInterval);
		for(var i = 0; i < this.numBalls; i++) {
			new Ball(this, i);
		}
		starterBall = new StarterBall(this);
		this.repeater = function () {
			this.canvas.clearRect(0, 0, this.xmax + this.ballSize, this.ymax + this.ballSize);
			if($chk(starterBall)) {
				starterBall.move();
			} else if(this.expandedBalls.length == 0) {
				if(this.totalBallsExpanded < this.ballWinCount) {
					this.doLoser();
				} else {
					this.doWinner();
				}
			}
			this.movingBalls.each(function (ball, index) {
				ball.maintain();
			}.bind(this))
		}.bind(this).periodical(this.checkInterval)
		
		$$("body")[0].addEvent("mousemove", function (e) {
			starterBall.xposition = e.page.x;
			starterBall.yposition = e.page.y;
		}.bind(this))
		
		$$("body")[0].addEvent("touchmove", function(event){
			var touch = event.changedTouches[0];
			starterBall.xposition = touch.pageX;
			starterBall.yposition = touch.pageY;
		}.bind(this))	

		$$("body")[0].addEvent("touchend", function(event){
			
			//var touch = event.changedTouches[0];
			//starterBall.place(touch);
		}.bind(this))
			
		$$("body")[0].addEvent("click", function (e) {
			if(e.target.id != "notifierButton") {
				if(e.changedTouches){
					e = e.changedTouches[0];	
				}
				starterBall.place(e);
				starterBall = null;
				this.chainrxn.levelNumberEl.set("text", "第" + (this.chainrxn.levelNumber + 1) + "关");
			}
		}.bind(this))
	},
	showWinBG: function () {
		this.chainrxn.ballField.set("morph", {
			"duration": 1000
		});
		this.chainrxn.ballField.morph({
			"background-color": "#525252"
		})
	},
	doLoser: function () {
		this.repeater = $clear(this.repeater);
		this.canvas.clearRect(0, 0, this.xmax + this.ballSize, this.ymax + this.ballSize);
		this.chainrxn.repeatLevel(this.score);
	},
	doWinner: function () {
		this.repeater = $clear(this.repeater);
		(function () {
			this.canvas.clearRect(0, 0, this.xmax + this.ballSize, this.ymax + this.ballSize);
			this.chainrxn.doNextLevel(this.score);
		}).delay(this.expandDelay, this)
	}
})
var ChainRxn = new Class({
	score: 0,
	game: false,
	notifierBox: false,
	notifierTitle: false,
	notifierButton: false,
	notifierButton2: false,
	ballsExpandedEl: false,
	levelScoreEl: false,
	totalScoreEl: false,
	levelNumberEl: false,
	ballField: false,
	levels: [[1, 10], [4, 20], [8, 30], [15, 40],[25, 50], [40, 60], [57, 70], [70, 80], [80, 90],[90, 100],[100, 110]],
	levelNumber: 0,
	initialize: function () {
		this.notifierBox = $m('notifierBox');
		this.notifierTitle = $m('notifierTitle');
		this.notifierButton = $m('notifierButton');
		this.notifierButton2 = $m('notifierButton2');
		this.ballsExpandedEl = $m('ballsExpanded');
		this.levelScoreEl = $m('levelScore');
		this.totalScoreEl = $m('totalScore');
		this.levelNumberEl = $m('levelNumber');
		this.ballField = $m("ballField");
		this.notifierButton.addEvent("click", function () {
			this.notifierButton.removeEvents();
			this.newGame();
		}.bind(this))
	},
	repeatLevel: function (score) {
		dp_submitScore(this.score+score,this.levelNumber);
		this.notifierTitle.set("text", "游戏结束！累计得分"+(this.score+score));
		this.notifierButton.set("text", "重新开始");
		document.getElementById('html5').src = "images/html4.png";
		this.notifierBox.setStyle("display", "");
		this.notifierButton.addEvent("click", function () {
			this.levelNumber=0;
			this.score=0;
			this.newGame();
		}.bind(this))
		this.notifierButton2.addEvent("click", function () {
				clickMore();
		})
	},
	doNextLevel: function (score) {
		this.levelNumber++;
		this.score += score;
		this.notifierTitle.set("text", "成功击退屎群！累计得分" + this.score);
		this.notifierBox.setStyle("display", "");
		document.getElementById('html5').src = "images/html3.png";
		if(this.levelNumber < this.levels.length) {
			this.notifierButton.set("text", "开炸");
			this.notifierButton.addEvent("click", function () {
				this.newGame();
			}.bind(this))
			this.notifierButton2.addEvent("click", function () {
				clickMore();
			})
		} else {
			//weixinShare(this.levelNumber,this.score);
			dp_submitScore(this.score,this.levelNumber);
			this.notifierTitle.set("text", "恭喜您全部过关了!");
			this.notifierButton.set("text", "重新再炸");
			this.notifierButton.addEvent("click", function () {
				window.location = window.location;
			})
			this.notifierButton2.addEvent("click", function () {
				clickMore();
			})
		}
	},
	newGame: function () {
		this.ballsExpandedEl.empty();
		this.levelScoreEl.empty();
		this.totalScoreEl.empty();
		this.levelNumberEl.empty();
		this.notifierTitle.set("text", "炸掉" + this.levels[this.levelNumber][0] + "坨屎");
		this.notifierButton.set('text', "开炸");
		this.notifierButton.removeEvents();
		this.notifierButton.addEvent("click", function () {
			this.notifierBox.setStyle("display", "none");
			this.notifierButton.removeEvents();
			this.game = new GameLevel(this.levels[this.levelNumber], this);
		}.bind(this))
		this.notifierButton2.addEvent("click", function () {
				clickMore();
		})
	}
})
window.addEvent("load", function () {
	chainrxn = new ChainRxn;
}.bind(this))
function shareTitle(score,level){
	var honor;
	var str;
	if(level < 9) {
		honor = Math.round(level*9.126*100)/100;
	}else{
		honor = (9*9.126+(level-9)*0.219) < 100 ? Math.round((9*9.126+(level-9)*0.219)*100)/100 : 1234.56;
	} 
	if (level < 9) {
		str = "我炸了" + score +"分,停留在第"+ level +"关,击败了全国"+honor +"%的人,屎学界对我尚未定论";
	}
	if (level >= 9 && score > 45000001) {
		str = "我炸了" + score +"分就过关了,击败了全国"+ honor +"%的人,成为了屎皇帝！";
	}
	if (level >= 9 && score < 45000001) {
		str = "我炸了" + score +"分过关,击败了全国"+ honor +"%的人,屎里有毒！";
	}
	return str;
}