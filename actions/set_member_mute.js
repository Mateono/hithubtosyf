module.exports = {
	
	name: "Set Member Mute",
	
	section: "Member Control",
	
	subtitle: function(data) {
		const channels = ['Mentioned User', 'Command Author', 'Temp Variable', 'Server Variable', 'Global Variable'];
		return `${channels[parseInt(data.member)]} - ${data.mute === "0" ? 'Mute' : 'Unmute'}`;
	},
	
	fields: ["member", "varName", "mute"],
	
	html: function(isEvent, data) {
		return `
	<div>
		<div style="float: left; width: 35%;">
			Source Member:<br>
			<select id="member" class="round" onchange="glob.memberChange(this, 'varNameContainer')">
				${data.members[isEvent ? 1 : 0]}
			</select>
		</div>
		<div id="varNameContainer" style="display: none; float: right; width: 60%;">
			Variable Name:<br>
			<input id="varName" class="round" type="text" list="variableList"><br>
		</div>
	</div><br><br><br>
	<div style="padding-top: 8px;">
		Mute Status:<br>
		<select id="mute" class="round" style="width: 50%;">
			<option value="0" selected>Mute</option>
			<option value="1">Unmute</option>
		</select>
	</div>`
	},
	
	init: function() {
		const {glob, document} = this;
	
		glob.memberChange(document.getElementById('member'), 'varNameContainer')
	},
	
	action: function(cache) {
		const data = cache.actions[cache.index];
		const type = parseInt(data.member);
		const varName = this.evalMessage(data.varName, cache);
		const member = this.getMember(type, varName, cache);
		if(Array.isArray(member)) {
			this.callListFunc(member.voice, 'setMute', [data.mute === "0"]).then(function() {
				this.callNextAction(cache);
			}.bind(this));
		} else if(member.voice && member.voice.setMute) {
			member.voice.setMute(data.mute === "0").then(function() {
				this.callNextAction(cache);
			}.bind(this)).catch(this.displayError.bind(this, data, cache));
		} else {
			this.callNextAction(cache);
		}
	},
	
	mod: function(DBM) {
	}
	
};