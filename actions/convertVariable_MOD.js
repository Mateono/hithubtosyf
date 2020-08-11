module.exports = {

	name: "Convert a Variable",

	section: "Other Stuff",

	author: "EliteArtz",

	version: "1.8.9",

	short_description: "This allows you to convert a Variable e.g. into a String or Number(Int)",
	long_description: "INFO (What it does):\nBasically, it Converts your input or Variable into a Number or String.\nString is normally those with \"\"/''/ `` \nNumbers are as expected Numbers but without those \"\" things.\nThese Numbers will be saved if the input was a word as \"NaN\" (Not available Now) because the Input weren't a Number (Convert: To Number).\nStrings are mostly saved as \"Hello\". Strings aren't affected by anything so the input will be the same as before, but if it were a Number before, it Convert's into a String. Useful to Convert a saved json from webapi which it was a number before.\nMore Information  for Strings in  Javascript(Programming language.): ( https://www.w3schools.com/jsref/jsref_obj_string.asp ),\nMore Information for Numbers(Int) in Javascript(Programming lanquage.): ( https://www.w3schools.com/js/js_numbers.asp )",

	subtitle: function(data) {
		const info = ['To Number(Int)', 'To String'];
		const prse = parseInt(data.into);
		return `Convert: ${info[prse]}`;
	},

	variableStorage: function(data, varType) {
		const type = parseInt(data.storage);
		const prse2 = parseInt(data.into);
		const info2 = ['Number', 'String'];
		if(type !== varType) return;
		return ([data.varName2, info2[prse2]]);
	},

	fields: ["into", "vAria", "storage", "varName2"],

	html: function(isEvent, data) {
		return `
	<div style="width: 550px; height: 350px;">
		<div>
			<div class="embed" style="width:98%;">
				<embedleftline></embedleftline><div class="embedinfo">
					<span class="embed-auth"><u>Mod Info</u><br>Made by ${this.author}</span><br>
					<span class="embed-desc">${this.short_description}<br>Added in: ${this.version}</span>
				</div>
			</div>
		</div>
		<div style="width: 35%;">
			<div class="col-3 input-effect" style="width: 150%;">
        		<input id="vAria" class="effect-17" type="text" style="width: 100%;">
            	<label>Insert Variable here</label>
            	<span class="focus-border"></span>
			</div>
			Convert:<br>
        	<select id="into" class="round">
            	<optgroup label="Basic's">
                	<option value="0" selected>To Number(Int)</option>
                	<option value="1">To String</option>
            	</optgroup>
			</select>
		</div><br>
		<div>
			<div style="float: left; width: 35%;">
				Store In:<br>
				<select id="storage" class="round">
					${data.variables[1]}
				</select>
			</div>
			<div id="varNameContainer2" style="float: right; width: 60%;">
				<div class="col-3 input-effect" style="width: 100%;">
        			<input id="varName2" class="effect-17" type="text" style="width: 100%;">
            		<label>Variable Name:</label>
            		<span class="focus-border"></span>
        		</div><br>
			</div>
		</div>
	</div>
	<style>
		.codeblock {
			margin: 4px; background-color: rgba(0,0,0,0.20); border-radius: 3.5px; border: 1px solid rgba(255,255,255,0.15); padding: 4px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; transition: border 175ms ease;
		}
		.codeblock:hover{border:1px solid rgba(255,255,255,.45)}.text{color:#0ff}

		select.round{width:100%;border:0 solid #eee !important;border-radius:4px !important;box-sizing:border-box !important;display:block !important;height:28px !important;padding-left:8px !important;box-shadow:-2px 0 0 #fff;transition:box-shadow 150ms ease}
    	select.round:focus{outline-width:0;box-shadow:0 1px 0 #0059ff;}

		.col-3 {float: left; margin-top: 18px; margin-bottom: 5px; position: relative; background: rgba(0, 0, 0, 0.25); border-radius: 5px; border: 0px solid #eee;}

		input[type="text"]{font: 15px/24px 'Muli', sans-serif; color: #eee; width: 100%; box-sizing: border-box; letter-spacing: 1px; padding: 0 0 0 3px;}
    	input[type="text"]{font: 15px/24px "Lato", Arial, sans-serif; color: #eee; width: 100%; box-sizing: border-box; letter-spacing: 1px; padding: 0 0 0 3px;}
	
    	.effect-17{border: 0; padding: 4px; border-bottom: 1px solid #ccc; background-color: transparent;}
		.effect-17 ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
    	.effect-17:focus ~ .focus-border,
    	.has-content.effect-17 ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}
    	.effect-17 ~ label{position: absolute; left: 0%; width: 100%; top: -16px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
		.effect-17:focus ~ label, .has-content.effect-17 ~ label{font-size: 12px; color: #4caf50; transition: 0.3s;}

		/* My Embed CSS code */
		.embed {
			position: relative;
		}
		.embedinfo {
			background: rgba(46,48,54,.45) fixed;
			border: 1px solid hsla(0,0%,80%,.3);
			padding: 10px;
			margin:0 4px 0 7px;
			border-radius: 0 3px 3px 0;
		}
		embedleftline {
			background-color: #eee;
			width: 4px;
			border-radius: 3px 0 0 3px;
			border: 0;
			height: 100%;
			margin-left: 4px;
			position: absolute;
		}
		span {
			font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
		}
		span.embed-auth {
			color: rgb(255, 255, 255);
		
		}
		span.embed-desc {
			color: rgb(128, 128, 128);
		}
	</style>`
	},

	init: function() {},

	action: function(cache) {
		const data = cache.actions[cache.index],
			theVar = this.evalMessage(data.vAria, cache),
			INTO = parseInt(data.into);
		let result;

		switch (INTO) {
			case 0:
				result = parseInt(theVar);
				break;
			case 1:
				result = theVar.toString();
				break;
		}
		if(result !== undefined) {
			const storage = parseInt(data.storage);
			const varName2 = this.evalMessage(data.varName2, cache);
			this.storeValue(result, storage, varName2, cache);
		}
		this.callNextAction(cache);
	},

	mod: function(DBM) {
	}

};