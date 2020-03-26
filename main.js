(function() {
	window.addEventListener("scroll", function() {
		let scrollTop = document.querySelector("html").scrollTop;
		const nav = document.querySelector("nav");
		const menuIcon = document.querySelectorAll(".menuIcon");
		const levitateGoTop = document.querySelector(".levitateGoTop");
		let timerLevitateGoTop = null;

		if (scrollTop >= 136) {
			nav.style.position = "fixed";
			for (let i = 0; i < menuIcon.length; i++) {
				menuIcon[i].style.top = "-5%";
			}
		} else {
			nav.style.position = "static";
			for (let i = 0; i < menuIcon.length; i++) {
				menuIcon[i].style.top = "-30%";
			}
		}
		if (scrollTop >= 500) {
			levitateGoTop.style.display = "block";
		} else {
			levitateGoTop.style.display = "none";
		}

		levitateGoTop.onclick = function() {
			clearInterval(timerLevitateGoTop);
			timerLevitateGoTop = setInterval(function() {
				document.querySelector("html").scrollTop -= 300;
				if (document.querySelector("html").scrollTop <= 0) {
					clearInterval(timerLevitateGoTop);
				}
			}, 30);
		};
	});

	// 【header】
	// cart
	const cart = document.querySelector("header .cart i");
	const cartInfo = document.querySelector("header .cartInfo");

	cart.addEventListener("click", function() {
		if (cartInfo.style.display == "none") {
			cartInfo.style.display = "block";
		} else {
			cartInfo.style.display = "none";
		}
	});

	// 【nav】
	// search
	const menuSearch = document.querySelector("nav #menuSearch");
	const menuSubmit = document.querySelector("nav form button");
	menuSubmit.onclick = function() {
		window.open(
			"http://www.google.com/search?q=" + menuSearch.value,
			(target = "_blank")
		);
	};

	// 【banner】
	const bannerImgWrap = document.querySelector(".bannerImgWrap");
	const bannerImgs = document.getElementsByClassName("bannerImg");
	const bannerTitles = document.querySelector(".bannerTitles");
	const bannerTitlesItem = document.getElementsByClassName("bannerTitlesItem");
	const bannerThumbnailIcons = document.querySelectorAll(
		".bannerThumbnailIcon"
	);
	const bannerProgressBar = document.querySelector(".bannerProgressBar");
	let bannerIndex = 0;
	let timerOpacityMove = false;
	let timerBarMove = false;
	let timerTxtMove = false;
	let barWidth = 0;
	let bannerOpacity = 10;
	let bannerTxt = 0;

	bannerTitlesItem[0].style.display = "block";
	bannerThumbnailIcons[0].style.backgroundColor = "white";

	function barMove() {
		if (barWidth < 100) {
			barWidth += 1;
			bannerProgressBar.style.width = barWidth + "%";
		} else {
			barWidth = 0;
			bannerProgressBar.setAttribute("style", "");
			bannerTitlesItem[0].setAttribute("style", "");
			bannerTitles.appendChild(bannerTitlesItem[0]);
			bannerIndexChk();
			clearInterval(timerBarMove);
			timerOpacityMove = setInterval(opacityMove, 100);
		}
	}

	function opacityMove() {
		if (bannerOpacity > 0) {
			bannerOpacity -= 1;
			bannerImgs[2].style.opacity = bannerOpacity / 10;
		} else {
			bannerOpacity = 10;
			bannerImgs[2].setAttribute("style", "");
			bannerImgWrap.insertBefore(bannerImgs[2], bannerImgs[0]);
			clearInterval(timerOpacityMove);
			timerTxtMove = setInterval(txtMove, 100);
		}
	}

	function txtMove() {
		if (bannerTxt < 10) {
			bannerTitlesItem[0].style.display = "block";
			bannerTxt += 1;
			bannerTitlesItem[0].style.transform = `scaleY(${bannerTxt / 10})`;
		} else {
			bannerTxt = 0;
			clearInterval(timerTxtMove);
			timerBarMove = setInterval(barMove, 100);
		}
	}
	timerBarMove = setInterval(barMove, 100);

	// 【banner】
	// button
	const bannerNext = document.querySelector(".bannerNext");
	const bannerPrev = document.querySelector(".bannerPrev");

	function bannerInitialize() {
		clearInterval(timerBarMove);
		clearInterval(timerOpacityMove);
		clearInterval(timerTxtMove);
		barWidth = 0;
		bannerOpacity = 10;
		bannerTxt = 0;
		bannerImgs[2].setAttribute("style", "");
		bannerTitlesItem[0].setAttribute("style", "");
		bannerProgressBar.setAttribute("style", "");
	}

	function bannerIndexChk(type) {
		bannerThumbnailIcons[bannerIndex].setAttribute("style", "");
		if (type == "prev") {
			bannerIndex--;
			if (bannerIndex < 0) bannerIndex = 2;
		} else {
			bannerIndex++;
			if (bannerIndex > 2) bannerIndex = 0;
		}
		bannerThumbnailIcons[bannerIndex].style.backgroundColor = "white";
	}

	function prev() {
		bannerInitialize();
		bannerIndexChk("prev");
		bannerImgWrap.append(bannerImgs[0]);
		bannerTitles.insertBefore(bannerTitlesItem[2], bannerTitlesItem[0]);
		timerTxtMove = setInterval(txtMove, 100);
	}

	function next() {
		bannerInitialize();
		bannerIndexChk("next");
		bannerImgWrap.insertBefore(bannerImgs[2], bannerImgs[0]);
		bannerTitles.appendChild(bannerTitlesItem[0]);
		timerTxtMove = setInterval(txtMove, 100);
	}

	bannerPrev.addEventListener("click", function() {
		bannerInitialize();
		prev();
	});

	bannerNext.addEventListener("click", function() {
		bannerInitialize();
		next();
	});

	// 【banner】
	// Thumbnail
	const bannerThumbnail = document.querySelectorAll(".bannerThumbnails div");

	for (let i = 0; i < bannerThumbnailIcons.length; i++) {
		bannerThumbnailIcons[i].onmouseover = function() {
			if (i == 0) {
				bannerThumbnail[i].style.transform = "translateX(65px) scaleY(1)";
			} else if (i == 2) {
				bannerThumbnail[i].style.transform = "translateX(-65px) scaleY(1)";
			} else {
				bannerThumbnail[i].style.transform = "scaleY(1)";
			}
		};
		bannerThumbnailIcons[i].onmouseout = function() {
			bannerThumbnail[i].setAttribute("style", "");
		};
		bannerThumbnailIcons[i].onclick = function() {
			while (i < bannerIndex) {
				bannerInitialize();
				prev();
			}

			while (i > bannerIndex) {
				bannerInitialize();
				next();
			}
		};
	}

	//【Mark】
	const county = [
		"臺北市",
		"基隆市",
		"新北市",
		"宜蘭縣",
		"桃園市",
		"新竹市",
		"新竹縣",
		"苗栗縣",
		"臺中市",
		"彰化縣",
		"南投縣",
		"雲林縣",
		"嘉義市",
		"嘉義縣",
		"臺南市",
		"高雄市",
		"澎湖縣",
		"金門縣",
		"屏東縣",
		"臺東縣",
		"花蓮縣",
		"連江縣"
	];
	const area = [
		// 臺北市
		[
			"中正區",
			"大同區",
			"中山區",
			"松山區",
			"大安區",
			"萬華區",
			"信義區",
			"士林區",
			"北投區",
			"內湖區",
			"南港區",
			"文山區"
		],
		// 基隆市
		["仁愛區", "信義區", "中正區", "中山區", "安樂區", "暖暖區", "七堵區"],
		// 新北市
		[
			"萬里區",
			"金山區",
			"板橋區",
			"汐止區",
			"深坑區",
			"石碇區",
			"瑞芳區",
			"平溪區",
			"雙溪區",
			"貢寮區",
			"新店區",
			"坪林區",
			"烏來區",
			"永和區",
			"中和區",
			"土城區",
			"三峽區",
			"樹林區",
			"鶯歌區",
			"三重區",
			"新莊區",
			"泰山區",
			"林口區",
			"蘆洲區",
			"五股區",
			"八里區",
			"淡水區",
			"三芝區",
			"石門區"
		],
		// 宜蘭縣
		[
			"宜蘭市",
			"頭城鎮",
			"礁溪鄉",
			"壯圍鄉",
			"員山鄉",
			"羅東鎮",
			"三星鄉",
			"大同鄉",
			"五結鄉",
			"冬山鄉",
			"蘇澳鎮",
			"南澳鄉",
			"釣魚臺列嶼"
		],
		// 桃園市
		[
			"中壢區",
			"平鎮區",
			"龍潭區",
			"楊梅區",
			"新屋區",
			"觀音區",
			"桃園區",
			"龜山區",
			"八德區",
			"大溪區",
			"復興區",
			"大園區",
			"蘆竹區"
		],
		// 新竹市
		["東區", "北區", "香山區"],
		// 新竹縣
		[
			"竹北市",
			"湖口鄉",
			"新豐鄉",
			"新埔鎮",
			"關西鎮",
			"芎林鄉",
			"寶山鄉",
			"竹東鎮",
			"五峰鄉",
			"橫山鄉",
			"尖石鄉",
			"北埔鄉",
			"峨眉鄉"
		],
		// 苗栗縣
		[
			"竹南鎮",
			"頭份市",
			"三灣鄉",
			"南庄鄉",
			"獅潭鄉",
			"後龍鎮",
			"通霄鎮",
			"苑裡鎮",
			"苗栗市",
			"造橋鄉",
			"頭屋鄉",
			"公館鄉",
			"大湖鄉",
			"泰安鄉",
			"銅鑼鄉",
			"三義鄉",
			"西湖鄉",
			"卓蘭鎮"
		],
		// 臺中市
		[
			"中區",
			"東區",
			"南區",
			"西區",
			"北區",
			"北屯區",
			"西屯區",
			"南屯區",
			"太平區",
			"大里區",
			"霧峰區",
			"烏日區",
			"豐原區",
			"后里區",
			"石岡區",
			"東勢區",
			"和平區",
			"新社區",
			"潭子區",
			"大雅區",
			"神岡區",
			"大肚區",
			"沙鹿區",
			"龍井區",
			"梧棲區",
			"清水區",
			"大甲區",
			"外埔區",
			"大安區"
		],
		// 彰化縣
		[
			"彰化市",
			"芬園鄉",
			"花壇鄉",
			"秀水鄉",
			"鹿港鎮",
			"福興鄉",
			"線西鄉",
			"和美鎮",
			"伸港鄉",
			"員林市",
			"社頭鄉",
			"永靖鄉",
			"埔心鄉",
			"溪湖鎮",
			"大村鄉",
			"埔鹽鄉",
			"田中鎮",
			"北斗鎮",
			"田尾鄉",
			"埤頭鄉",
			"溪州鄉",
			"竹塘鄉",
			"二林鎮",
			"大城鄉",
			"芳苑鄉",
			"二水鄉"
		],
		// 南投縣
		[
			"南投市",
			"中寮鄉",
			"草屯鎮",
			"國姓鄉",
			"埔里鎮",
			"仁愛鄉",
			"名間鄉",
			"集集鎮",
			"水里鄉",
			"魚池鄉",
			"信義鄉",
			"竹山鎮",
			"鹿谷鄉"
		],
		// 雲林縣
		[
			"斗南鎮",
			"大埤鄉",
			"虎尾鎮",
			"土庫鎮",
			"褒忠鄉",
			"東勢鄉",
			"臺西鄉",
			"崙背鄉",
			"麥寮鄉",
			"斗六市",
			"林內鄉",
			"古坑鄉",
			"莿桐鄉",
			"西螺鎮",
			"二崙鄉",
			"北港鎮",
			"水林鄉",
			"口湖鄉",
			"四湖鄉",
			"元長鄉"
		],
		// 嘉義市
		["東區", "西區"],
		// 嘉義縣
		[
			"番路鄉",
			"梅山鄉",
			"竹崎鄉",
			"阿里山",
			"中埔鄉",
			"大埔鄉",
			"水上鄉",
			"鹿草鄉",
			"太保市",
			"朴子市",
			"東石鄉",
			"六腳鄉",
			"新港鄉",
			"民雄鄉",
			"大林鎮",
			"溪口鄉",
			"義竹鄉",
			"布袋鎮"
		],

		// 臺南市
		[
			"中西區",
			"東區",
			"南區",
			"北區",
			"安平區",
			"安南區",
			"永康區",
			"歸仁區",
			"新化區",
			"左鎮區",
			"玉井區",
			"楠西區",
			"南化區",
			"仁德區",
			"關廟區",
			"龍崎區",
			"官田區",
			"麻豆區",
			"佳里區",
			"西港區",
			"七股區",
			"將軍區",
			"學甲區",
			"北門區",
			"新營區",
			"後壁區",
			"白河區",
			"東山區",
			"六甲區",
			"下營區",
			"柳營區",
			"鹽水區",
			"善化區",
			"大內區",
			"山上區",
			"新市區",
			"安定區"
		],
		// 高雄市
		[
			"新興區",
			"前金區",
			"苓雅區",
			"鹽埕區",
			"鼓山區",
			"旗津區",
			"前鎮區",
			"三民區",
			"楠梓區",
			"小港區",
			"左營區",
			"仁武區",
			"大社區",
			"東沙群島",
			"南沙群島",
			"岡山區",
			"路竹區",
			"阿蓮區",
			"田寮區",
			"燕巢區",
			"橋頭區",
			"梓官區",
			"彌陀區",
			"永安區",
			"湖內區",
			"鳳山區",
			"大寮區",
			"林園區",
			"鳥松區",
			"大樹區",
			"旗山區",
			"美濃區",
			"六龜區",
			"內門區",
			"杉林區",
			"甲仙區",
			"桃源區",
			"那瑪夏區",
			"茂林區",
			"茄萣區"
		],
		// 澎湖縣
		["馬公市", "西嶼鄉", "望安鄉", "七美鄉", "白沙鄉", "湖西鄉"],
		// 金門縣
		["金沙鎮", "金湖鎮", "金寧鄉", "金城鎮", "烈嶼鄉", "烏坵鄉"],
		// 屏東縣
		[
			"屏東市",
			"三地門鄉",
			"霧臺鄉",
			"瑪家鄉",
			"九如鄉",
			"里港鄉",
			"高樹鄉",
			"鹽埔鄉",
			"長治鄉",
			"麟洛鄉",
			"竹田鄉",
			"內埔鄉",
			"萬丹鄉",
			"潮州鎮",
			"泰武鄉",
			"來義鄉",
			"萬巒鄉",
			"崁頂鄉",
			"新埤鄉",
			"南州鄉",
			"林邊鄉",
			"東港鎮",
			"琉球鄉",
			"佳冬鄉",
			"新園鄉",
			"枋寮鄉",
			"枋山鄉",
			"春日鄉",
			"獅子鄉",
			"車城鄉",
			"牡丹鄉",
			"恆春鎮",
			"滿州鄉"
		],
		// 臺東縣
		[
			"臺東市",
			"綠島鄉",
			"蘭嶼鄉",
			"延平鄉",
			"卑南鄉",
			"鹿野鄉",
			"關山鎮",
			"海端鄉",
			"池上鄉",
			"東河鄉",
			"成功鎮",
			"長濱鄉",
			"太麻里",
			"金峰鄉",
			"大武鄉",
			"達仁鄉"
		],
		// 花蓮縣
		[
			"花蓮市",
			"新城鄉",
			"秀林鄉",
			"吉安鄉",
			"壽豐鄉",
			"鳳林鎮",
			"光復鄉",
			"豐濱鄉",
			"瑞穗鄉",
			"萬榮鄉",
			"玉里鎮",
			"卓溪鄉",
			"富里鄉"
		],
		// 連江縣
		["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"]
	];
	const markTable = document.querySelector(".mark table");
	const locationCity = document.querySelector("#locationCity");
	const locationCityArea = document.querySelector("#locationCityArea");
	const markSubmit = document.querySelector("#markSubmit");
	const markSelect = document.querySelectorAll(".mark select");
	const markSearch = document.querySelector(".mark #markSearch");
	let locationCityName = "";
	let locationCityAreaName = "";

	function appendOption(obj, target) {
		for (let i = 0; i < target.length; i++) {
			let optionPara = document.createElement("option");
			let optionTxt = document.createTextNode(target[i]);
			optionPara.appendChild(optionTxt);
			optionPara.value = "";
			obj.append(optionPara);
		}
	}

	function markTableStyle() {
		let tableOldRowsColor = "";
		for (let i = 0; i < markTable.tBodies[0].rows.length; i++) {
			markTable.tBodies[0].rows[i].onmouseover = function() {
				this.style.cursor = "pointer";
				tableOldRowsColor = this.style.background;
				this.style.background = "pink";
			};

			markTable.tBodies[0].rows[i].onclick = function() {
				let mapMedicine = this.cells[0].textContent;
				let mapAddress = this.cells[1].textContent;
				window.open(
					"https://www.google.com.tw/maps/search/" +
						mapMedicine +
						" " +
						mapAddress,
					(target = "_blank")
				);
			};

			markTable.tBodies[0].rows[i].onmouseout = function() {
				this.style.background = tableOldRowsColor;
			};
			if (i % 2) markTable.tBodies[0].rows[i].style.background = "#eee";
		}
	}

	function markSearchTable() {
		for (let i = 0; i < markTable.tBodies[0].rows.length; i++) {
			for (let j = 0; j < markTable.tBodies[0].rows[i].cells.length; j++) {
				if (
					markTable.tBodies[0].rows[i].cells[j].innerHTML.search(
						markSearch.value
					) >= 0
				) {
					markTable.tBodies[0].rows[i].cells[j].style.color = "red";
				} else {
					markTable.tBodies[0].rows[i].cells[j].style.color = "";
				}
			}
		}
	}

	for (let i = 0; i < markSelect.length; i++) {
		markSelect[i].onmousedown = function() {
			if (this.id == "locationCity") {
				if (this.length == 1) {
					appendOption(this, county);
				}
				locationCityArea.length = 1;
			} else {
				if (locationCity.selectedIndex > 0 && locationCityArea.length == 1) {
					appendOption(this, area[locationCity.selectedIndex - 1]);
				}
			}

			if (this.options.length > 10) {
				this.size = 10;
				this.style.position = "absolute";
				this.style.zIndex = 1;

				for (let j = 0; j < this.options.length; j++) {
					this.options[j].onmouseover = function() {
						markSelect[i].options[j].style.background = "#0069b0";
						markSelect[i].options[j].style.color = "#fff";
					};
					this.options[j].onmouseout = function() {
						markSelect[i].options[j].style.background = "";
						markSelect[i].options[j].style.color = "black";
					};
				}
			}
		};

		markSelect[i].onchange = function() {
			if (this.id == "locationCity") {
				locationCityName = this.options[this.selectedIndex].text;
			} else {
				locationCityAreaName = this.options[this.selectedIndex].text;
				if (this.selectedIndex > 0) {
					markSubmit.disabled = false;
				}
			}
			this.size = 1;
			this.style.position = "static";
			this.style.zIndex = 0;
		};

		markSelect[i].onblur = function() {
			this.size = 1;
			this.style.position = "static";
			this.style.zIndex = 0;
		};
	}

	markTable.style.display = "none";

	markSubmit.onclick = function() {
		document.querySelector(".mark ul").style.display = "none";
		markTable.style.display = "table";
		markTable.tBodies[0].innerHTML = "";

		if (locationCity.selectedIndex == 0) {
			console.log("請由「縣市」清單擇一城市");
			return;
		}
		if (locationCityArea.selectedIndex == 0) {
			console.log("請由「區域」清單擇一鄉鎮市區");
			return;
		}

		let mark = new XMLHttpRequest();
		mark.open(
			"get",
			"https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR0jvB-Y4HK0a8cU_eaUFJA6MjhcIyeXQSWZ7K9Ag5MWfSE7-cdqct8QSrk"
		);
		mark.send();
		mark.onload = function() {
			mark = JSON.parse(this.response);
			for (let i = 0; i < mark.features.length; i++) {
				if (
					mark.features[i].properties.county.search(locationCityName) >= 0 &&
					mark.features[i].properties.town.search(locationCityAreaName) >= 0
				) {
					if (
						mark.features[i].properties.mask_adult == 0 &&
						mark.features[i].properties.mask_child == 0
					) {
						continue;
					} else {
						const tr = document.createElement("tr");
						let td = document.createElement("td");
						// console.log(mark.features[i].properties.address);
						let tdInnerTxt = document.createTextNode(
							mark.features[i].properties.name
						);
						td.appendChild(tdInnerTxt);
						tr.appendChild(td);

						td = document.createElement("td");
						tdInnerTxt = document.createTextNode(
							mark.features[i].properties.address
						);
						td.appendChild(tdInnerTxt);
						tr.appendChild(td);

						td = document.createElement("td");
						let strTrim = mark.features[i].properties.phone;
						strTrim = strTrim.replace(/\s*/g, "");
						tdInnerTxt = document.createTextNode(strTrim);
						td.appendChild(tdInnerTxt);
						tr.appendChild(td);

						td = document.createElement("td");
						tdInnerTxt = document.createTextNode(
							mark.features[i].properties.mask_adult
						);
						td.appendChild(tdInnerTxt);
						tr.appendChild(td);

						td = document.createElement("td");
						tdInnerTxt = document.createTextNode(
							mark.features[i].properties.mask_child
						);
						td.appendChild(tdInnerTxt);
						tr.appendChild(td);

						markTable.tBodies[0].appendChild(tr);
					}
				}
			}
			markTableStyle();
			if (markSearch.value) markSearchTable();
		};
		return false;
	};

	// 【Option】
	// button
	const optionBtn = document.querySelectorAll(".optionBtnWrap button");
	const optionContentDiv = document.querySelectorAll(".optionContent > div");
	for (let i = 0; i < optionBtn.length; i++) {
		optionBtn[i].onclick = function() {
			for (let j = 0; j < optionContentDiv.length; j++) {
				optionBtn[j].className = "";
				optionContentDiv[j].style.display = "none";
			}
			optionBtn[i].className = "active";
			optionContentDiv[i].style.display = "block";
		};
	}
	// itemB

	const dialogueSwitch = document.querySelector(
		".optionTab .itemB .mainInfo .searchArea > i:last-of-type"
	);
	const mainInfo = document.querySelector(".optionTab .itemB .mainInfo");
	const lineTextArea = document.querySelector(".optionTab .itemB textarea");
	const lineUl = document.querySelector(
		".optionTab .itemB .dialogueContent ul"
	);

	function timeInterval(t) {
		if (t < 12) {
			return "上午 ";
		} else {
			return "下午 ";
		}
	}

	dialogueSwitch.onclick = function() {
		if (mainInfo.className == "mainInfo") {
			mainInfo.setAttribute("class", "mainInfo sideBySide");
			this.setAttribute("class", "fas fa-chevron-left");
		} else {
			mainInfo.setAttribute("class", "mainInfo");
			this.setAttribute("class", "fas fa-chevron-right");
		}
	};
	lineTextArea.addEventListener("keydown", sendMsg);

	function sendMsg(ev) {
		console.log(lineTextArea.value);

		if (
			ev.altKey == true ||
			ev.shiftKey == true ||
			(ev.ctrlKey == true && ev.keyCode == 13)
		) {
			return;
		}
		if (ev.keyCode == 13) {
			if (lineTextArea.value == "" || lineTextArea.value == "\n") {
				ev.preventDefault();
				return;
			} else {
				const li = document.createElement("li");
				li.innerHTML = `<div class="dialogueTime">${timeInterval(
					date.getHours()
				)} ${changeDoubleNumber(date.getHours())}:${changeDoubleNumber(
					date.getMinutes()
				)}</div>
				<div class="dialogueWrap">
					<div class="dialogueLog">
						<span> ${lineTextArea.value} </span>
					</div>
				</div>`;
				li.setAttribute("class", "dialogueSelf");
				lineUl.appendChild(li);
				lineTextArea.value = "";
				ev.preventDefault();
				return;
			}
		}
	}

	// itemC
	const itemC = document.querySelectorAll(".optionContent .itemC div");
	for (let i = 0; i < itemC.length; i++) {
		itemC[i].onclick = function() {
			for (let j = 0; j < itemC.length; j++) {
				itemC[j].className = "";
				itemC[j].style.width = "10%";
			}
			itemC[i].className = "active";
			itemC[i].style.width = "70%";
		};
	}

	// itemE
	function changeDoubleNumber(n) {
		if (n < 10) {
			return "0" + n;
		} else {
			return "" + n;
		}
	}

	function changeEngMonth(m) {
		switch (m) {
			case 1:
				return "Jan";
			case 2:
				return "Feb";
			case 3:
				return "Mar";
			case 4:
				return "Apr";
			case 5:
				return "May";
			case 6:
				return "Jun";
			case 7:
				return "Jul";
			case 8:
				return "Aug";
			case 9:
				return "Sep";
			case 10:
				return "Oct";
			case 11:
				return "Nov";
			case 12:
				return "Dec";
		}
	}

	function changeweekNumber(w) {
		if (w == 1) return "一";
		if (w == 2) return "二";
		if (w == 3) return "三";
		if (w == 4) return "四";
		if (w == 5) return "五";
		if (w == 6) return "六";
		if (w == 0) return "日";
	}

	// pointerClock

	function pointerClock() {
		const pointerHour = document.querySelector(
			".optionContent .itemE .pointerHour"
		);
		const pointerMinute = document.querySelector(
			".optionContent .itemE .pointerMinute"
		);
		const pointerSecond = document.querySelector(
			".optionContent .itemE .pointerSecond"
		);

		let time = new Date();
		second = (time.getSeconds() * 360) / 60;
		minute = (time.getMinutes() * 360) / 60;
		(+6 / 60) * second;
		hours = (time.getHours() * 360) / 12 + (5 / 60) * minute;

		pointerSecond.style.transform = `rotate(${second}deg)`;
		pointerMinute.style.transform = `rotate(${minute}deg)`;
		pointerHour.style.transform = `rotate(${hours}deg)`;
	}
	pointerClock();
	setInterval(pointerClock, 1000);

	// digitalClock
	function digitalClock() {
		const digitalWeek = document.querySelector(
			".optionContent .itemE .digitalWeek"
		);
		const digitalDay = document.querySelector(
			".optionContent .itemE .digitalDay"
		);
		const digitalMonth = document.querySelector(
			".optionContent .itemE .digitalMonth"
		);
		const digitalYear = document.querySelector(
			".optionContent .itemE .digitalYear"
		);

		const digitalHour = document.querySelector(
			".optionContent .itemE .digitalHour"
		);
		const digitalMinute = document.querySelector(
			".optionContent .itemE .digitalMinute"
		);
		const digitalSecond = document.querySelector(
			".optionContent .itemE .digitalSecond"
		);
		let date = new Date();

		digitalWeek.textContent = changeweekNumber(date.getDay());
		digitalDay.textContent = date.getDate();
		digitalMonth.textContent = changeEngMonth(date.getMonth() + 1);
		digitalYear.textContent = date.getFullYear() - 1911;

		digitalHour.textContent = changeDoubleNumber(date.getHours());
		digitalMinute.textContent = changeDoubleNumber(date.getMinutes());
		digitalSecond.textContent = changeDoubleNumber(date.getSeconds());
	}
	digitalClock();
	setInterval(digitalClock, 1000);

	// itemF
	const weatherLocationSelectMenu = document.querySelector(".itemF select");
	const weatherInput = document.querySelectorAll(".itemF input");

	let weatherNewTP = null;
	let weatherTP = null;
	let InputName = "";
	let date = new Date();

	let menuCitySelected = 0;
	let locationIndex = 1;

	let todayTimeIndex = 0;
	let tomorrowTimeIndex = null;
	let tomorrowAtTimeIndex = null;

	const ciToday = document.querySelector(".today .ci");
	const wxToday = document.querySelector(".today .wx");
	const popToday = document.querySelector(".today .pop .digital");
	const minTToday = document.querySelector(".today .minT .digital");
	const maxTToday = document.querySelector(".today .maxT .digital");
	const aTToday = document.querySelector(".today .aT .digital");
	const descriptionToday = document.querySelector(".today .description");

	const ciTomorrow = document.querySelector(".tomorrow .ci");
	const wxTomorrow = document.querySelector(".tomorrow .wx");
	const popTomorrow = document.querySelector(".tomorrow .pop .digital");
	const minTTomorrow = document.querySelector(".tomorrow .minT .digital");
	const maxTTomorrow = document.querySelector(".tomorrow .maxT .digital");
	const aTTomorrow = document.querySelector(".tomorrow .aT .digital");
	const descriptionTomorrow = document.querySelector(".tomorrow .description");

	weatherInput[0].checked = true;
	for (let i = 0; i < weatherInput.length; i++) {
		weatherInput[i].onclick = function() {
			for (let j = 0; j < weatherInput.length; j++) {
				weatherInput[j].checked = false;
			}
			this.checked = true;

			while (weatherLocationSelectMenu.length > 1) {
				weatherLocationSelectMenu.removeChild(
					weatherLocationSelectMenu.lastChild
				);
			}
			if (i == 0) weather36("36");
			if (i == 1) {
				WeatherGetJSON("NewTaipei");
				InputName = "NewTaipei";
			}
			if (i == 2) {
				WeatherGetJSON("Taipei");
				InputName = "Taipei";
			}
		};
	}

	function weather36(target) {
		let weather = new XMLHttpRequest();
		const city = [];
		const cityPosion = [
			11,
			2,
			12,
			4,
			5,
			1,
			13,
			16,
			6,
			10,
			17,
			7,
			18,
			3,
			8,
			14,
			20,
			15,
			0,
			19,
			9,
			21
		];

		weather.open(
			"get",
			"https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-4B85E80C-BF87-4FB2-8D9F-081920E82658"
		);

		weather.onload = function() {
			weather = JSON.parse(this.response);
			addOption();

			function addOption() {
				for (let i = 0; i < weather.records.location.length; i++) {
					city[cityPosion[i]] = weather.records.location[i].locationName;
				}
				for (let j = 0; j < city.length; j++) {
					let optionPara = document.createElement("option");
					let optionTxt = document.createTextNode(city[j]);
					if (j == 2) {
						optionPara.selected = "selected";
					}
					optionPara.appendChild(optionTxt);
					optionPara.value = "";
					weatherLocationSelectMenu.append(optionPara);
				}
				timeChkRoot();
			}
			weatherLocationSelectMenu.onmousedown = function() {
				if (this.options.length > 10) {
					this.size = 10;
					this.style.position = "absolute";
					this.style.zIndex = 1;
				}
			};
			weatherLocationSelectMenu.onchange = function() {
				this.size = 1;
				this.style.position = "static";
				this.style.zIndex = 1;
				menuCitySelected = this.options[this.selectedIndex].text;
				for (const i in weather.records.location) {
					if (weather.records.location[i].locationName == menuCitySelected)
						locationIndex = i;
				}
				timeChkRoot();
			};
			weatherLocationSelectMenu.onblur = function() {
				this.size = 1;
				this.style.position = "static";
				this.style.zIndex = 1;
			};

			function timeChkRoot() {
				let timeChkItem = weather.records.location[1].weatherElement[0].time;

				for (let i = 0; i < timeChkItem.length; i++) {
					let startTime = Date.parse(timeChkItem[i].startTime).valueOf();
					let endTime = Date.parse(timeChkItem[i].endTime).valueOf();
					if (Date.now() >= startTime && Date.now() <= endTime) {
						todayTimeIndex = i;
					}
					if (
						Date.now().valueOf() + 43200000 >= startTime &&
						Date.now().valueOf() + 43200000 <= endTime
					) {
						tomorrowTimeIndex = i;
					}
				}
				weatherDataSet();
			}

			function weatherDataSet() {
				let aT = document.querySelectorAll(".weatherMore .aT");
				let minTIcon = document.querySelectorAll(".weatherMore .minT i");
				let description = document.querySelectorAll(
					".weatherMore + .description"
				);
				for (let i = 0; i < aT.length; i++) {
					aT[i].style.display = "none";
					minTIcon[i].className = "fas fa-temperature-low";
					description[i].textContent = "";
				}

				wxToday.textContent =
					weather.records.location[locationIndex].weatherElement[0].time[
						todayTimeIndex
					].parameter.parameterName;
				ciToday.textContent =
					weather.records.location[locationIndex].weatherElement[3].time[
						todayTimeIndex
					].parameter.parameterName;
				popToday.textContent =
					weather.records.location[locationIndex].weatherElement[1].time[
						todayTimeIndex
					].parameter.parameterName + "%";
				maxTToday.textContent =
					weather.records.location[locationIndex].weatherElement[4].time[
						todayTimeIndex
					].parameter.parameterName + "度";
				minTToday.textContent =
					weather.records.location[locationIndex].weatherElement[2].time[
						todayTimeIndex
					].parameter.parameterName + "度";

				wxTomorrow.textContent =
					weather.records.location[locationIndex].weatherElement[0].time[
						tomorrowTimeIndex
					].parameter.parameterName;
				ciTomorrow.textContent =
					weather.records.location[locationIndex].weatherElement[3].time[
						tomorrowTimeIndex
					].parameter.parameterName;
				popTomorrow.textContent =
					weather.records.location[locationIndex].weatherElement[1].time[
						tomorrowTimeIndex
					].parameter.parameterName + "%";
				maxTTomorrow.textContent =
					weather.records.location[locationIndex].weatherElement[4].time[
						tomorrowTimeIndex
					].parameter.parameterName + "度";
				minTTomorrow.textContent =
					weather.records.location[locationIndex].weatherElement[2].time[
						tomorrowTimeIndex
					].parameter.parameterName + "度";
			}
		};
		weather.send();
	}

	function WeatherGetJSON(target) {
		if (target == "NewTaipei") {
			weatherNewTP = new XMLHttpRequest();
			weatherNewTP.open(
				"get",
				"https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-069?Authorization=CWB-4B85E80C-BF87-4FB2-8D9F-081920E82658"
			);
			weatherNewTP.onload = function() {
				weatherNewTP = JSON.parse(this.response);
				addAreaOption(weatherNewTP);
			};
			weatherNewTP.send();
		}

		if (target == "Taipei") {
			weatherTP = new XMLHttpRequest();
			weatherTP.open(
				"get",
				"https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-061?Authorization=CWB-4B85E80C-BF87-4FB2-8D9F-081920E82658"
			);
			weatherTP.onload = function() {
				weatherTP = JSON.parse(this.response);
				addAreaOption(weatherTP);
			};
			weatherTP.send();
		}

		function addAreaOption(target) {
			for (let i = 0; i < target.records.locations[0].location.length; i++) {
				let optionPara = document.createElement("option");
				let optionTxt = document.createTextNode(
					target.records.locations[0].location[i].locationName
				);
				optionPara.appendChild(optionTxt);
				optionPara.value = "";
				weatherLocationSelectMenu.append(optionPara);
			}
		}

		weatherLocationSelectMenu.onmousedown = function() {
			if (this.options.length > 10) {
				this.size = 10;
				this.style.position = "absolute";
				this.style.zIndex = 1;
			}
		};
		weatherLocationSelectMenu.onblur = function() {
			this.size = 1;
			this.style.position = "static";
			this.style.zIndex = 1;
		};

		weatherLocationSelectMenu.onchange = function() {
			this.size = 1;
			this.style.position = "static";
			this.style.zIndex = 1;
			locationIndex = this.options[this.selectedIndex].index - 1;
			if (InputName == "NewTaipei") {
				timeChk(weatherNewTP);
			} else {
				timeChk(weatherTP);
			}
		};

		function timeChk(target) {
			let tomorrow = new Date(
				date.getFullYear(),
				date.getMonth(),
				date.getDate() + 1,
				00,
				00,
				00
			);

			let timeRoot =
				target.records.locations[0].location[locationIndex].weatherElement[7]
					.time;
			for (let i = 0; i < timeRoot.length; i++) {
				let startTime = Date.parse(timeRoot[i].startTime).valueOf();

				if (Date.parse(tomorrow).valueOf() == startTime) {
					tomorrowTimeIndex = i;
				}
			}
			let timeTRoot =
				target.records.locations[0].location[locationIndex].weatherElement[2]
					.time;
			for (let i = 0; i < timeTRoot.length; i++) {
				let dataTime = Date.parse(timeTRoot[i].dataTime).valueOf();

				if (Date.parse(tomorrow).valueOf() == dataTime) {
					tomorrowAtTimeIndex = i;
				}
			}
			weatherDataSet(target);
		}

		function weatherDataSet(target) {
			let aT = document.querySelectorAll(".weatherMore .aT");
			let minTIcon = document.querySelectorAll(".weatherMore .minT i");
			for (let i = 0; i < aT.length; i++) {
				aT[i].style.display = "inline-block";
				minTIcon[i].className = "fas fa-wind";
			}

			wxToday.innerHTML =
				target.records.locations[0].location[
					locationIndex
				].weatherElement[1].time[todayTimeIndex].elementValue[0].value;

			ciToday.innerHTML =
				target.records.locations[0].location[
					locationIndex
				].weatherElement[5].time[todayTimeIndex].elementValue[1].value;

			popToday.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[7]
					.time[todayTimeIndex].elementValue[0].value + "%";

			minTToday.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[8]
					.time[todayTimeIndex].elementValue[0].value + "m/s";

			maxTToday.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[3]
					.time[todayTimeIndex].elementValue[0].value + "<sup>o</sup>";

			aTToday.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[2]
					.time[todayTimeIndex].elementValue[0].value + "<sup>o</sup>";

			descriptionToday.innerHTML =
				target.records.locations[0].location[
					locationIndex
				].weatherElement[6].time[todayTimeIndex].elementValue[0].value;

			wxTomorrow.innerHTML =
				target.records.locations[0].location[
					locationIndex
				].weatherElement[1].time[tomorrowTimeIndex].elementValue[0].value;
			ciTomorrow.innerHTML =
				target.records.locations[0].location[
					locationIndex
				].weatherElement[5].time[tomorrowTimeIndex].elementValue[1].value;
			popTomorrow.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[7]
					.time[tomorrowTimeIndex].elementValue[0].value + "%";
			minTTomorrow.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[8]
					.time[tomorrowTimeIndex].elementValue[0].value + "m/s";
			maxTTomorrow.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[3]
					.time[tomorrowTimeIndex].elementValue[0].value + "<sup>o</sup>";
			aTTomorrow.innerHTML =
				target.records.locations[0].location[locationIndex].weatherElement[2]
					.time[tomorrowAtTimeIndex].elementValue[0].value + "<sup>o</sup>";
			descriptionTomorrow.innerHTML =
				target.records.locations[0].location[
					locationIndex
				].weatherElement[6].time[tomorrowTimeIndex].elementValue[0].value;
		}
	}
	weather36();

	//【featured】
	const featuredBtn = document.querySelectorAll(".featured ul li");
	let nowFeaturedAction = 0;

	for (let i = 0; i < featuredBtn.length; i++) {
		featuredBtn[i].onclick = function() {
			for (let j = 0; j < featuredBtn.length; j++) {
				featuredBtn[j].setAttribute("class", "");
			}
			featuredBtn[i].setAttribute("class", "active");
			featuredShowHide(i);
			return false;
		};
	}

	function featuredShowHide(btnIndex) {
		let item = [
			[0, 1, 2, 3, 4, 5, 6, 7],
			[1, 3, 5, 7],
			[0, 1, 6, 7],
			[4, 5, 6, 7],
			[0, 1, 2, 3],
			[0, 2, 4, 6]
		];
		for (let q = 0; q < item[nowFeaturedAction].length; q++) {
			if (item[btnIndex].indexOf(item[nowFeaturedAction][q]) == -1) {
				document
					.querySelectorAll(".featuredItem")
					[item[nowFeaturedAction][q]].setAttribute(
						"class",
						"featuredItem hideAni"
					);
			}
		}
		for (let q = 0; q < item[btnIndex].length; q++) {
			if (item[nowFeaturedAction].indexOf(item[btnIndex][q]) == -1) {
				document
					.querySelectorAll(".featuredItem")
					[item[btnIndex][q]].setAttribute("class", "featuredItem showAni");
			}
		}
		nowFeaturedAction = btnIndex;
	}

	// 【testimonials】
	const testimonialsInfo = document.querySelector(".testimonialsInfo");
	const blockquotes = document.querySelectorAll("blockquote");
	const testimonialsDots = document.querySelectorAll(".testimonialsDot span");
	let mouseRec = false;
	let clickX = null;
	let xValue = null;
	let nowBlueDots = 0;

	testimonialsInfo.style.width =
		blockquotes[0].offsetWidth * blockquotes.length + "px";
	testimonialsInfo.onmousedown = function(event) {
		clickX = event.clientX;
		mouseRec = true;
	};
	testimonialsInfo.ontouchstart = function(event) {
		clickX = event.clientX;
		mouseRec = true;
	};

	testimonialsInfo.onmousemove = function(event) {
		if (mouseRec) xValue = event.clientX - clickX;
	};
	testimonialsInfo.ontouchmove = function(event) {
		if (mouseRec) xValue = event.clientX - clickX;
	};

	testimonialsInfo.onmouseup = function() {
		if (xValue >= 0) {
			nowBlueDots--;
		} else {
			nowBlueDots++;
		}
		blueDotChk(nowBlueDots);
		mouseRec = false;
	};
	testimonialsInfo.ontouchend = function() {
		if (xValue >= 0) {
			nowBlueDots--;
		} else {
			nowBlueDots++;
		}
		blueDotChk(nowBlueDots);
		mouseRec = false;
	};

	for (let i = 0; i < testimonialsDots.length; i++) {
		testimonialsDots[i].onclick = function() {
			nowBlueDots = i;
			blueDotChk(i);
		};
	}

	function blueDotChk(i) {
		if (i < 0) nowBlueDots = 2;
		if (i > 2) nowBlueDots = 0;
		for (let j = 0; j < testimonialsDots.length; j++) {
			testimonialsDots[j].className = "";
		}
		testimonialsDots[nowBlueDots].className = "active";
		testimonialsInfo.style.left =
			-blockquotes[0].offsetWidth * nowBlueDots + "px";
	}

	//【contact】
	const formName = document.querySelector(".contact #name");
	const formPhone = document.querySelector(".contact #phone");
	const formMail = document.querySelector(".contact #mail");
	const textarea = document.querySelector(".contact textarea");
	const termsWrap = document.querySelector(".contact .termsWrap");
	const accept = document.querySelector(".contact #accept");
	const remember = document.querySelector(".contact  #remember");
	const remind = document.querySelector(".contact .remind");
	const submit = document.querySelector(".contact button[type=submit]");
	const nameReg = /[\A-z\-\u4e00-\u9fa5]+/;
	const phoneReg = /^0\d{8,9}$|(^[09]{2})\d{8}$|^0\d{1,9}?(\-\d{3,}){1,2}/;
	const mailReg = /^\w{2,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;

	formName.onchange = function() {
		if (!nameReg.test(this.value)) {
			alert("姓名格式有誤");
		}
	};
	formPhone.onchange = function() {
		if (!phoneReg.test(this.value)) {
			alert("電話格式有誤");
		}
	};
	formMail.onchange = function() {
		if (!mailReg.test(this.value)) {
			alert("mail格式有誤");
		}
	};
	termsWrap.onscroll = function() {
		if (
			termsWrap.scrollHeight - termsWrap.scrollTop ==
			termsWrap.clientHeight
		) {
			accept.disabled = false;
		} else {
			accept.disabled = true;
		}
	};
	accept.onchange = function() {
		if (accept.checked) {
			submit.disabled = false;
		} else {
			submit.disabled = true;
		}
	};
	submit.onmousemove = function() {
		if (submit.disabled == true) alert("需勾選個資保護聲明");
	};
	submit.onclick = function() {
		// if(formName.value==""||formPhone.value==""||formMail.value==""||textarea.value=="")
		if (formName.value == "") {
			alert("姓名欄位不可為空");
			return false;
		}
		if (formPhone.value == "") {
			alert("電話欄位不可為空");
			return false;
		}
		if (formMail.value == "") {
			alert("mail欄位不可為空");
			return false;
		}
		if (textarea.value == "") {
			alert("內容說明欄位不可為空");
			return false;
		}
		const category = document.querySelectorAll('input[name="category"]');
		let radioSelect = false;
		console.log(category);
		for (let i = 0; i < category.length; i++) {
			if (category[i].checked) {
				radioSelect = true;
			}
		}
		if (!radioSelect) {
			alert("問題類別欄位必填");
			return false;
		}

		alert("資料已送出");
		return false;
	};
	remember.onmouseover = function() {
		remind.style.display = "block";
	};
	remember.onmouseout = function() {
		remind.style.display = "none";
	};

	// 【countBar】
	window.addEventListener("scroll", function() {
		const counts = document.querySelectorAll(".count");
		const html = document.querySelector("html");
		const countBar = document.querySelector(".countBar");
		const footer = document.querySelector("footer");

		function calNum() {
			for (let i = 0; i < counts.length; i++) {
				if (counts[i].innerHTML == counts[i].dataset.to) {
					continue;
				} else {
					counts[i].innerHTML = counts[i].innerHTML * 1 + 1;
				}
			}
		}
		if (
			html.scrollHeight - html.scrollTop - html.clientHeight <=
			countBar.clientHeight / 2 + footer.clientHeight
		) {
			timerCalNum = setInterval(calNum, 150);
		}
	});

	//【aside】
	const levitateAside = document.querySelector(".levitateAside");
	let timerLevitateAside = null;
	levitateAside.onclick = function() {
		levitateAsideMove(this);
	};

	function levitateAsideMove(obj) {
		const levitateAsideCat = document.querySelector(".levitateAside span");
		let speed = 0;
		let target = 0;
		if (obj.offsetLeft == 0) {
			target = -50;
			speed = -5;
			levitateAsideCat.style.color = "#0069b080";
		} else {
			target = 0;
			speed = 5;
			levitateAsideCat.style.color = "#0069b0";
		}

		clearInterval(timerLevitateAside);
		timerLevitateAside = setInterval(function() {
			obj.style.left = obj.offsetLeft + speed + "px";
			if (obj.offsetLeft == target) {
				clearInterval(timerLevitateAside);
			}
		}, 30);
	}
})();
