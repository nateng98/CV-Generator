// JQuery
// jquery from repeater: use for repeatedly delete or add more input from users
// For those who do not understand this, I provide some explaination within lines of code

// depends on which version of jquery you are using, syntax can be slightly different
// $(document).ready(function() {   <-------for older version
$(function () {   // make sure that the page is fully loaded before executing any scripts
  $('.repeater').repeater({   // select all class repeater and apply repeater fuction to them
    initEmpty: false,
    defaultValues: {        // default input is empty string
      'text-input': ''
    },
    show: function () {        // when this is called ([+] button), the input element will drop down
      $(this).slideDown();// with slidedown animation
    },
    hide: function (deleteElement) {  // when this is called ([x] button), the input element will disappear
      $(this).slideUp(deleteElement); // with slideup animation
      setTimeout(() => {  // there will be delay of 500ms and call function generateCV()
        generateCV();
      }, 500);
    },
    isFirstItemUndeletable: true    // repeater plugin that says the first input element cannot be deleted
  })
})

// tranfering user input to preview side
// regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // containing only letters
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// supports following number formats - (123) 456-7890, (123)456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, 075-63546725
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const digitRegex = /^\d+$/;

const mainForm = document.getElementById('cv-form');
const validType = {
  TEXT: 'text',
  TEXT_EMP: 'text_emp',
  EMAIL: 'email',
  DIGIT: 'digit',
  PHONENO: 'phoneno',
  ANY: 'any',
}

// user inputs elements
let firstnameElem = mainForm.firstname,
  middlenameElem = mainForm.middlename,
  lastnameElem = mainForm.lastname,
  imageElem = mainForm.image,
  designationElem = mainForm.designation,
  addressElem = mainForm.address,
  emailElem = mainForm.email,
  phonenoElem = mainForm.phoneno,
  summaryElem = mainForm.summary;

// display elements
let nameDsp = document.getElementById('fullname_dsp'),
  imageDsp = document.getElementById('image_dsp'),
  phonenoDsp = document.getElementById('phoneno_dsp'),
  emailDsp = document.getElementById('email_dsp'),
  addressDsp = document.getElementById('address_dsp'),
  designationDsp = document.getElementById('designation_dsp'),
  summaryDsp = document.getElementById('summary_dsp'),
  projectsDsp = document.getElementById('projects_dsp'),
  achievementsDsp = document.getElementById('achievements_dsp'),
  skillsDsp = document.getElementById('skills_dsp'),
  educationsDsp = document.getElementById('educations_dsp'),
  experiencesDsp = document.getElementById('experiences_dsp');

/* Brief explanation of  this function:
    fetchValues is JS function that retrieve data from mutiple lists of 
    nodes (represented by nodeLists) based on a set of attributes (represented 
    by attrs). It then organizes this data into an array of objects and returns it.

    `atrrs`: an array of attributes name. E.g: job title, company, location, etc.
    `...nodeLists`: a spread/rest parameter; everything else being passed to the 
                    function. E.g: user inputs of job title, company, location, etc.
*/
// first value is for the attributes and second one passes the nodelists
const fetchValues = (attrs, ...nodeLists) => {
  let elemsAttrsCount = nodeLists.length;
  let elemsDataCount = nodeLists[0].length;
  let tempDataArr = [];

  // first loop deals with the no of repeaters value
  for (let i = 0; i < elemsDataCount; i++) {
    let dataObj = {}; // creating an empty object to fill the data
    // second loop fetches the data for each repeaters value or attributes 
    for (let j = 0; j < elemsAttrsCount; j++) {
      // setting the key name for the object and fill it with data
      dataObj[`${attrs[j]}`] = nodeLists[j][i].value;
    }
    tempDataArr.push(dataObj);
  }

  return tempDataArr;
}

const getUserInputs = () => {

  // achivements 
  let achievementsTitleElem = document.querySelectorAll('.achieve_title'),
    achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

  // experiences
  let expTitleElem = document.querySelectorAll('.exp_title'),
    expOrganizationElem = document.querySelectorAll('.exp_organization'),
    expLocationElem = document.querySelectorAll('.exp_location'),
    expStartDateElem = document.querySelectorAll('.exp_start_date'),
    expEndDateElem = document.querySelectorAll('.exp_end_date'),
    expDescriptionElem = document.querySelectorAll('.exp_description');

  // education
  let eduSchoolElem = document.querySelectorAll('.edu_school'),
    eduDegreeElem = document.querySelectorAll('.edu_degree'),
    eduCityElem = document.querySelectorAll('.edu_city'),
    eduStartDateElem = document.querySelectorAll('.edu_start_date'),
    eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
    eduDescriptionElem = document.querySelectorAll('.edu_description');

  let projTitleElem = document.querySelectorAll('.proj_title'),
    projLinkElem = document.querySelectorAll('.proj_link'),
    projDescriptionElem = document.querySelectorAll('.proj_description');

  let skillElem = document.querySelectorAll('.skill');

  // event listeners for form validation
  // Brief explanation: Everytime user type in a character, validateFormData function will
  // check regex for the right input.
  firstnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
  middlenameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
  lastnameElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
  phonenoElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
  emailElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
  addressElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
  designationElem.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

  achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
  achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
  expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
  expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
  expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, "Location")));
  expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
  expEndDateElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
  expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
  eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
  eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
  eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
  eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
  eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
  eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
  projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
  projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
  projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
  skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'skill')));

  // return each of the character that users type in
  return {
    firstname: firstnameElem.value,
    middlename: middlenameElem.value,
    lastname: lastnameElem.value,
    designation: designationElem.value,
    address: addressElem.value,
    email: emailElem.value,
    phoneno: phonenoElem.value,
    summary: summaryElem.value,
    achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
    experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
    educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
    projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
    skills: fetchValues(['skill'], skillElem)
  }
};

function validateFormData(elem, elemType, elemName) {
  // checking for text string and non empty string
  if (elemType == validType.TEXT) {
    if (!strRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only text string
  if (elemType == validType.TEXT_EMP) {
    if (!strRegex.test(elem.value)) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for email
  if (elemType == validType.EMAIL) {
    if (!emailRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for phone number
  if (elemType == validType.PHONENO) {
    if (!phoneRegex.test(elem.value) || elem.value.trim().length == 0) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }

  // checking for only empty
  if (elemType == validType.ANY) {
    if (elem.value.trim().length == 0) addErrMsg(elem, elemName);
    else removeErrMsg(elem);
  }
}

// adding the invalid text
function addErrMsg(formElem, formElemName) {
  formElem.nextElementSibling.innerHTML = `${formElemName} is invalid or empty`;
}

// removing the invalid text 
function removeErrMsg(formElem) {
  formElem.nextElementSibling.innerHTML = "";
}

// show the list data
const showListData = (listData, listContainer) => {
  listContainer.innerHTML = "";
  listData.forEach(listItem => {
    let itemElem = document.createElement('div');
    itemElem.classList.add('preview-item');

    for (const key in listItem) {
      let subItemElem = document.createElement('span');
      subItemElem.classList.add('preview-item-val');
      subItemElem.innerHTML = `${listItem[key]}`;
      itemElem.appendChild(subItemElem);
    }

    listContainer.appendChild(itemElem);
  })
}

function getPhoneIcon() {
  return '<i class="fa-solid fa-phone"></i> ';
}
const displayPhone = (userData) => {
  phonenoDsp.innerHTML = getPhoneIcon() + userData.phoneno;
}

function getEmailIcon() {
  return '<i class="fa-solid fa-envelope"></i> ';
}
const displayEmail = (userData) => {
  emailDsp.innerHTML = getEmailIcon() + userData.email;
}

function getAddressIcon() {
  return '<i class="fa-solid fa-house"></i> ';
}
const displayAddress = (userData) => {
  addressDsp.innerHTML = getAddressIcon() + userData.address;
}

// change date format
function convertDates(dataArray, dateKeys) {
  // Split T so we can ignore
  var today = new Date().setHours(0,0,0,0);
  dataArray.forEach(function(obj) {
    dateKeys.forEach(function(key) {
      var selectedDate = new Date(obj[key]);

      selectedDate.setDate(selectedDate.getDate() + 1); // Add 1 day
      if (selectedDate >= today) {
        obj[key] = 'Present';
      } else {
        var month = selectedDate.toLocaleString('en-US', { month: 'long' });
        var year = selectedDate.getFullYear();
        obj[key] = month + ' ' + year;
      }

    });
  });
}

// Swap dates to use float right with worry about the order
function swapDates(dataArray, key1, key2) {
  dataArray.forEach(function(obj) {
    var temp = obj[key1];
    obj[key1] = obj[key2];
    obj[key2] = temp;
  });
}

let expDateKeysToConvert = ['exp_start_date', 'exp_end_date'];
let eduDateKeysToConvert = ['edu_start_date', 'edu_graduation_date'];

const displayCV = (userData) => {
  nameDsp.innerHTML = userData.firstname + " " + userData.middlename + " " + userData.lastname;
  designationDsp.innerHTML = userData.designation;
  summaryDsp.innerHTML = userData.summary;
  showListData(userData.projects, projectsDsp);
  showListData(userData.achievements, achievementsDsp);
  showListData(userData.skills, skillsDsp);
}

// generate CV
const generateCV = () => {
  let userData = getUserInputs();
  displayCV(userData);
}
const generatePhone = () => {
  let userData = getUserInputs();
  displayPhone(userData);
}
const generateEmail = () => {
  let userData = getUserInputs();
  displayEmail(userData);
}
const generateAddress = () => {
  let userData = getUserInputs();
  displayAddress(userData);
}
const generateExperience = () => {
  let userData = getUserInputs();
  convertDates(userData.experiences, expDateKeysToConvert);
  swapDates(userData.experiences, expDateKeysToConvert[0], expDateKeysToConvert[1]);
  showListData(userData.experiences, experiencesDsp);
}
const generateEducation = () => {
  let userData = getUserInputs();
  convertDates(userData.educations, eduDateKeysToConvert);
  swapDates(userData.educations, eduDateKeysToConvert[0], eduDateKeysToConvert[1]);
  showListData(userData.educations, educationsDsp);
}

// Delete icon if input is empty
const deleteIcon = () => {
  if (phonenoDsp.innerHTML === getPhoneIcon()) phonenoDsp.innerHTML = "";
  else if (emailDsp.innerHTML === getEmailIcon()) emailDsp.innerHTML = "";
  else if (addressDsp.innerHTML === getAddressIcon()) addressDsp.innerHTML = "";
}

function previewImage() {
  let oFReader = new FileReader();
  oFReader.readAsDataURL(imageElem.files[0]);
  oFReader.onload = function (ofEvent) {
    imageDsp.src = ofEvent.target.result;
  }
}

// print CV
function printCV() {
  // Do something
}