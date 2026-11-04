/*******************************************************************************
 * Business Category :
 * Screen ID : udcComApprovalCard.js
 * Screen Name : Amend Card
 * Created Date :  2026. 10. 30.
 * Creator :
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
	return app.getAppProperty("templateName");
};

/**
 * 읽지 않은 항목(isRead == "N")이면 카드를 강조 표시하고 메일 아이콘을 닫힌 봉투로 바꾼다.
 */
function applyRead() {
	var vcCard = app.lookup("grpCard");
	var vcMail = app.lookup("cbxMail");

	if (app.getAppProperty("isRead") == "N") {
		vcCard.style.addClass("highlight");
		vcMail.value = "N"
	} else {
		vcCard.style.removeClass("highlight");
		vcMail.value = "Y"
	}
}
 
 
/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/
/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e){
	applyRead();
}

/*
 * 루트 컨테이너에서 property-change 이벤트 발생 시 호출.
 * 앱의 속성이 변경될 때 발생하는 이벤트 입니다.
 */
function onBodyPropertyChange(e){
	applyRead();
}

/*
 * 체크 박스에서 value-change 이벤트 발생 시 호출.
 */
function onCbxMailValueChange(e) {
	var cbxMail = e.control;
	var vcCard = app.lookup("grpCard");
	var vcMail = app.lookup("cbxMail");

	if (vcMail.value == "N") {
		vcCard.style.addClass("highlight");
		vcMail.value = "N"
	} else {
		vcCard.style.removeClass("highlight");
		vcMail.value = "Y"
	}
}
