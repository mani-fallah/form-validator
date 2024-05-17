const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const changeMode = document.getElementById('modeIcon');
const body = document.body;
const container = document.querySelector('.container');
const title = document.querySelector('h2');
const inputs = document.getElementsByClassName('formControl')

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

changeMode.addEventListener('click',()=>{
    if(changeMode.classList.contains('fa-sun'))
    {
        changeMode.classList.remove('fa-sun')
        changeMode.classList.add('fa-moon')
        body.classList.remove('light')
        body.classList.add('dark')
        title.style.color = 'white'
        container.classList.remove('light')
        container.classList.add('dark')
        for (let i =0;i< inputs.length;i++)
        {
            let item = inputs[i].childNodes[3]
            item.classList.add('dark')
        }

    }
    else
    {
        changeMode.classList.remove('fa-moon')
        changeMode.classList.add('fa-sun')
        body.classList.remove('dark')
        body.classList.add('light')
        container.classList.add('light')
        container.classList.remove('dark')
        title.style.color = 'black'
        for (let i =0;i< inputs.length;i++)
        {
            let item = inputs[i].childNodes[3]
            item.classList.remove('dark')
        }
    }
})

