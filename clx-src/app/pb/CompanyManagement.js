/*******************************************************************************
 * Business Category :
 * Screen ID : CompanyManagement.js
 * Screen Name :
 * Created Date :  2026. 9. 19. 오후 3:00:00
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
var util = createCommonUtil();


/*******************************************************************************
 * Business Common Module Area
 *******************************************************************************/


/*******************************************************************************
 * Local Variable Declarations within File
 *******************************************************************************/
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
			return "badge soft success";

		// Danger (빨간색)
		case "rejected":
			return "badge soft danger";

		// Primary (파란색)
		case "answered":
			return "badge soft primary";

		// Warning (노란색)
		case "pending":
		case "notStarted":
		case "pendingApproval":
		case "open":
		case "submitted":
			return "badge soft warning";

		// Default
		default:
			return "badge soft information";
	}
};

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


/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/

/*
 * "Logo" 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onButtonClick(e) {
	var button = e.control;
	
	util.Dialog.open(app, "app/pb/CompanyManagement_LogoDia", 400, -1, function(){
		
	});
}
