var firebaseRef;
var patientsRef;
var dropdownRef;

//Data organization CONSTANTS
var FIRSTNAME =  "FirstName";
var LASTNAME =  "LastName";
var MIDDLENAME =  "MiddleName";
var GENDER =  "Gender";
var PATIENTCREATED_LOG = "Patient Created on: ";
var NOTES = "Notes"
var NOTE ="Note";
var FIRST_AND_LAST_NAME = "FirstAndLastName";
var PHONE ="Note";
var EMERGENCYCONTACT ="EmergencyContact";
var PREFERREDLANGUAGE ="Note";
var HOSPITAL = "Hospital";
var HOSPITALCITY = "HospitalCity"
var DATEOFDIAGNOSIS = "DateOfDiagnosis";
var DIAGNOSIS = "Diagnosis";
var STATUSOFDIAGNOSIS = "StatusOfDiagnosis"

var NAME = "Name";
var EMAIL = "Email";
var CELLPHONE = "CellPhone";
var HOMEPHONE = "HomePhone";
var ZIPCODE = "ZipCode";
var CREATEDDATE = "CreatedDate";
var EMER_CONTACT_NAME="Emergency_Contact_Name";
var EMER_CONTACT_RELATION = "Emergency_Contact_Relationship";
var EMER_CONTACT_PHONE = "Emergency_Contact_Phone";
var DOCTOR = "Doctor";
var DOCTOR_NAME = "DoctorName";
var DOB = "DOB";





initializeFirebase();

function addPatientToDB(firstName, lastName, middleName, gender, zip,
                        dateCreated, eName, ePhone, eRelation, hospitalName, diagnosis, dStatus, dDate,homePhone,cellPhone,email,hospitalCity,dob) {
    var createdLogMessage = PATIENTCREATED_LOG + new Date();


    var patient =  {};
    patient[FIRSTNAME] = firstName;
    patient[LASTNAME] = lastName;
    patient[MIDDLENAME] = middleName;

    patient[HOMEPHONE] = homePhone;
    patient[CELLPHONE] = cellPhone;
    patient[EMAIL] = email;

    patient[EMER_CONTACT_NAME] = eName;
    patient[EMER_CONTACT_PHONE] = ePhone;
    patient[EMER_CONTACT_RELATION] = eRelation;


    patient[HOSPITAL] = hospitalName;
    patient[HOSPITALCITY] = hospitalCity;


    patient[DOB] = dob;
    patient[GENDER] = gender;



    patient[FIRST_AND_LAST_NAME] = firstName + " " + lastName;
    patient[ZIPCODE] = zip;


    patient[DIAGNOSIS] = diagnosis;
    patient[STATUSOFDIAGNOSIS] = dStatus;
    patient[DATEOFDIAGNOSIS] = dDate;




    if(dateCreated == "" || dateCreated == 0 || dateCreated == null || dateCreated == "today")
        patient[CREATEDDATE] = getDate();
    else  {
        patient[CREATEDDATE] = dateCreated;

    }
    var temp = patientsRef.push(patient);
    var patientOID = temp.key();
    console.log(patientOID)
    addNoteToPatient(patientOID , createdLogMessage);



}
//console.log(countPatients(FIRSTNAME, "isaac"));
//countByZip("90505 30404 04952");

//editPatientInfo("-JhbL7ZCF1utt7iV02qJ", FIRSTNAME, "isaac")
//addPatientToDB("isaac", "siegel", "clifton", "M");
//addPatientToDB("bob", "siegel", "clifton", "M");

//addOptionToDropdown("hospitals", "Hospital 1")
//search(FIRSTNAME,"isaac");
//search(FIRST_AND_LAST_NAME, "bob siegel")

//getDate();








function initializeFirebase()
{
    firebaseRef = new Firebase('https://VIVID-HEAT-1565.firebaseio.com/');
    patientsRef = firebaseRef.child("patients");
    dropdownRef = firebaseRef.child("dropdowns");


}




function addOptionToDropdown(dropdownName, option){
    var dropdown = dropdownRef.child(dropdownName);
    dropdown.push({
        "option": option
    })
}

function addNoteToPatient(patientOID, note){
    patientRef = patientsRef.child(patientOID);

    patientRef.child(NOTES).push(note);


}

//example search(FIRSTNAME, "isaac")
function search(searchParameter, searchInput, callback2){
    console.log("Callback2"+callback2)


    patientsRef.equalTo(searchInput).once("value", function(snapshot) {

//        console.log(snapshot.val());
//        console.log(Object.keys(snapshot.val()))
        //console.log("Inside search(): "+ snapshot.val())

        console.log(snapshot.val())
        callback2(snapshot);

        return snapshot.val();
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}




// Date-> 2015 01 01 TIME-> 21 30
//  201,501,012,130
function getDate(){
    var date = new Date();
    var currentTime = date.getFullYear() * 100000000;
    currentTime += (date.getMonth() + 1) * 1000000;
    currentTime += (date.getDay() + 1) * 10000;
    currentTime += date.getHours() * 100;
    currentTime += date.getMinutes();
    return currentTime
}

function convertDateIntoLarge(year,month, day, hours, minutes){
    var currentTime = year * 100000000;
    currentTime += month + 1 * 1000000;
    currentTime += day + 1 * 10000;
    currentTime += hours * 100;
    currentTime += minutes;
    return currentTime
}


function initiateSearch(callback){

    var first = $("#FirstNameInput").val();
    var last = $("#LastNameInput").val();

    var result;

    if (first != "" && last != ""){
        //Use combined name for search
        result = search(FIRST_AND_LAST_NAME, first + " " + last, callback);
    }
    else if (first == "") {
        //Use last name for search
        result = search(LASTNAME, last, callback);
    }
    else if (last == "") {
        //Use first name for search
        result = search(FIRSTNAME, first, callback);

    }
    else{
        alert("Invalid Search")
    }
    console.log("From initiateSearch()"+result)
    return result;


}

//example editPatientInfo("-JhbL7ZCF1utt7iV02qJ", FIRSTNAME, "isaac")
function editPatientInfo(patientOID, attributeToChange, newValue){
      console.log(attributeToChange)
    var newObject =  {};
    newObject[attributeToChange] = newValue;

    var ref = patientsRef.child(patientOID);
    ref.update(newObject);
}

function getPatientInfo(patientOID, callback){

    patientsRef.child(patientOID).once("value", function(snapshot) {



        //console.log(snapshot.val())
        callback(snapshot.val());

        return snapshot.val();

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}

function getAllPatients(callback){
    console.log("yjyj")
    patientsRef.orderByChild(CREATEDDATE).once("value", function(snapshot) {


        console.log("from getAllPatients:")
        console.log(snapshot.val())
        callback(snapshot.val());

        return snapshot.val();

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

}

//function testFunction(patientOID){
//    angular.element($("[ng-controller='itemsController']")).scope().controller.switchToPatientInfoView(patientOID)
//    //angular.element(document.getElementById('controllerID')).scope().controller.switchToPatientInfoView(patientOID);
//
//}
//
//function testFunction(patientOID) {
//    alert("a");
//    var scope = angular.element($("#controllerID")).scope();
//    scope.$apply(function(){
//        scope.selection = "patientInfoView";
//
//        getPatientInfo(patientOID, function(result){
//            scope.selectedPatient = result;
//            console.log("hey there")
//
//            //Causes view to update
//            scope.$apply(function(){
//            })
//
//        });
//
//
//    })
//}


function generateZip(){
    return Math.floor(Math.random()*90000) + 10000;

}

//firstName, lastName, middleName, gender, zip,
//dateCreated, eName, ePhone, eRelation, hospitalName, diagnosis, dStatus, dDate,homePhone,cellPhone,email,hospitalCity,dob
function createDummy(x){

    var names = [ "Zack ", "Mike ", "Elliot ", "Arushi ", "Isaac ", "Chris ", "David ", "Angie ", "Reece ", "Charles ", "Carl ", "Joe ", "Peter ", "Jacqueline ", "Stephanie ", "Sean ", "Cheston ", "Jake ", "Ryan ", "Riley ", "Tom ", "Cameron ", "Jennifer ", "Brad ", "Stuart ", "George ", "Julia ", "Tina ", "Ted ", "Marshall ", "Lily ", "Barney ", "Robin ", "Rachel ", "Monica ", "Chandler ", "Joey ", "Pheobe ", "Ross ", "Gunther ", "Susan ", "Sarah ", "Lia"];
    for (var i = 0; i< x;i++) {
        addPatientToDB(names[Math.floor(Math.random() * 6) + 1], names[Math.floor(Math.random() * 6) + 1], names[Math.floor(Math.random() * 6) + 1], "M", 90502+ Math.floor(Math.random() * 6) + 1,
            "", names[Math.floor(Math.random() * 6) + 1], 3109383828, "Brother", "Little comp of mary", "Tumor", "Newly Diagnosed", new Date(),310303033,302340404,"john@appleseed.com","Santa Monica","01012014");


    }

}







