/*******************************************************************************
 * Business Category :
 * Screen ID : Editor.js
 * Screen Name : 
 * Created Date :  2026. 10. 31. 오후 12:12:48
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
/** 오른쪽 패널 폭 (펼침 / 접힘) */
var PANEL_COLUMNS_OPEN = ["3fr", "1fr"];
var PANEL_COLUMNS_FOLDED = ["3fr", "60px"];

/** 오른쪽 패널 접힘 여부 */
var vbPanelFolded = false;
/** 현재 떠 있는(열려 있는) 플로팅 컨트롤 */
var mcFloatOpened = null;
/** 플로팅을 연 버튼 (닫을 때 포커스 복귀용) */
var mcFloatAnchor = null;
/** 이미 floatControl 처리된 컨트롤 id 목록 */
var moFloated = {};


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
 * 오른쪽 패널의 접힘 상태에 맞춰 본문 영역(왼쪽 에디터 / 오른쪽 패널)의 컬럼 폭을 갱신한다.
 * @param {cpr.controls.Container} pcBody 에디터와 오른쪽 패널이 놓인 본문 그룹
 */
function doApplyPanelColumns(pcBody) {
	pcBody.getLayout().setColumns(vbPanelFolded ? PANEL_COLUMNS_FOLDED : PANEL_COLUMNS_OPEN);
}

/**
 * 플로팅 그룹을 앵커 버튼 아래에 열거나 닫는다. (이미 열려 있으면 닫기)
 * 한 번에 하나만 열리도록, 다른 그룹이 열려 있으면 먼저 닫는다.
 * @param {cpr.controls.Container} pcGroup 플로팅 할 그룹
 * @param {cpr.controls.UIControl} pcAnchor 그룹을 여는 버튼
 */
function doToggleFloat(pcGroup, pcAnchor) {
	var vbOpen = (mcFloatOpened === pcGroup);

	if (mcFloatOpened) {
		mcFloatOpened.visible = false;
		mcFloatOpened = null;
	}
	if (vbOpen) {
		pcAnchor.focus();
		return;
	}
	mcFloatAnchor = pcAnchor;

	var vcRoot = app.getContainer();
	var voRect = pcAnchor.getActualRect();       // 앱 루트 기준 위치
	var vnWidth = 400;
	var vnMaxLeft = vcRoot.getActualRect().width - vnWidth - 16;
	var voConstraint = {
		left: Math.max(0, Math.min(voRect.left, vnMaxLeft)) + "px",
		top: (voRect.top + voRect.height + 8) + "px",
		width: vnWidth + "px",
		height: "auto"
	};

	if (!moFloated[pcGroup.id]) {
		vcRoot.floatControl(pcGroup, voConstraint);
		moFloated[pcGroup.id] = true;
	} else {
		vcRoot.updateConstraint(pcGroup, voConstraint);
	}
	pcGroup.visible = true;
	mcFloatOpened = pcGroup;
}

/**
 * 열려 있는 플로팅 그룹을 닫고, 그룹을 열었던 버튼으로 포커스를 되돌린다.
 */
function doCloseFloat() {
	if (mcFloatOpened) {
		mcFloatOpened.visible = false;
		mcFloatOpened = null;
	}
	if (mcFloatAnchor) {
		mcFloatAnchor.focus();
		mcFloatAnchor = null;
	}
}


/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/

/*
 * 버튼에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 에러 로그 목록(두 번째 행)을 접거나 펼치고, 버튼 화살표 방향을 바꾼다.
 * 닫힘: btn-up / 열림: btn-down
 * 접근성: 상태에 맞게 버튼의 fieldLabel(대체 텍스트)도 함께 바꾼다.
 */
function onBtnShowErrorMoreClick(e) {
	var vcButton = e.control;
	var vcLayout = app.lookup("grpErrorLog").getLayout();
	var vbOpen = vcButton.style.hasClass("btn-up");

	vcLayout.setRowVisible(1, vbOpen);

	if (vbOpen) {
		vcButton.style.removeClass("btn-up");
		vcButton.style.addClass("btn-down");
		vcButton.fieldLabel = "Hide error check results";
	} else {
		vcButton.style.removeClass("btn-down");
		vcButton.style.addClass("btn-up");
		vcButton.fieldLabel = "Show error check results";
	}
}

/*
 * "Button" 버튼(btnPanelExp)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 * 오른쪽 패널을 접거나 펼친다. (펼침 3fr:1fr / 접힘 3fr:60px, 접힘 시 제목과 패널 내용 숨김)
 * 접근성: 접힘 상태에 맞춰 fieldLabel(대체 텍스트)을 바꾼다.
 */
function onBtnPanelExpClick(e) {
	var vcButton = e.control;
	var vcHeader = vcButton.getParent();
	var vcPanel = vcHeader.getParent();
	
	vbPanelFolded = !vbPanelFolded;
	
	// 접힘: 제목(첫 번째 컬럼)과 패널 내용(두 번째 행 이후)을 숨기고 컬럼 폭을 줄인다.
	vcHeader.getLayout().setColumnVisible(0, !vbPanelFolded);
	for (var i = 1; i < 4; i++) {
		vcPanel.getLayout().setRowVisible(i, !vbPanelFolded);
	}
	doApplyPanelColumns(vcPanel.getParent().getParent());
	
	// 접근성: 상태에 맞게 버튼의 fieldLabel(대체 텍스트)도 함께 바꾼다.
	vcButton.fieldLabel = vbPanelFolded ? "Expand side panel" : "Collapse side panel";
}

/*
 * "Attachments" 버튼(btnAttach)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnAttachClick(e) {
	var btnAttach = e.control;
	doToggleFloat(app.lookup("grpAttachments"), btnAttach);
}

/*
 * "Remarks" 버튼(btnRemarks)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnRemarksClick(e) {
	var btnRemarks = e.control;
	doToggleFloat(app.lookup("grpRemarks"), btnRemarks);
}

/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성되고 최초 랜더링 직후에 발생하는 이벤트 입니다.
 * 플로팅 대상(grpAttachments, grpRemarks)이 놓여 있던 영역(grpFloatContent)을 숨기고 두 그룹은 닫힌 상태로 둔다.
 */
function onBodyLoad(e) {
	app.lookup("grpAttachments").visible = false;
	app.lookup("grpRemarks").visible = false;
	app.getContainer().getLayout().setRowVisible(1, false);
}

/*
 * "Button" 버튼(btnFloatClose)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFloatCloseClick(e) {
	var btnFloatClose = e.control;
	doCloseFloat();
}

/*
 * "Button" 버튼(btnFloatClose2)에서 click 이벤트 발생 시 호출.
 * 사용자가 컨트롤을 클릭할 때 발생하는 이벤트.
 */
function onBtnFloatClose2Click(e) {
	var btnFloatClose2 = e.control;
	doCloseFloat();
}
