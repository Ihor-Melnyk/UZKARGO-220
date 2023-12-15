function setPropertyRequired(attributeName, boolValue = true) {
  //обов"язкове
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.required = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyHidden(attributeName, boolValue = true) {
  //приховане
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.hidden = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setPropertyDisabled(attributeName, boolValue = true) {
  //недоступне
  var attributeProps = EdocsApi.getControlProperties(attributeName);
  attributeProps.disabled = boolValue;
  EdocsApi.setControlProperties(attributeProps);
}

function setAttrValue(attributeCode, attributeValue) {
  var attribute = EdocsApi.getAttributeValue(attributeCode);
  attribute.value = attributeValue;
  EdocsApi.setAttributeValue(attribute);
}

//Скрипт 1. Автоматичне визначення email ініціатора рахунку та підрозділу
function onCreate() {
  EdocsApi.setAttributeValue({
    code: "Branch",
    value: EdocsApi.getOrgUnitDataByUnitID(
      EdocsApi.getEmployeeDataByEmployeeID(CurrentDocument.initiatorId).unitId,
      1
    ).unitId,
    text: null,
  });
}

function onSearchBranch(searchRequest) {
  searchRequest.filterCollection.push({
    attributeCode: "SubdivisionLevelDirect",
    value: "1",
  });
}

function onCardInitialize() {
  DefinitionAgreeableTask();
  EnterResultsTask();
  //RegisterActTask();
}
//Скрипт 2. Зміна властивостей атрибутів та автоматичне визначення email ініціатора
function DefinitionAgreeableTask() {
  debugger;
  var stateTask = EdocsApi.getCaseTaskDataByCode("DefinitionAgreeable")?.state;

  if (
    stateTask == "assigned" ||
    stateTask == "inProgress" ||
    stateTask == "delegated"
  ) {
    setPropertyRequired("SubjectAct");
    setPropertyRequired("VisaHolder");
    setPropertyRequired("OrgRPEmail");
    setPropertyRequired("StructureDepart");
    setPropertyRequired("ContractorRPEmail");
    setPropertyRequired("DocKind");
    setPropertyHidden("SubjectAct", false);
    setPropertyHidden("VisaHolder", false);
    setPropertyHidden("OrgRPEmail", false);
    setPropertyHidden("StructureDepart", false);
    setPropertyHidden("ContractorRPEmail", false);
    setPropertyHidden("DocKind", false);
    setPropertyDisabled("SubjectAct", false);
    setPropertyDisabled("VisaHolder", false);
    setPropertyDisabled("OrgRPEmail", false);
    setPropertyDisabled("StructureDepart", false);
    setPropertyDisabled("DocKind", false);
    setPropertyDisabled("ContractorRPEmail", false);

    EdocsApi.setAttributeValue({
      code: "OrgRPEmail",
      value: EdocsApi.getEmployeeDataByEmployeeID(CurrentDocument.initiatorId)
        .email,
      text: null,
    });
  } else if (stateTask == "completed") {
    setPropertyRequired("SubjectAct");
    setPropertyRequired("VisaHolder");
    setPropertyRequired("DocKind");
    setPropertyRequired("OrgRPEmail");
    setPropertyRequired("StructureDepart");
    setPropertyRequired("ContractorRPEmail");
    setPropertyHidden("SubjectAct", false);
    setPropertyHidden("VisaHolder", false);
      setPropertyHidden("DocKind", false);
    setPropertyHidden("OrgRPEmail", false);
    setPropertyHidden("StructureDepart", false);
    setPropertyHidden("ContractorRPEmail", false);
    setPropertyDisabled("SubjectAct");
    setPropertyDisabled("VisaHolder");
    setPropertyDisabled("OrgRPEmail");
    setPropertyDisabled("DocKind");
    setPropertyDisabled("StructureDepart");
    setPropertyDisabled("ContractorRPEmail");
  } else {
    setPropertyRequired("SubjectAct", false);
    setPropertyRequired("VisaHolder", false);
    setPropertyRequired("OrgRPEmail", false);
    setPropertyRequired("StructureDepart", false);
    setPropertyRequired("ContractorRPEmail", false);
    setPropertyRequired("DocKind", false);
    setPropertyHidden("SubjectAct");
    setPropertyHidden("VisaHolder");
    setPropertyHidden("OrgRPEmail");
    setPropertyHidden("StructureDepart");
    setPropertyHidden("ContractorRPEmail");
    setPropertyHidden("DocKind");
    setPropertyDisabled("SubjectAct", false);
    setPropertyDisabled("VisaHolder", false);
    setPropertyDisabled("OrgRPEmail", false);
    setPropertyDisabled("StructureDepart", false);
    setPropertyDisabled("DocKind", false);
    setPropertyDisabled("ContractorRPEmail", false);
  }
}

function onTaskExecuteDefinitionAgreeable(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    if (!EdocsApi.getAttributeValue("SubjectAct").value)
      throw `Внесіть значення в поле "Предмет акту"`;
    if (!EdocsApi.getAttributeValue("VisaHolder").value)
      throw `Внесіть значення в поле "погоджуючі"`;
    if (!EdocsApi.getAttributeValue("OrgRPEmail").value)
      throw `Внесіть значення в поле "email контактної особи Організації"`;
    if (!EdocsApi.getAttributeValue("ContractorRPEmail").value)
      throw `Внесіть значення в поле "email контактної особи Замовника"`;
  }
}

//Скрипт 3. Зміна властивостей атрибутів

function onTaskExecutedAddProtocol(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    EnterResultsTask();
  }
}

function EnterResultsTask() {
  debugger;
  var stateTask = EdocsApi.getCaseTaskDataByCode("EnterResults")?.state;

  if (
    stateTask == "assigned" ||
    stateTask == "inProgress" ||
    stateTask == "delegated"
  ) {
    setPropertyRequired("ActMeetingResult");
    setPropertyRequired("Number");
    setPropertyRequired("DateProtocol");
    setPropertyHidden("ActMeetingResult", false);
    setPropertyHidden("Number", false);
    setPropertyHidden("DateProtocol", false);
    setPropertyDisabled("ActMeetingResult", false);
    setPropertyDisabled("Number", false);
    setPropertyDisabled("DateProtocol", false);
  } else if (stateTask == "completed") {
    setPropertyRequired("ActMeetingResult");
    setPropertyRequired("Number");
    setPropertyRequired("DateProtocol");
    setPropertyHidden("ActMeetingResult", false);
    setPropertyHidden("Number", false);
    setPropertyHidden("DateProtocol", false);
    setPropertyDisabled("ActMeetingResult");
    setPropertyDisabled("Number");
    setPropertyDisabled("DateProtocol");
  } else {
    setPropertyRequired("ActMeetingResult", false);
    setPropertyRequired("Number", false);
    setPropertyRequired("DateProtocol", false);
    setPropertyHidden("ActMeetingResult");
    setPropertyHidden("Number");
    setPropertyHidden("DateProtocol");
    setPropertyDisabled("ActMeetingResult", false);
    setPropertyDisabled("Number", false);
    setPropertyDisabled("DateProtocol", false);
  }
}

function onChangeActMeetingResult() {
  if (EdocsApi.getAttributeValue("ActMeetingResult").value == "Погоджено") {
    var stateTask = EdocsApi.getCaseTaskDataByCode("EnterResults")?.state;
    if (
      stateTask == "assigned" ||
      stateTask == "inProgress" ||
      stateTask == "delegated"
    ) {
      EdocsApi.message(
        `Замовнику на підпис будуть відправлені тільки зафіксовані файли. Перевірте наявність позначки «Фіксується» тільки у тих файлах, які необхідно відправити Замовнику. 
Для інших файлів дана позначка має бути відсутня.`
      );
    }
  }
}

function onTaskExecuteEnterResults(routeStage) {
  debugger;
  if (routeStage.executionResult == "executed") {
    if (!EdocsApi.getAttributeValue("ActMeetingResult").value)
      throw `Внесіть значення в поле "Результат розгляду акту засіданням"`;
    if (!EdocsApi.getAttributeValue("Number").value)
      throw `Внесіть значення в поле "Номер"`;
  }
}



//Скрипт 5. Визначення ролі за розрізом
function setSections() {
  debugger;
  var Branch = EdocsApi.getAttributeValue("Branch");
  if (Branch.value) {
    var Sections = EdocsApi.getAttributeValue("Sections");
    var BranchData = EdocsApi.getOrgUnitDataByUnitID(Branch.value);
    if (Sections.value != BranchData.unitName) {
      Sections.value = BranchData.unitName;
      EdocsApi.setAttributeValue(Sections);
    }
  }
}

function onChangeBranch() {
  setSections();
}

function onBeforeCardSave() {
  setSections();
}

//Скрипт 6. Передача наказу для ознайомлення  в зовнішню систему
// Відправлення на підпис в зовнішній сервіс eSign договору
//-------------------------------
function setDataForESIGN() {
  debugger;
  var registrationDate = EdocsApi.getAttributeValue("DateProtocol").value;
  var registrationNumber = EdocsApi.getAttributeValue("Number").value;
  var caseType = EdocsApi.getAttributeValue("DocType").value;
  var caseKind = EdocsApi.getAttributeValue("DocKind").text;
  var name = "";
  if (caseKind) {
    name += caseKind;
  } else {
    name += caseType;
  }
  name +=
    " №" +
    (registrationNumber ? registrationNumber : CurrentDocument.id) +
    (!registrationDate
      ? ""
      : " від " + moment(registrationDate).format("DD.MM.YYYY"));
  doc = {
    DocName: name,
    extSysDocId: CurrentDocument.id,
    ExtSysDocVersion: CurrentDocument.version,
    docType: "ActCommission",
    docDate: registrationDate,
    docNum: registrationNumber,
    File: "",
    parties: [
      {
        taskType: "ToSign",
        taskState: "Done",
        legalEntityCode: EdocsApi.getAttributeValue("OrgCode").value,
        contactPersonEmail: EdocsApi.getAttributeValue("OrgRPEmail").value,
        signatures: [],
      },
      {
        taskType: "ToSign",
        taskState: "NotAssigned",
        legalEntityCode: EdocsApi.getAttributeValue("ContractorCode").value,
        contactPersonEmail:
          EdocsApi.getAttributeValue("ContractorRPEmail").value,
        expectedSignatures: [],
      },
    ],
    additionalAttributes: [
      {
        code: "docDate",
        type: "dateTime",
        value: registrationDate,
      },
      {
        code: "docNum",
        type: "string",
        value: registrationNumber,
      },
    ],
    sendingSettings: {
      attachFiles: "fixed", //, можна також встановлювати 'firstOnly' - Лише файл із першої зафіксованої вкладки(Головний файл), або 'all' - всі файли, 'fixed' - усі зафіксовані
      attachSignatures: "signatureAndStamp", // -'signatureAndStamp'Типи “Підпис” або “Печатка”, можна також встановити 'all' - усі типи цифрових підписів
    },
  };
  EdocsApi.setAttributeValue({ code: "JSON", value: JSON.stringify(doc) });
}

function onTaskExecuteSendOutDoc(routeStage) {
  debugger;
  if (routeStage.executionResult == "rejected") {
    return;
  }
  setDataForESIGN();
  var idnumber = EdocsApi.getAttributeValue("DocId");
  var methodData = {
    ExtSysDocVersion: CurrentDocument.version,
    extSysDocId: idnumber.value,
  };

  routeStage.externalAPIExecutingParams = {
    externalSystemCode: "ESIGN1", // код зовнішньої системи
    externalSystemMethod: "integration/importDoc", // метод зовнішньої системи
    data: methodData, // дані, що очікує зовнішня система для заданого методу
    executeAsync: true, // виконувати завдання асинхронно
  };
}

function onTaskCommentedSendOutDoc(caseTaskComment) {
  debugger;
  var orgCode = EdocsApi.getAttributeValue("OrgCode").value;
  var orgShortName = EdocsApi.getAttributeValue("OrgShortName").value;
  if (!orgCode || !orgShortName) {
    return;
  }
  var idnumber = EdocsApi.getAttributeValue("DocId");
  var methodData = {
    extSysDocId: idnumber.value,
    ExtSysDocVersion: CurrentDocument.version,
    eventType: "CommentAdded",
    comment: caseTaskComment.comment,
    partyCode: orgCode,
    userTitle: CurrentUser.name,
    partyName: orgShortName,
    occuredAt: new Date(),
  };

  caseTaskComment.externalAPIExecutingParams = {
    externalSystemCode: "ESIGN1", // код зовнішньої системи
    externalSystemMethod: "integration/processEvent", // метод зовнішньої системи
    data: methodData, // дані, що очікує зовнішня система для заданого методу
    executeAsync: true, // виконувати завдання асинхронно
  };
}

function onChangeStructureDepart() {
  debugger;
  var StructureDepart = EdocsApi.getAttributeValue("StructureDepart").value;
  if (StructureDepart) {
    var data = EdocsApi.findElementByProperty(
      "id",
      StructureDepart,
      EdocsApi.getDictionaryData("Commission")
    ).code; //беремо значення із довідника "StructureDepart" та шукаємо значення в довіднику "Commission"
    setEmployees(data);
  }
}
function setEmployees(data) {
  debugger;
  if (data) {
    const array = data.split(", ");
    var employeeText = null;
    var employee = [];
    for (let index = 0; index < array.length; index++) {
      var employeeById = EdocsApi.getEmployeeDataByEmployeeID(array[index]);
      if (employeeById) {
        employee.push({
          id: 0,
          employeeId: employeeById.employeeId,
          index: index, //потрібно збільшувати на 1
          employeeName: employeeById.shortName,
          positionName: employeeById.positionName,
        });

        employeeText
          ? (employeeText =
              employeeText +
              "\n" +
              employeeById.positionName +
              "\t" +
              employeeById.shortName)
          : (employeeText =
              employeeById.positionName + "\t" + employeeById.shortName);
        employeesValue = `[{"id":0,"employeeId":"${employeeById.employeeId}","index":0,"employeeName":"${employeeById.shortName}","positionName":"${employeeById.positionName}"}]`;
      }
    }
    EdocsApi.setAttributeValue({
      code: "VisaHolder",
      value: JSON.stringify(employee),
      text: employeeText,
    });
  }
}

function onChangeHeadCommission() {
  var HeadCommission = EdocsApi.getAttributeValue("HeadCommission").value;
  if (HeadCommission) {
    var employee = EdocsApi.getEmployeeDataByEmployeeID(Number(HeadCommission));
    EdocsApi.setAttributeValue({
      code: "Position",
      value: employee.positionName,
    });
    EdocsApi.setAttributeValue({
      code: "TelephoneCus",
      value: employee.phone,
    });
  } else {
    EdocsApi.setAttributeValue({
      code: "Position",
      value: "",
    });
    EdocsApi.setAttributeValue({
      code: "TelephoneCus",
      value: "",
    });
  }
}