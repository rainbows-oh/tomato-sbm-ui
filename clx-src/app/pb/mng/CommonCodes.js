/*******************************************************************************
 * Business Category :
 * Screen ID : Roles.js
 * Screen Name : 
 * Created Date :  2026. 10. 15. 오후 5:06:27
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


/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/

/*
 * "Add Role" 버튼(btn3)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtn3Click(e) {
	var btn3 = e.control;
	
	util.Dialog.open(app, "app/pb/Role_AddRole", 500, -1, null);
}

/*
 * 루트 컨테이너에서 screen-change 이벤트 발생 시 호출.
 * 스크린 크기 변경 시 전파되는 이벤트.
 *
 * 스크린별 영역 표시 제어 (모바일: SCREEN_MOBILE_NM / PC·태블릿: 그 외)
 *  - grpContent 첫번째 열(Roles 목록) : 모바일 숨김, PC·태블릿 표시
 *  - grp1 첫번째 행(btn4, 선택된 코드 그룹 버튼) : 모바일 표시, PC·태블릿 숨김
 */
function onBodyScreenChange(e) {
	// 반응형 모듈(responsiveForm)의 레이아웃 재구성이 끝난 뒤에 적용해야 하므로 asyncExec 로 지연한다.
	cpr.core.DeferredUpdateManager.INSTANCE.asyncExec(function() {
		// 현재 스크린이 모바일인지 여부
		var vbMobile = AppProperties.SCREEN_MOBILE_NM.indexOf(app.targetScreen.name) > -1;
		
		// grpContent : 반응형(mobile-column-count) 적용 그룹이므로 레이아웃 API 대신 공통 API 사용
		util.FreeForm.setColumnVisible(app, "grpContent", 0, !vbMobile);
		
		// grp1 : 첫번째 행(btn4)은 모바일에서만 표시
		util.FreeForm.setRowVisible(app, "grp1", 0, vbMobile);
	});
}
