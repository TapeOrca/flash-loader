var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");


/******************************************************************************
*     GAME SETTINGS
*******************************************************************************/

// Ad Settings
var Ad_Duration = 15;						// Seconds
var Ad_Width = null;						// If set to 'null', the width of the game screen is used
var Ad_Height = null;						// If set to 'null', the height of the game screen is used
var Game_BgColor = 'lightsteelblue';
var Run_Preroll = true;
var Run_Midroll = false;
var Run_Postroll = false;

// Ad Page(s)
var Preroll_Src_Path = 'preroll.html';
var Midroll_Src_Path = 'midroll.html';
var Postroll_Src_Path = 'postroll.html';
var Min_Time_Between_Ads = 60;				// Seconds

// Upsell Settings
var Enable_Upsell = true;
var Upsell_Url = 'https://web.archive.org/web/20091026180645/http://www.popcap.com/games/pvz'; // This doesn't get used if Enable_Upsell = false

// Absolute Path to Game Files
// (If left blank, it will be assumed that the game files are in the same folder as this include file.)
var Base_Path = '';
  
/******************************************************************************
*     POPCAPGAME BASE
*******************************************************************************/

var thePopCapGame = null;

function popCapGame(gameName, id, gameWidth, gameHeight)
{
    popCapGame.prototype.displayName = gameName;
    popCapGame.prototype.id = id;
    popCapGame.prototype.width = gameWidth;
    popCapGame.prototype.height = gameHeight;
    
    popCapGame.prototype.paramNames = new Array();
    popCapGame.prototype.params = new Array();	
    popCapGame.prototype.hosts = new Array();
    popCapGame.prototype.signatures = new Array();
	
    popCapGame.prototype.partnerName = '';
	popCapGame.prototype.basePath = '';
    popCapGame.prototype.upsellUrl = '';
	popCapGame.prototype.objectSetup = '';
	popCapGame.prototype.containerId = 'gamediv';
	
	popCapGame.prototype.LoadBroadcast = 'LoadBroadcast';
	popCapGame.prototype.SessionReady = 'SessionReady';
	popCapGame.prototype.GameReady = 'GameReady';
	popCapGame.prototype.ScoreBroadcast = 'ScoreBroadcast';
	popCapGame.prototype.GameBreak = 'GameBreak';
	popCapGame.prototype.ScoreSubmit = 'ScoreSubmit';
	popCapGame.prototype.GameEnd = 'GameEnd';
	popCapGame.prototype.CustomEvent = 'CustomEvent';
	
    popCapGame.prototype.levelCount = 0;
	popCapGame.prototype.gameObject = null;
    popCapGame.prototype.hide = false;
}

popCapGame.prototype.pathConcat = function(first,last)
{
	if (first == '') return last;
	if (first.search(/\/$/) == -1) return first + '/' + last;
	return first + last;
}

popCapGame.prototype.applyBasePath = function()
{
}

popCapGame.prototype.write = function()
{
}

popCapGame.prototype.getParams = function()
{
}

popCapGame.prototype.sendNotification = function(method,params)
{
}

popCapGame.prototype.receiveNotification = function(method,params)
{
	if (method == this.LoadBroadcast) { LoadBroadcast(params); }
	else if (method == this.SessionReady) { SessionReady(params); }
	else if (method == this.GameReady) { GameReady(params); }
	else if (method == this.ScoreBroadcast) { ScoreBroadcast(params); }
	else if (method == this.GameBreak) { GameBreak(params); }
	else if (method == this.ScoreSubmit) { ScoreSubmit(params); }
	else if (method == this.GameEnd) { GameEnd(params); }
	else if (method == this.CustomEvent) { CustomEvent(params); }
	else {}	
}

/*---- CALLS TO GAME ----*/

popCapGame.prototype.SessionStart = function()
{
	this.sendNotification('SessionStart','');
}

popCapGame.prototype.GameStart = function()
{
	this.sendNotification('GameStart','');
}

popCapGame.prototype.GameMenu = function()
{
	this.sendNotification('GameMenu','');
}

popCapGame.prototype.GameContinue = function()
{
	this.sendNotification('GameContinue','');
}

popCapGame.prototype.CustomReturn = function(params)
{
	this.sendNotification('CustomReturn',params);
}

popCapGame.prototype.Mute = function(isMute)
{
	this.sendNotification(isMute ? 'MuteOn' : 'MuteOff','');
}

popCapGame.prototype.Pause = function(isPause)
{
	this.sendNotification(isPause ? 'PauseOn' : 'PauseOff','');
}

/*---- EVENT HANDLING ----*/

popCapGame.prototype.OnLoadBroadcast = function(params)
{
}

popCapGame.prototype.OnSessionReady = function(params)
{

	theAdSpot.isOwnerLoaded = true;	
	if (!this.hide) this.SessionStart();

}

popCapGame.prototype.OnGameReady = function(params)
{
	this.GameStart();
}

popCapGame.prototype.OnScoreBroadcast = function(params)
{    
}

popCapGame.prototype.OnGameBreak = function(params)
{

	if (params == 'adCompleted')
		this.GameContinue();
	else
		theAdSpot.display('GameBreak');

}

popCapGame.prototype.OnScoreSubmit = function(params)
{
}

popCapGame.prototype.OnGameEnd = function(params)
{

	if (params == 'adCompleted')
		this.GameMenu();
	else
		theAdSpot.display('GameEnd');

}

popCapGame.prototype.OnCustomEvent = function(params)
{
    if (Enable_Upsell) window.open(this.upsellUrl);
    this.CustomReturn(params);
}

/******************************************************************************
*     FLASH : POPCAPGAME
*******************************************************************************/

popCapFlashGame.prototype = popCapGame.prototype;
popCapFlashGame.prototype.constructor = popCapFlashGame;
popCapFlashGame.prototype.baseClass = popCapGame.prototype.constructor;

function popCapFlashGame(gameName, id, gameWidth, gameHeight, gameSwf)
{
    popCapGame(gameName, id, gameWidth, gameHeight);
    
    popCapFlashGame.prototype.gameSwf = gameSwf;
}

popCapFlashGame.prototype.applyBasePath = function()
{	
	this.basePath = this.pathConcat(this.basePath, '');
	this.gameSwf = this.pathConcat(this.basePath, this.gameSwf);
}

popCapFlashGame.prototype.write = function()
{

	this.applyBasePath();

    this.objectSetup = '<!--[if !IE]><!-->\r\n';
    this.objectSetup += '<div id="' + this.containerId + '"';
    if (this.hide) this.objectSetup += ' style="visibility: hidden;"';
	this.objectSetup += '>\r\n';
    this.objectSetup += '<embed name="'+this.id+'" id="'+this.id+'" src="'+this.gameSwf+'" ';
    this.objectSetup += 'width="'+this.width+'" ';
    this.objectSetup += 'height="'+this.height+'" ';
    if (this.basePath != '') this.objectSetup += 'base="'+this.basePath+'" ';
    this.objectSetup += 'play="true" ';
    this.objectSetup += 'loop="false" ';
    this.objectSetup += 'menu="false" ';
    this.objectSetup += 'quality="high" ';
    this.objectSetup += 'bgcolor="#000000" ';
    this.objectSetup += 'swLiveConnect="true" ';
    this.objectSetup += 'FlashVars="'+this.getParams()+'" ';
    this.objectSetup += 'pluginspage="https://web.archive.org/web/20091026180645/http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></embed>\r\n';
    this.objectSetup += '</div>\r\n';
    this.objectSetup += '<!--<![endif]-->\r\n';
    this.objectSetup += '<!--[if IE]>\r\n';
    this.objectSetup += '<div id="' + this.containerId + '"';
    if (this.hide) this.objectSetup += ' style="visibility: hidden;"';
	this.objectSetup += '>\r\n';
    this.objectSetup += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
    this.objectSetup += 'codebase="https://web.archive.org/web/20091026180645/http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ';
    this.objectSetup += 'id="'+this.id+'" ';
    this.objectSetup += 'width="'+this.width+'" ';
    this.objectSetup += 'height="'+this.height+'">\r\n';
    this.objectSetup += '<param name="movie" value="'+this.gameSwf+'">\r\n';
    if (this.basePath != '') this.objectSetup += '<param name="base" value="'+this.basePath+'">\r\n';
    this.objectSetup += '<param name="loop" value="false">\r\n';
    this.objectSetup += '<param name="menu" value="false">\r\n';
    this.objectSetup += '<param name="play" value="true">\r\n';
    this.objectSetup += '<param name="quality" value="high">\r\n';
    this.objectSetup += '<param name="bgcolor" value="#000000">\r\n';
    this.objectSetup += '<param name="FlashVars" value="'+this.getParams()+'">\r\n';
    this.objectSetup += '</object>\r\n';
    this.objectSetup += '</div>\r\n';
    this.objectSetup += '<![endif]-->\r\n';
    

	document.write(this.objectSetup);
	this.gameObject = document.getElementById(this.id);
}

popCapFlashGame.prototype.getParams = function()
{    
    var tags = '';

	if (this.paramNames.length > 0)
	{
		for(var i = 0; i < this.paramNames.length-1; i++)
			tags += this.paramNames[i]+'='+this.params[i]+'&';

		tags += this.paramNames[this.paramNames.length-1]+'='+this.params[this.paramNames.length-1];
	}

    return tags;
}

// -- Registered methods in PvZ to ensure that JS is loaded.
var mSWFReady = false;

isProxyReady = function()
{
	return true;
}

setSWFIsReady = function() 
{
	mSWFReady = true;
}
// --

popCapFlashGame.prototype.SessionStart = function()
{
	this.gameObject.onSessionStart();
}

popCapFlashGame.prototype.GameStart = function()
{
	this.gameObject.onGameStart();
}

popCapFlashGame.prototype.GameContinue = function(params)
{		
	this.gameObject.onGameContinue();
}

popCapFlashGame.prototype.GameMenu = function()
{
	this.gameObject.onGameMenu();
}

popCapFlashGame.prototype.CustomReturn = function(params)
{
	var args = '';
	if (typeof(params) != 'undefined')
		args = params.toString();
		
	this.gameObject.onCustomReturn(args);
}

popCapFlashGame.prototype.Mute = function(isMute)
{
	this.gameObject.onGameMute(isMute ? 'on' : 'off'); 
}

popCapFlashGame.prototype.Pause = function(isPause)
{
	this.gameObject.onGamePause(isPause ? 'on' : 'off');
}

/******************************************************************************
*     MSN API FUNCTIONS (Registered in ActionScript 3 Games)
*******************************************************************************/

LoadBroadcast = function(params)
{
	thePopCapGame.OnLoadBroadcast(params);
}

SessionReady = function(params)
{
	thePopCapGame.OnSessionReady(params);
}

GameReady = function(params)
{
	thePopCapGame.OnGameReady(params);
}

ScoreBroadcast = function(params)
{
	thePopCapGame.OnScoreBroadcast(params);
}

GameBreak = function(params)
{
	thePopCapGame.OnGameBreak(params);
}

ScoreSubmit = function(params)
{
	thePopCapGame.OnScoreSubmit(params);
}

GameEnd = function(params)
{
	thePopCapGame.OnGameEnd(params);
}

CustomEvent = function(params)
{
	thePopCapGame.OnCustomEvent(params);
}

/******************************************************************************
*     AD SUPPORT
*******************************************************************************/

var theAdSpot = null;

function adSpot(id, theGame)
{
    adSpot.prototype.id = id;
    adSpot.prototype.owner = theGame;
	
    adSpot.prototype.width = 0;
    adSpot.prototype.height = 0;	
    adSpot.prototype.countdown = 0;
    adSpot.prototype.lastShown = 0;
    adSpot.prototype.duration = 5;
	adSpot.prototype.adObject = null;
	adSpot.prototype.ownerContainer = null;
    adSpot.prototype.globalTimer = null;
	adSpot.prototype.prerollSrc = 'preroll.html';	
	adSpot.prototype.ownerBgcolor = 'white';
    adSpot.prototype.showPreroll = false;
	adSpot.prototype.showMidroll = false;
	adSpot.prototype.showPostroll = false;

	adSpot.prototype.breakEvent = '';
	adSpot.prototype.isOwnerLoaded = false;
    adSpot.prototype.wait = 60;
	adSpot.prototype.midrollSrc = 'midroll.html';
	adSpot.prototype.postrollSrc = 'postroll.html';

    adSpot.prototype.isInIE = (document.all != null);
}

adSpot.prototype.write = function()
{
	this.setDimensions();

	document.write('<style type="text/css">');
	document.write('#'+this.id+' { ');
	document.write('position: absolute; ');
	document.write('top: 15px; ');
	document.write('left: 10px; ');
	document.write('z-index: 1; ');
	document.write('visibility: hidden; ');
	document.write('display: none; ');
	document.write('width: '+this.width+'; ');
	document.write('height: '+this.height+'; ');
	document.write('}</style>\r\n');
	document.write('<div id='+this.id+'>\r\n');
	
	document.write('<iframe id="spot" name="spot" ');
	document.write('width="'+this.width+'" ');
	document.write('height="'+this.height+'" ');
	document.write('src="'+this.prerollSrc+'" ');
	document.write('scrolling="no" ');
	document.write('allowtransparency="true" ');
	document.write('frameborder="0" border="0" ');
	document.write('marginheight="0" marginwidth="0" ');
	document.write('oncontextmenu="return false"></iframe>\r\n');
	
	document.write('</div>\r\n');
	this.adObject = document.getElementById(this.id);

}

adSpot.prototype.setDimensions = function()
{	
	var isTaller = (this.height != null && this.height > this.owner.height);
	var isWider = (this.width != null && this.width > this.owner.width);
	
	this.ownerContainer = document.getElementById(this.owner.containerId);
	
	if (!isTaller) this.height = this.owner.height;
	if (!isWider) this.width = this.owner.width;
	
	if (!isTaller && !isWider) return;
	
	if (this.ownerContainer)
	{
		var padWidth = this.width/2 - this.owner.width/2;
		var padHeight = this.height/2 - this.owner.height/2;		
		if (this.isInIE)
		{
			this.ownerContainer.style.width = this.width;
			this.ownerContainer.style.height = this.height;
		}
		else
		{
			this.ownerContainer.style.width = this.width - padWidth;
			this.ownerContainer.style.height = this.height - padHeight;
		}
		this.ownerContainer.style.backgroundColor = this.ownerBgcolor;
		this.ownerContainer.style.paddingLeft = padWidth;
		this.ownerContainer.style.paddingTop = padHeight;
	}
}

adSpot.prototype.timer = function()
{
    if (this.countdown > 0) {
        this.countdown--;
        //**** DISPLAY COUNTDOWN ***
        var countdown_display = frames['spot'].document.getElementById('countdown_number');
        if (countdown_display) {
            countdown_display.firstChild.nodeValue = this.countdown;
        }
    }

    if (this.countdown == 0) this.endDisplay();
    else this.globalTimer = setTimeout('theAdSpot.timer()',1000);
}

adSpot.prototype.resumeGame = function()
{
	if (this.breakEvent == 'GameBreak')
		this.owner.OnGameBreak('adCompleted');
	else
		this.owner.OnGameEnd('adCompleted');
}

adSpot.prototype.display = function(event)
{
	this.breakEvent = event;
	
	if ((this.breakEvent == 'GameBreak' && this.showMidroll) ||
		(this.breakEvent == 'GameEnd' && this.showPostroll))
	{
		var currentDate = new Date();
		var currentTime = currentDate.getTime();
		var interval = currentTime - this.lastShown;

		if (interval > this.wait*1000)
		{
			if (this.breakEvent == 'GameEnd')
				frames['spot'].location.href = this.postrollSrc;
			else
				frames['spot'].location.href = this.midrollSrc;
			
			// Hide the Game
			this.ownerContainer.style.visibility = 'hidden';
			//this.ownerContainer.style.display = 'none';
			
			// Show the Ad
			this.adObject.style.visibility = 'visible';
			this.adObject.style.display = 'block';
			
			if (this.duration > 0)
			{
				this.countdown = this.duration+1;
				this.timer();
			}
			this.lastShown = currentTime;
			return;
		}
	}
	this.resumeGame();
}

adSpot.prototype.endDisplay = function()
{
	this.countdown = -1;

    frames['spot'].location.href = 'about:blank';
	
	//alert('game is about to appear');
		
	// Hide the Ad
    this.adObject.style.visibility = 'hidden';
    this.adObject.style.display = 'none';

	// Show the Game 
	this.ownerContainer.style.visibility = 'visible';
	// The display toggle causes game to reload in FF
	//this.ownerContainer.style.display = 'block';
	
	if (this.showPreroll)
	{
		//alert('you saw a preroll');
		this.ownerContainer.style.visibility = 'visible';
		
		this.showPreroll = false;
		this.owner.hide = false;
		
		if (this.isOwnerLoaded)
			//alert('see me?');
			setTimeout('theAdSpot.owner.OnSessionReady("adCompleted")', 100);
	}
	else this.resumeGame();

    clearTimeout(this.globalTimer);
}

adSpot.prototype.canRunAsPreroll = function()
{

	return this.showPreroll;

}

adSpot.prototype.runAsPreroll = function()
{
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
	
	// Ad Appears
	//alert('Preroll Ad Begins');
	this.adObject.style.visibility = 'visible';
    this.adObject.style.display = 'block';

    if (this.duration > 0)
    {
        this.countdown = this.duration+1;
        this.timer();
    }
    this.lastShown = currentTime;
}

/******************************************************************************
*     INSTANTIATE GAME
*******************************************************************************/

thePopCapGame = new popCapFlashGame("Plants Vs. Zombies",
	'GameObject',
	'540',
	'405',
	'pvz_9_15.swf');

/******************************************************************************
*     PARTNER-SPECIFIC SETTINGS
*******************************************************************************/

thePopCapGame.partnerName = 'PopCap';

// Instantiate ad and customize settings

theAdSpot = new adSpot('adlayer', thePopCapGame);

theAdSpot.width = Ad_Width;
theAdSpot.height = Ad_Height;
theAdSpot.ownerBgcolor = Game_BgColor;
theAdSpot.duration = Ad_Duration;
theAdSpot.showPreroll = Run_Preroll;
theAdSpot.showMidroll = Run_Midroll;
theAdSpot.showPostroll = Run_Postroll;
thePopCapGame.hide = Run_Preroll;

theAdSpot.wait = Min_Time_Between_Ads;
theAdSpot.prerollSrc = Preroll_Src_Path;
theAdSpot.midrollSrc = Midroll_Src_Path;
theAdSpot.postrollSrc = Postroll_Src_Path;

thePopCapGame.basePath = Base_Path;
thePopCapGame.upsellUrl = Upsell_Url;


}
/*
     FILE ARCHIVED ON 18:06:45 Oct 26, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:42:57 Dec 18, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 984.018
  exclusion.robots: 785.342
  exclusion.robots.policy: 785.332
  xauthn.identify: 695.704
  xauthn.chkprivs: 89.352
  RedisCDXSource: 0.823
  esindex: 0.011
  LoadShardBlock: 177.368 (3)
  PetaboxLoader3.datanode: 239.241 (4)
  CDXLines.iter: 18.227 (3)
  load_resource: 90.309
  PetaboxLoader3.resolve: 22.034
*/
