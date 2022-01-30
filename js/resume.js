var cmd_list = [];
var cmd_index = 0;
var available_cmd = [
	"about",
	"education",
	"projects",
	"experience",
	"skills",
	"contact",
	"download",
	"help",
	"clear",
	"ls",
	"theme",
	"publications",
];

var available_themes = {
	"dark": {
		"background_color": "black",
		"color": "#CCC5B9",
		"type": 0
	},
	"monokoi": {
		"background_color": "#272822",
		"color": "#FF007F",
		"type": 0
	},
	"sublime": {
		"background_color": "#272822",
		"color": "#FF007F",
		"type": 0

	},
	"light": {
		"background_color": "#FFFFFF",
		"color": "black",
		"type": 1
	},
	"light-dark": {
		"background_color": "#131417",
		"color": "#3E7EFF",
		"type": 0
	},
	"default": {
		"background_color": "#131417",
		"color": "#3E7EFF",
		"type": 0
	}
};
var cmd = document.getElementById("command");

cmd.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		run_command();
	} else if (event.keyCode === 38) {
		event.preventDefault();
		cycle_command("up");
	} else if (event.keyCode === 40) {
		event.preventDefault();
		cycle_command("down");
	} else if ((event.keyCode === 32 && event.ctrlKey)) {
		event.preventDefault();
		tab_completion();
	}
});

$("#command").keydown(function (e) {
	if (e.which === 9) {
		event.preventDefault();
		tab_completion();
	}
});

function run_command() {
	var cmd = document.getElementById("command");
	var input = cmd.value.toLowerCase();
	var output;

	if (input.length) {
		console.log(input.substring(0, 5), input.split(" ").join(" "))

		if (input.split(" ").join(" ").substring(0, 5) === 'theme') {
			var keys_themes = [];
			for (var k in available_themes) keys_themes.push(k);

			var theme = input.split(" ");
			console.log(keys_themes, theme, theme[1])

			if (theme.length == 2 && keys_themes.indexOf(theme[1]) >= 0) {
				$("body, #command-line, #command").attr(
					"style",
					"background-color: " + available_themes[theme[1]].background_color
				);
				$("body").css("color", available_themes[theme[1]].color);
				$(".ascii").attr("style", `color: ${available_themes[theme[1]].color} !important;`)
				if (available_themes[theme[1]].type == 0) {
					// $("#command").attr("style", `color: white !important;`)
					$("#error pre").attr("style", `color: white !important;`)
					$("#help tr").css("color", "black");

				} else {
					// $("#command").attr("style", `color: black !important;`)
					$("#error pre").attr("style", `color: black !important;`)
					// $("#command:focus").attr("style", `color: black !important;`)

				}
				// clear_console();
				var cmd_output = document.createElement("div");
				var container = document.createElement("div");

				cmd_output.appendChild(container);
				container.innerHTML = `<span style = "color:green">➜</span>
          <span style = "color:cyan">[jai@root]</span> ` + input;
				// cmd_output.appendChild(output);
				cmd_list.push(input);
				var element = document.getElementById("executed_commands");
				element.appendChild(cmd_output);
				$("#command").val("");
				return false;
			} else {
				var container = document.createElement("div");
				container.innerHTML = `<span style = "color:green">➜</span>
        <span style = "color:cyan">[jai@root]</span>` +
					`<br> <br> Available Themes: <br> <div style="color: #7F0055">${keys_themes}</div>` + "<br>";
				document.getElementById("executed_commands").appendChild(container);
				return false;
			}
		}

		var element = document.getElementById(input);
		if (available_cmd.indexOf(input) < 0)
			element = document.getElementById('error');

		if (input == 'download') {
			window.open('resources/resume.pdf', '_blank');
		} else if (input == 'clear') {
			clear_console();
			return;
		}

		output = element.cloneNode(true);
		output.style = "display:block";
	}

	var cmd_output = document.createElement("div");
	var container = document.createElement("div");

	cmd_output.appendChild(container);
	container.innerHTML = `<span style = "color:green">➜</span>
    <span style = "color:cyan">[jai@root]</span> ` + input;
	cmd_output.appendChild(output);
	cmd_list.push(input);

	var element = document.getElementById("executed_commands");
	element.appendChild(cmd_output);

	cmd.value = "";
	cmd_index = cmd_list.length - 1;

	var scrollingElement = (document.scrollingElement || document.body);
	scrollingElement.scrollTop = scrollingElement.scrollHeight;
}

function cycle_command(direction) {
	if (direction === "up") {
		if (cmd_index > 0)
			cmd_index -= 1;
	} else if (direction === "down") {
		if (cmd_index < cmd_list.length - 1)
			cmd_index += 1;
	}
	var cmd = document.getElementById("command");
	cmd.value = cmd_list[cmd_index];
}

function tab_completion() {
	var cmd = document.getElementById("command");
	var input = cmd.value;

	for (index = 0; index < available_cmd.length; index++) {
		if (available_cmd[index].startsWith(input)) {
			cmd.value = available_cmd[index];
			break;
		}
	}
}

function clear_console() {
	document.getElementById("executed_commands").innerHTML = "";
	document.getElementById("command").value = "";
}

function showTime() {
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var session = "AM";

	if (h == 0) {
		h = 12;
	}

	if (h > 12) {
		h = h - 12;
		session = "PM";
	}

	h = (h < 10) ? "0" + h : h;
	m = (m < 10) ? "0" + m : m;
	s = (s < 10) ? "0" + s : s;
	var today = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];
	var date = monthNames[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();

	var time = date + "::" + h + ":" + m + ":" + s + " " + session;
	document.getElementById("MyClockDisplay").innerText = time;
	document.getElementById("MyClockDisplay").textContent = time;

	setTimeout(showTime, 1000);
}

showTime();



function getAge() {
	var dateString = "01/10/1997"
	var now = new Date();
	var today = new Date(now.getYear(), now.getMonth(), now.getDate());

	var yearNow = now.getYear();
	var monthNow = now.getMonth();
	var dateNow = now.getDate();

	var dob = new Date(dateString.substring(6, 10),
		dateString.substring(0, 2) - 1,
		dateString.substring(3, 5)
	);

	var yearDob = dob.getYear();
	var monthDob = dob.getMonth();
	var dateDob = dob.getDate();
	var age = {};
	var ageString = "";
	var yearString = "";
	var monthString = "";
	var dayString = "";


	yearAge = yearNow - yearDob;

	if (monthNow >= monthDob)
		var monthAge = monthNow - monthDob;
	else {
		yearAge--;
		var monthAge = 12 + monthNow - monthDob;
	}

	if (dateNow >= dateDob)
		var dateAge = dateNow - dateDob;
	else {
		monthAge--;
		var dateAge = 31 + dateNow - dateDob;

		if (monthAge < 0) {
			monthAge = 11;
			yearAge--;
		}
	}
	age = {
		years: yearAge,
		months: monthAge,
		days: dateAge
	};

	if (age.years > 1) yearString = " years";
	else yearString = " year";
	if (age.months > 1) monthString = " months";
	else monthString = " month";
	if (age.days > 1) dayString = " days";
	else dayString = " day";


	if ((age.years > 0) && (age.months > 0) && (age.days > 0))
		ageString = age.years + yearString + ", " + age.months + monthString + ",  " + age.days + dayString;
	else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
		ageString = "Only " + age.days + dayString + " old!";
	else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
		ageString = age.years + yearString + " old. Happy Birthday!!";
	else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
		ageString = age.years + yearString + "  " + age.months + monthString;
	else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
		ageString = age.months + monthString + "  " + age.days + dayString;
	else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
		ageString = age.years + yearString + "  " + age.days + dayString;
	else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
		ageString = age.months + monthString;
	else ageString = "Oops! Could not calculate age!";

	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	ageString += `, ${h} hours, ${m} minutes, and ${s} seconds.`
	document.getElementById("count-up").textContent = ageString;

	setTimeout(getAge, 1000);
}
getAge();

$("html").click(function () {
	$("#command").focus();

})