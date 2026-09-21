/*******************************************************************************
 * Business Category :
 * Screen ID : UserCard.js
 * Screen Name : 
 * Created Date :  2026. 9. 17. 오후 2:55:55
 * Creator : user
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
 exports.getText = getText;
 exports.initData = initData;
 
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
 
function initData(initValue){
	app.lookup("dmUser").build(initValue);
}
/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/
/*
 * 버튼(btn5)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn5Click(e) {
	var btn5 = e.control;
    // UDC 이벤트를 메인 화면(부모)으로 발송 (데이터를 함께 전달 가능)
    var event = new cpr.events.CUIEvent("userIdClick");
    
    // 이벤트 발송
    app.dispatchEvent(event);
}

/*
 * 아웃풋(opt4)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onOpt4Click(e) {
	var opt4 = e.control;
    // UDC 이벤트를 메인 화면(부모)으로 발송 (데이터를 함께 전달 가능)
    var event = new cpr.events.CUIEvent("userNmClick");
    
    // 이벤트 발송
    app.dispatchEvent(event);
}
