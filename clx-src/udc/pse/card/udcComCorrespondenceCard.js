/*******************************************************************************
 * Business Category :
 * Screen ID : udcComCorrespondenceCard.js
 * Screen Name : 
 * Created Date :  2026. 9. 18. 오전 10:54:49
 * Creator : chwec
 * Revision History
 *******************************************************************************
 * Date				Name				Description
 *******************************************************************************
 * 
 *******************************************************************************/

/*******************************************************************************
 * Common Module Area
 *******************************************************************************/
var util = createCommonUtil();
 
/*******************************************************************************
 * Business Common Module Area
 *******************************************************************************/
exports.getText = getText;
/**
 * 모든 상태값(status)에 따른 배지 텍스트 반환
 * @param {String} status 
 */
exports.getBadgeText = function(status) {
	// 디버깅 로그: 전달받은 raw 값 및 타입 출력
	console.log("[getBadgeText] Raw Input:", status, "| Type:", typeof status);

	var val = status ? String(status).trim() : "";

	switch (val) {
		// Success (초록색)
		case "approved":
			return "Approved";
		case "closed":
			return "Closed";

		// Danger (빨간색)
		case "rejected":
			return "Rejected";

		// Primary (파란색)
		case "answered":
			return "Answered";

		// Warning (노란색)
		case "pending":
			return "Pending";
		case "notStarted":
			return "Not started";
		case "pendingApproval":
			return "Pending Approval";
		case "open":
			return "Open";
		case "submitted":
			return "Submitted";

		// Default
		default:
			return "-";
	}
};

/**
 * 모든 상태값(status)에 따른 배지 스타일 클래스 반환
 * @param {String} status 
 */
exports.getBadgeClass = function(status) {
	// 디버깅 로그: 전달받은 raw 값 및 타입 출력
	console.log("[getBadgeClass] Raw Input:", status, "| Type:", typeof status);

	var val = status ? String(status).trim() : "";

	switch (val) {
		// Success (초록색)
		case "approved":
		case "closed":
			return "badge fill green";

		// Danger (빨간색)
		case "rejected":
			return "badge fill red";

		// Primary (파란색)
		case "answered":
			return "badge fill blue";

		// Warning (노란색)
		case "pending":
		case "notStarted":
		case "pendingApproval":
		case "open":
		case "submitted":
			return "badge fill yellow";

		// Default
		default:
			return "badge fill blue";
	}
};
 
/*******************************************************************************
 * Local Variable Declarations within File
 *******************************************************************************/

 
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
 * Returns the text to be displayed for the UDC control in the grid's view mode.
 */
function getText() {
	// TODO: Write code to return the text to be displayed in the grid's view mode.
	return "";
};

/**
 * 체크 상태에 따라 카드(grp6)의 highlight 클래스를 반영한다.
 * 체크 해제: toggle-card highlight / 체크: toggle-card
 */
function applyHighlight() {
	var vcCard = app.lookup("grp6");
	var vcCheckbox = app.lookup("cbx1");

	if (vcCheckbox.checked) {
		vcCard.style.removeClass("highlight");
	} else {
		vcCard.style.addClass("highlight");
	}
}


/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/

/*
 * 루트 컨테이너에서 init 이벤트 발생 시 호출.
 * 앱이 최초 구성될 때 발생하는 이벤트 입니다.
 */
function onBodyInit(e) {
	applyHighlight();
}

/*
 * 체크박스에서 value-change 이벤트 발생 시 호출.
 * Checkbox의 value 즉, 체크 상태가 변경되어 변경된 값이 저장된 후에 발생하는 이벤트.
 */
function onCbx1ValueChange(e) {
	applyHighlight();
}

