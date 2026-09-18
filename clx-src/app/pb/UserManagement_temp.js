/*******************************************************************************
 * Business Category :
 * Screen ID : UserManagement.js
 * Screen Name : 
 * Created Date :  2026. 9. 15. 오전 11:38:50
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
 /**
 * [선제 디버깅 로그] 생성된 데이터셋 건수 및 Column 존재 여부 확인
 */
function debugDataSetInit(ds) {
	console.log("========== [DATASET INIT DEBUG] ==========");
	console.log("[DEBUG 1] DataSet ID:", ds ? ds.id : "NULL");
	console.log("[DEBUG 2] Total Row Count:", ds ? ds.getRowCount() : 0);
	if (ds && ds.getRowCount() > 0) {
		console.log("[DEBUG 3] Row 0 Data Sample:", ds.getRowData(0));
	}
	console.log("==========================================");
}

/**
 * 8건의 더미 데이터를 생성하여 데이터셋에 빌드
 * @param {cpr.core.AppInstance} app - 앱 인스턴스
 * @returns {cpr.data.DataSet} 생성된 데이터셋 객체
 */
function createDummyDataSet(app) {
	var ds = new cpr.data.DataSet("dsUser");
	ds.parseData({
		"columns": [
			{"name": "userId", "dataType": "string"},
			{"name": "userName", "dataType": "string"},
			{"name": "email", "dataType": "string"},
			{"name": "telephone", "dataType": "string"},
			{"name": "mobile", "dataType": "string"},
			{"name": "fax", "dataType": "string"},
			{"name": "regDate", "dataType": "string"},
			{"name": "status", "dataType": "string"}
		]
	});
	app.register(ds);
	
	// 8건 더미 데이터 세팅
	var dummyData = [
		{ userId: "r.diaz", userName: "Ramon T. Diaz", email: "john.reyes@pse.com", telephone: "+63 918 234 5678", mobile: "+63 918 234 5678", fax: "+63 918 234 5678", regDate: "08-25-2026", status: "S" },
		{ userId: "m.santos", userName: "Maria Santos", email: "maria.santos@pse.com", telephone: "+63 917 111 2233", mobile: "+63 917 111 2233", fax: "+63 917 111 2233", regDate: "08-26-2026", status: "A" },
		{ userId: "j.cruz", userName: "Juan Cruz", email: "juan.cruz@pse.com", telephone: "+63 919 333 4455", mobile: "+63 919 333 4455", fax: "+63 919 333 4455", regDate: "08-27-2026", status: "S" },
		{ userId: "a.reyes", userName: "Ana Reyes", email: "ana.reyes@pse.com", telephone: "+63 920 555 6677", mobile: "+63 920 555 6677", fax: "+63 920 555 6677", regDate: "08-28-2026", status: "P" },
		{ userId: "l.gonzales", userName: "Luis Gonzales", email: "luis.gonzales@pse.com", telephone: "+63 921 777 8899", mobile: "+63 921 777 8899", fax: "+63 921 777 8899", regDate: "08-29-2026", status: "A" },
		{ userId: "c.torres", userName: "Clara Torres", email: "clara.torres@pse.com", telephone: "+63 922 999 0011", mobile: "+63 922 999 0011", fax: "+63 922 999 0011", regDate: "08-30-2026", status: "S" },
		{ userId: "p.mendoza", userName: "Pedro Mendoza", email: "pedro.mendoza@pse.com", telephone: "+63 923 222 3344", mobile: "+63 923 222 3344", fax: "+63 923 222 3344", regDate: "08-31-2026", status: "P" },
		{ userId: "e.aquino", userName: "Elena Aquino", email: "elena.aquino@pse.com", telephone: "+63 924 444 5566", mobile: "+63 924 444 5566", fax: "+63 924 444 5566", regDate: "09-01-2026", status: "A" }
	];

	ds.build(dummyData);
	
	// 선제 디버깅 실행
	debugDataSetInit(ds);

	return ds;
}
 
/*******************************************************************************
 * Automatically Generated Event JavaScript Functions
 * (Event functions are automatically displayed below when events are created.)
 *******************************************************************************/


/*
 * 루트 컨테이너에서 load 이벤트 발생 시 호출.
 * 앱이 최초 구성된후 최초 랜더링 직후에 발생하는 이벤트 입니다.
 */
function onBodyLoad(e) {
// 1. FormLayout이 적용될 부모 그룹(Container) 가져오기
	var targetGroup = app.lookup("grpCard");

	// 1. 8건 더미 데이터셋 생성
	var dsUser = createDummyDataSet(app);

	// 4열로 만들고 싶을 때
	util.FreeForm.createDynamicUdcForm(targetGroup, dsUser, "udc.com.udcComUserCard_temp", {
        columnCount: 3,         // 3열 배치
        rowHeight: "1fr",     // 카드 고정 높이
        onCardClick: function(userData) {
            // 카드를 클릭했을 때 각 화면별 개별 로직 수행
            console.log("선택된 사용자 데이터:", userData);
        }
    });
}

/*
 * 사용자 정의 컨트롤에서 cardClick 이벤트 발생 시 호출.
 */
function onUsercard1CardClick(e) {
	var usercard1 = e.control;
	debugger;
}
