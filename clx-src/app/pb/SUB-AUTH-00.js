/*******************************************************************************
 * Business Category :
 * Screen ID : SUB-AUTH-00.js
 * Screen Name : 
 * Created Date :  2026. 9. 16. 오전 9:23:24
 * Creator : ryu
 * Revision History
 *******************************************************************************
 * Date				Name				Description
 *******************************************************************************
 * 
 *******************************************************************************/

/*******************************************************************************
 * Common Module Area
 *******************************************************************************/
 
 
/*******************************************************************************
 * Business Common Module Area
 *******************************************************************************/
 
 
/*******************************************************************************
 * Local Variable Declarations within File
 *******************************************************************************/

var WIDTH = {
	gnbOpen: 240, sideOpen: 280, collapsed: 48
};

/** Panel definitions: which groups resize together and what to hide when collapsed */
var PANEL = {
	gnb: {
		groups  : ["grpGnb", "grpGnbHead"],     // TODO: replace header ID
		btnClose: "btnGnbClose",
		btnOpen : "btnGnbOpen",
		width   : WIDTH.gnbOpen,
		hide    : ["snavMenu"]                     // controls hidden while collapsed
	},
	side: {
		groups  : ["grpSideBar", "grpSideHead"],  // TODO: replace header ID
		btnClose: "btnSideClose",
		btnOpen : "btnSideOpen",
		width   : WIDTH.sideOpen,
		hide    : "children"                      // hide every child of grpSideBar
	}
};

var mcPopoverAnchor = null;

/*******************************************************************************
 * Onload and Submission Call Area
 * (Contains related events and submission calls, along with callback functions invoked upon screen loading.)
 *******************************************************************************/
 
 
/*******************************************************************************
 * Validation Check Area
 *******************************************************************************/

 
/*******************************************************************************
 * User-Defined JavaScript Functions
 *******************************************************************************/

/**
 * Register deadline dates as calendar anniversaries (class: urgent)
 */
function doRegisterDeadlineAnniversaries() {
	var vcDs  = app.lookup("dsDeadline");
	var vcCal = app.lookup("calDeadline");
	if (!vcDs || !vcCal || vcDs.getRowCount() === 0) return;

	vcCal.removeAllAnniversary();
	for (var i = 0; i < vcDs.getRowCount(); i++) {
		var voDate = moment(vcDs.getValue(i, "DEADLINE_DT"), "YYYYMMDD");
		if (!voDate.isValid()) continue;   // moment object is always truthy; check isValid()
		vcCal.addAnniversary({
			date: voDate.format("YYYYMMDD"), // anniversary expects a String
			label: vcDs.getValue(i, "TITLE"),
			className: doGetDeadlineClass(vcDs.getValue(i, "CATEGORY"))
		});
	}
}

/**
 * Map a deadline category to its style class (shared by anniversaries and cards)
 * @param {String} psCategory
 * @return {String} "urgent" | "normal"
 */
function doGetDeadlineClass(psCategory) {
	return String(psCategory || "").toLowerCase() === "urgent" ? "urgent" : "normal";
}

/**
 * Toggle the GNB or side panel (panel group + header group + inner controls)
 * @param {"gnb" | "side"} psPanel
 * @param {Boolean} pbOpen
 */
function doTogglePanel(psPanel, pbOpen) {
	var voDef   = PANEL[psPanel];
	var vnWidth = pbOpen ? voDef.width : WIDTH.collapsed;

	// Resize the panel group and its header group together (parent is XY layout)
	voDef.groups.forEach(function (psId) {
		var vcGroup = app.lookup(psId);
		if (!vcGroup) return;
		vcGroup.getParent().updateConstraint(vcGroup, { width: vnWidth + "px" });
		if (pbOpen) vcGroup.style.removeClass("collapsed");
		else        vcGroup.style.addClass("collapsed");
	});

	// Swap open/close buttons
	app.lookup(voDef.btnClose).visible = pbOpen;
	app.lookup(voDef.btnOpen).visible  = !pbOpen;

	// Hide inner controls while collapsed
	doSetPanelContentVisible(psPanel, pbOpen);

	doResizeContent();
}

/**
 * Show or hide the controls inside a panel, keeping the open/close buttons untouched
 * @param {"gnb" | "side"} psPanel
 * @param {Boolean} pbVisible
 */
function doSetPanelContentVisible(psPanel, pbVisible) {
	var voDef = PANEL[psPanel];
	var vaKeep = [voDef.btnClose, voDef.btnOpen];
	var vaTargets;

	if (voDef.hide === "children") {
		/** @type cpr.controls.Container */
		var vcPanel = app.lookup(voDef.groups[0]);
		vaTargets = vcPanel.getChildren();
	} else {
		vaTargets = voDef.hide.map(function (psId) { return app.lookup(psId); });
	}

	vaTargets.forEach(function (pcCtrl) {
		if (!pcCtrl || vaKeep.indexOf(pcCtrl.id) >= 0) return;
		pcCtrl.visible = pbVisible;
	});
	// side panel title lives in the header group
	if (psPanel === "side") app.lookup("optCalTitle").visible = pbVisible;
}

/**
 * Collapse a panel
 * @param {"gnb" | "side"} psPanel
 */
function doCollapsePanel(psPanel) {
	doTogglePanel(psPanel, false);
}

/**
 * Expand a panel
 * @param {"gnb" | "side"} psPanel
 */
function doExpandPanel(psPanel) {
	doTogglePanel(psPanel, true);
}

/**
 * Update the content EmbeddedApp constraint to fit the current panel widths
 */
function doResizeContent() {
	var vcContent = app.lookup("eaContent");
	var vnLeft  = app.lookup("btnGnbOpen").visible  ? WIDTH.collapsed : WIDTH.gnbOpen;
	var vnRight = app.lookup("btnSideOpen").visible ? WIDTH.collapsed : WIDTH.sideOpen;
	vcContent.getParent().updateConstraint(vcContent, {
		left: vnLeft + "px",
		right: vnRight + "px"
	});
}

/**
 * Open the user popover as a floating control and watch for outside clicks
 * @param {cpr.controls.UIControl} pcAnchor button that opened the popover
 */
function doOpenUserPopover(pcAnchor) {
	var vcPop = app.lookup("grpUserPop");
	var voRect = pcAnchor.getActualRect();   // position relative to the app root
	mcPopoverAnchor = pcAnchor;

	app.getContainer().floatControl(vcPop, {
		left  : voRect.left + "px",
		top   : (voRect.top + voRect.height + 12) + "px",   // 4px gap below the anchor
		width : "320px",
		height: "auto"
	});
	vcPop.visible = true;
	document.addEventListener("mousedown", onDocMousedownForPopover);
	
	// Focus the close button once the popover has been rendered
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function () {
		app.lookup("btnUserPopClose").focus();
	});
}

/**
 * Hide the user popover and stop watching for outside clicks
 */
function doCloseUserPopover() {
	var vcPop = app.lookup("grpUserPop");
	vcPop.visible = false;
	document.removeEventListener("mousedown", onDocMousedownForPopover);

	// Return focus to the control that opened the popover
	if (mcPopoverAnchor) {
		mcPopoverAnchor.focus();
		mcPopoverAnchor = null;
	}
}

/**
 * Close the popover when the mousedown target is outside of it (DOM read only)
 * @param {MouseEvent} e native DOM event, not cpr.events.CMouseEvent
 */
function onDocMousedownForPopover(e) {
	var voPopEl = document.querySelector('[data-usr-id="grpUserPop"]');
	if (voPopEl && voPopEl.contains(e.target)) return;
	mcPopoverAnchor = null; // clicked elsewhere
	doCloseUserPopover();
}

/**
 * Look up the CALL_PAGE (linked screen path) for the given MENU_ID in dsAllMenu.
 * @param {String} psMenuId menu ID
 * @return {String} CALL_PAGE value (empty string if not found)
 */
function doGetMenuCallPage(psMenuId) {
	var vcDs = app.lookup("dsAllMenu");
	if (!vcDs) return "";

	for (var i = 0; i < vcDs.getRowCount(); i++) {
		if (vcDs.getValue(i, "MENU_ID") == psMenuId) {
			return vcDs.getValue(i, "CALL_PAGE") || "";
		}
	}
	return "";
}

/**
 * Load an app into the content EmbeddedApp
 * @param {#app} psAppId app ID to load
 * @param {Object} poInitValue? value passed as the "initValue" app property
 * @param {Object} poOptions? { params: {key: value}, readyCallback: fn(ea) }
 */
function doLoadContent(psAppId, poInitValue, poOptions) {
	var vcEa = app.lookup("eaContent");
	poOptions = poOptions || {};
	cpr.core.App.load(psAppId, function (poLoadedApp) {
		vcEa.app = poLoadedApp;
		vcEa.ready(function (poEa) {
			poEa.setAppProperty("initValue", poInitValue || {});
			if (poOptions.params) {
				for (var vsKey in poOptions.params) poEa.setAppProperty(vsKey, poOptions.params[vsKey]);
			}
			if (poOptions.readyCallback) poOptions.readyCallback(poEa);
		});
	});
}

/**
 * Update the calendar title, e.g. "April 2026"
 * @param {Date | String} pdDate
 */
function doUpdateCalTitle(pdDate) {
	app.lookup("optCalTitle").value = moment(pdDate).format("YYYYMMDD");
}

/**
 * Sync the title and deadline cards with the calendar's current month
 * @param {cpr.controls.Calendar} pcCal
 */
function doAfterNavigate(pcCal) {
	doUpdateCalTitle(pcCal.current);
	doRenderDeadlineCards(pcCal.current);
}

/**
 * Count deadlines from today through the end of this month and expose it
 * on the side-open button as userAttr "count"
 */
function doUpdateDeadlineCount() {
	var vcDs = app.lookup("dsDeadline");
	var vnCount = 0;

	if (vcDs) {
		var vsToday    = moment().format("YYYYMMDD");
		var vsMonthStart = moment().startOf("month").format("YYYYMMDD");
		var vsMonthEnd = moment().endOf("month").format("YYYYMMDD");
		for (var i = 0; i < vcDs.getRowCount(); i++) {
			var vsDt = String(vcDs.getValue(i, "DEADLINE_DT") || "");
			// YYYYMMDD strings compare correctly as text
			//if (vsDt >= vsToday && vsDt <= vsMonthEnd) vnCount++; // Today and Future items in this month
			if (vsDt >= vsMonthStart && vsDt <= vsMonthEnd) vnCount++; // All items of this month
		}
	}
	
	app.lookup("btnSideOpen").userAttr("count", String(vnCount));
}

/**
 * Rebuild deadline cards in .card-list for the month of the given date
 * @param {Date | String} pdDate
 */
function doRenderDeadlineCards(pdDate) {
	var vcList = app.lookup("grpCardList");
	var vcDs = app.lookup("dsDeadline");
	vcList.removeAllChildren();
	if (!vcDs) return;
	
	var vsYm = moment(pdDate).format("YYYYMM");
	var vaRows = [];
	for (var i = 0; i < vcDs.getRowCount(); i++) {
		var vsDt = String(vcDs.getValue(i, "DEADLINE_DT") || "");
		if (vsDt.substr(0, 6) === vsYm) vaRows.push(vcDs.getRow(i));
	}
	
	vaRows.forEach(function (poRow) {
		vcList.addChild(doCreateDeadlineCard(poRow), {
			"autoSize": "height",
			"width": "100%"
		});
	});
}

/**
 * Create a single deadline card (.item > .c-cate, .c-tit, .c-date)
 * @param {cpr.data.DataRow} poRow
 * @return {cpr.controls.Container}
 */
function doCreateDeadlineCard(poRow) {
	var vbUrgent = String(poRow.getValue("CATEGORY") || "").toLowerCase() === "urgent";

	var vcCard = new cpr.controls.Container();
	vcCard.style.setClasses(vbUrgent ? ["item", "urgent"] : ["item"]);
	var voLayout = new cpr.controls.layouts.VerticalLayout();
	voLayout.scrollable = false;
	voLayout.spacing = 4;
	voLayout.leftMargin = voLayout.rightMargin = voLayout.topMargin = voLayout.bottomMargin = 12;
	vcCard.setLayout(voLayout);

	// Category label only for urgent items
	if (vbUrgent) {
		var vcCate = new cpr.controls.Output();
		vcCate.value = "Urgent";
		vcCate.style.setClasses(["c-cate"]);
		vcCard.addChild(vcCate, { "autoSize": "height", "width": "100px" });
	}

	var vcTitle = new cpr.controls.Button();
	vcTitle.value = poRow.getValue("TITLE");
	vcTitle.style.setClasses(["c-tit"]);
	vcTitle.addEventListener("click", function (e) {
		doOpenDeadline(poRow);
	});
	vcCard.addChild(vcTitle, { "autoSize": "height", "width": "100px" });

	var vcDate = new cpr.controls.Output();
	vcDate.dataType = "date";
	vcDate.dateValueFormat = "YYYYMMDD";   // default is YYYYMMDDHHmmssSSS
	vcDate.format = "MM-DD-YYYY";
	vcDate.value = poRow.getValue("DEADLINE_DT");
	vcDate.style.setClasses(["c-date"]);
	vcCard.addChild(vcDate, { "autoSize": "height", "width": "100px" });

	return vcCard;
}

/**
 * Handle a card title click
 * @param {cpr.data.DataRow} poRow
 */
function doOpenDeadline(poRow) {
	// TODO: connect doLoadContent(...)
}

/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/

function onBodyInit(e) {
	doCollapsePanel("side");            // side panel starts collapsed (48px)
	doRegisterDeadlineAnniversaries();
	doUpdateDeadlineCount();
	doUpdateCalTitle(new Date());
	doRenderDeadlineCards(new Date());  // cards for the current month
}

function onBodyLoad(e) {
	
}

function onBtnLogoClick(e) {
	window.location.reload();
}

function onBtnLogoutClick(e) {
	// TODO: call the login page
}

function onBtnGnbCloseClick(e) {
	doCollapsePanel("gnb");
}

function onBtnGnbOpenClick(e) {
	doExpandPanel("gnb");
}

function onBtnSideCloseClick(e) {
	doCollapsePanel("side");
}

function onBtnSideOpenClick(e) {
	doExpandPanel("side");
}

function onBtnUserNameClick(e) {
	doOpenUserPopover(e.control);
}

function onBtnUserPopCloseClick(e) {
	doCloseUserPopover();
}

function onSideNavigationItemClick(e) {
	var voItem = e.item;
	var vsCallPage = doGetMenuCallPage(voItem.value);
	if (!vsCallPage) return; // Ignore menus without a CALL_PAGE (e.g. top-level categories)

	doLoadContent(vsCallPage, { menuId: voItem.value, menuNm: voItem.label });
}

function onBtnCalPrevClick(e) {
	var vcCal = app.lookup("calDeadline");
	vcCal.prev();
	doAfterNavigate(vcCal);
}

function onBtnCalNextClick(e) {
	var vcCal = app.lookup("calDeadline");
	vcCal.next();
	doAfterNavigate(vcCal); 
}

function onBtnCalTodayClick(e) {
	app.lookup("calDeadline").navigate(new Date());
}

function onCalDeadlineNavigate(e) {
	doAfterNavigate(e.control);   // keeps working if the event does fire
}