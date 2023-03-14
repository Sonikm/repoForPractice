// load all data when html document or page is loaded
document.onload = showData();

// Get all peopleList from local storage
function getCrudData(){
    let peopleList ;
    if(localStorage.getItem('peopleList') == null){
        peopleList = [];
    }
    else{
        peopleList = JSON.parse(localStorage.getItem('peopleList'))
    }
    return peopleList;
}

// Set all peoplist in local storage
function setCrudData(peopleList){
    localStorage.setItem('peopleList', JSON.stringify(peopleList));
}

function validateForm(){
     let name = document.getElementById('name').value;
     let age = document.getElementById('age').value;
     let address = document.getElementById('address').value;
     let email = document.getElementById('email').value;

    //  Some required and valid cases
     if(name == ''){
        alert("Name is required");
        return false;
     }

     if(age == ''){
        alert("age is required");
        return false;
     }
     else if(age < 1){
        alert("age must not be zero or less than zero");
        return false;
     }

     if(address == ""){
        alert("address is required");
        return false;
     }

     if(email == ""){
        alert("email is required");
        return false;
     }
     else if(!email.includes('@')){
        alert("Invalid email address");
        return false;
     }
     else{
        return true

     }
}

// || SHOW DATA
function showData(){

    let peopleList = getCrudData();
    let html = '';

    peopleList.forEach(function (element, index) {
        // This variable will add data in html element
        
        html += `<tr>
                     <td> ${element.name} </td> 
                     <td> ${element.age} </td> 
                     <td> ${element.address} </td> 
                     <td> ${element.email} </td> 
                     <td>
                         <button onclick="deleteData(${index})"> delete </button>
                         <button onclick="updateData(${index})"> edit </button>
                     </td>
                 </tr>`

    });

    document.querySelector('#crudTable tbody').innerHTML = html;
}

// || ADD DATA
function addData(){
    if(validateForm() == true){

        let name = document.getElementById('name').value;
        let age = document.getElementById('age').value;
        let address = document.getElementById('address').value;
        let email = document.getElementById('email').value;           
        
        let peopleList = getCrudData();

        peopleList.push({
            name : name,
            age : age,
            address : address,
            email : email
        });

        setCrudData(peopleList);
        showData();

        document.getElementById('name').value = "";
        document.getElementById('age').value = "";
        document.getElementById('address').value = "";
        document.getElementById('email').value = "";

    }
}

// Function to delete data form local storage
function deleteData(index){

    let peopleList = getCrudData();

    peopleList.splice(index, 1);
    setCrudData(peopleList);
    showData();
}

// Function to Update data in local storage
function updateData(index){

    // Submit button will hide and update button will show for updating of data in local storage
    // document.getElementById('submit').style.display = "none";
    // document.getElementById('update').style.display = "block"

    let peopleList = getCrudData();

    document.getElementById('name').value = peopleList[index].name;
    document.getElementById('age').value = peopleList[index].age;
    document.getElementById('address').value = peopleList[index].address;
    document.getElementById('email').value = peopleList[index].email;

    document.querySelector('#update').onclick = ()=>{
        if(validateForm() == true){
            peopleList[index].name = document.getElementById('name').value;
            peopleList[index].age = document.getElementById('age').value;
            peopleList[index].address = document.getElementById('address').value;
            peopleList[index].email = document.getElementById('email').value;

            setCrudData(peopleList);
            showData();

            document.getElementById('name').value = "";
            document.getElementById('age').value = "";
            document.getElementById('address').value = "";
            document.getElementById('email').value = "";
    
            // Update botton will hide and show Submit botton for adding data in local storage
        //    document.getElementById('submit').style.display = "block";
        //    document.getElementById('update').style.display = "none"

        }
    }

}