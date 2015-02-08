/**
 * Created with JetBrains WebStorm.
 * User: isaacsiegel
 * Date: 2/8/15
 * Time: 6:19 AM
 * To change this template use File | Settings | File Templates.
 */









function setUpView(){
    getPatientInfo(OID, function(result){
        console.log(result);
        loadTextFields(result);


    });


}

function loadTextFields(patientObj){
//    var arr = ["FirstName", "lastName", "middleName", "gender", "zip",
//        "dateCreated", "eName", "ePhone", "eRelation", "hospitalName", "diagnosis", "dStatus", "dDate"];
//    console.log("from set textfield")
//
//    console.log(patientObj)
//    var temp="";
//    for(var i = 0; i < arr.length; i++){
//        temp = "#"+ arr[i];
//        $(temp).val(patientObj.arr[i]);
//
//    }

    $("#firstName").val(patientObj.FirstName);
    $("#lastName").val(patientObj.LastName);
    $("#middleName").val(patientObj.MiddleName);

    $("#home").val(patientObj.HomePhone);
    $("#cell").val(patientObj.CellPhone);
    $("#email").val(patientObj.Email);

    $("#eName").val(patientObj.Emergency_Contact_Name);
    $("#ePhone").val(patientObj.Emergency_Contact_Phone);
    $("#relationship").val(patientObj.Emergency_Contact_Relationship);

    $("#HospitalName").val(patientObj.Hospital);
    $("#HospitalCity").val(patientObj.HospitalCity);

    $("#DOB").val(patientObj.DOB);

    $("#gender").val(patientObj.Gender);
//    $("#zip").val(patientObj.ZipCode);
//    $("#dateCreated").val(patientObj.CreatedDate);










//    $("#cell").val(patientObj.);
//    $("#").val(patientObj.);
//    $("#").val(patientObj.);


}


function save()
{
    updateAllFields()

}

$( "#saveButton" ).click(function() {
    updateAllFields()


})

function updateAllFields(){
//    $("#FirstName").val();
//     $("lastName").val();
//     $("#middleName").val();
//     $("#gender").val();
//     $("#zip").val();
//     $("#dateCreated").val();
//     $("#eName").val();
//     $("#ePhone").val();
//
//     $("#HospitalName").val();
//     $("#HospitalCity").val();
//
//     $("#DOB").val();
//     $("#gender").val();
//     $("#hospitalCity").val();


    editPatientInfo(OID,FIRSTNAME, $("#FirstName").val())

}

