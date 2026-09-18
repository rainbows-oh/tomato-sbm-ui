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
 * 루트 컨테이너에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBodyClick(e) {
	var container = app.getContainer();
    
    // UDC 이벤트를 메인 화면(부모)으로 발송 (데이터를 함께 전달 가능)
    var event = new cpr.events.CUIEvent("cardClick");
    
    // 필요한 데이터 전달 (예: 바이크/유저 정보 또는 UDC에 세팅된 값)
    event.userData = {
        // UDC 내부 컨트롤의 값이나 바인딩된 데이터
        userId: app.lookup("opt4") ? app.lookup("opt4").value : null
    };
    
    // 이벤트 발송
    app.dispatchEvent(event);
}
