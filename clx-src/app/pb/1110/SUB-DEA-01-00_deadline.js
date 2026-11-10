/*******************************************************************************
 * Business Category :
 * Screen ID : deadline.js
 * Screen Name : 
 * Created Date :  2026. 11. 9. 오전 9:04:01
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

/** 패널 접힘 여부 */
var mbFolded = false;
/** 모바일 여부 (메인 화면 main.js 가 setMobileMode 로 알려줌) — 모바일에서는 최상단에 떠서 접기 대신 닫기 버튼 사용 */
var mbMobile = false;

exports.setMobileMode = setMobileMode;

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
 * 버튼(btnDeadlineExp)에서 click 이벤트 발생 시 호출.
 * 패널을 접거나 펼친다. 접힘 시 제목, 닫기 버튼, 캘린더 영역을 숨겨 btnDeadlineExp 버튼만 남기고,
 * 메인 화면(루트 앱)에 접힘 상태를 알려 deadline 영역 폭(펼침 360px / 접힘 56px)을 바꾸게 한다.
 * 접근성: 상태에 맞게 버튼의 fieldLabel(대체 텍스트)도 함께 바꾼다.
 */
function onBtnDeadlineExpClick(e) {
	var vcButton = e.control;

	/* 모바일에서는 패널이 최상단에 떠 있으므로 접기 동작 없음 (닫기 버튼 btnClose 사용) */
	if (mbMobile) return;

	mbFolded = !mbFolded;

	app.lookup("optTitle").visible = !mbFolded;
	app.lookup("grpTitle").getLayout().horizontalSpacing = mbFolded ? "0px" : "8px";
	/* 닫기 버튼(btnClose) 칸은 모바일에서만 표시 */
	app.lookup("grpHeader").getLayout().setColumnVisible(1, !mbFolded && mbMobile);
	app.getContainer().getLayout().setRowVisible(1, !mbFolded);

	/* 닫힘 상태에서만 개수 배지(.count)가 표시되도록 close 클래스로 상태를 구분
	   (헤더(grpHeader)에도 close 를 붙여 닫힘 상태의 좌우 패딩 제거/가운데 정렬 스타일을 적용) */
	if (mbFolded) {
		vcButton.style.addClass("close");
		app.lookup("grpHeader").style.addClass("close");
	} else {
		vcButton.style.removeClass("close");
		app.lookup("grpHeader").style.removeClass("close");
	}

	vcButton.fieldLabel = mbFolded ? "Expand deadline panel" : "Collapse deadline panel";

	/* 메인 화면에 포함된 경우에만 메인의 deadline 영역 폭을 변경 (단독 실행 시 제외) */
	var vcRootApp = app.getRootAppInstance();
	if (vcRootApp && vcRootApp !== app && vcRootApp.hasAppMethod("foldDeadlinePanel")) {
		vcRootApp.callAppMethod("foldDeadlinePanel", mbFolded);
	}
}

/**
 * 모바일 여부를 반영한다. 메인 화면(main.js)이 스크린 전환 시 callAppMethod("setMobileMode") 로 호출한다.
 * 모바일에서만 헤더의 닫기 버튼(btnClose) 칸을 보여준다.
 * @param {Boolean} pbMobile 모바일 여부
 */
function setMobileMode(pbMobile) {
	mbMobile = pbMobile;
	app.lookup("grpHeader").getLayout().setColumnVisible(1, pbMobile && !mbFolded);
}

/*
 * 닫기 버튼(btnClose)에서 click 이벤트 발생 시 호출. (모바일에서만 보임)
 * 최상단에 떠 있는 deadline 패널을 메인 화면(루트 앱)이 닫게 한다.
 */
function onBtnCloseClick(e) {
	var vcRootApp = app.getRootAppInstance();
	if (vcRootApp && vcRootApp !== app && vcRootApp.hasAppMethod("closeMobilePanel")) {
		vcRootApp.callAppMethod("closeMobilePanel");
	}
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
	/* 메인 화면에 포함되어 있고 이미 모바일이면 (메인이 먼저 모바일 구성을 적용한 경우) 상태를 가져와 반영 */
	var vcRootApp = app.getRootAppInstance();
	if (vcRootApp && vcRootApp !== app && vcRootApp.hasAppMethod("isMobile")) {
		setMobileMode(vcRootApp.callAppMethod("isMobile"));
	}

	var calendar = app.lookup("calDeadline");
	
	calendar.addAnniversary({date: "2026-11-13",className: "cal-urgent"});
	calendar.addAnniversary({date: "2026-11-20",className: "cal-urgent"});
}
