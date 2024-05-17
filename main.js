const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// functions

function showError(input, msg) // show input Error message
{
    const formControl = input.parentElement;
    formControl.className = 'formControl error';
    const small = formControl.querySelector('small');
    small.innerText = msg
}

function checkEmail(input) // check email is valid or not
{
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   if( re.test(String(input.value.trim()).toLowerCase()))
   {
      showSuccess(input)
   }
   else
   {
    showError(input,"Email is not valid")
   }
}

function showSuccess(input) // show success outline
{
    const formControl = input.parentElement;
    formControl.className = 'formControl success';
}

function checkLength(input,min,max)
{
    if(input.value.length < min)
    {
        showError(input,`${getFieldName(input)} must be at least ${min} characters`)
    }
    else if(input.value.length > max)
    {
        showError(input,`${getFieldName(input)} must be less than ${max} characters`)
    }
    else
    {
         showSuccess(input)
    }
}


function checkRequired(inputArr) // check required fields
{
    inputArr.forEach((input)=>{
        if(input.value.trim() === '')
            showError(input, `${getFieldName(input)} is required`);
        else
            showSuccess(input);
    })
}

function getFieldName(input) // get field name
{
    return input.id.charAt(0).toUpperCase()+ input.id.slice(1);
}

function checkPasswordsMatch(input1,input2)
{
    if(input1.value !== input2.value)
    {
        showError(input2,'passwords do not match');
    }
}

// event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();


    checkRequired([username,email,password,password2]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);

})

