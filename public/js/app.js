const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree=document.querySelector('#message-3')
const messageFour=document.querySelector('#message-4')
const messageFive=document.querySelector('#message-5')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent='Fetching...'
    messageTwo.textContent=''

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent=data.error
                
            }else{
                messageTwo.textContent=data.location
                messageOne.textContent=data.forecast.temperature
                messageThree.textContent=data.forecast.description
                messageFour.textContent=data.forecast.windspeed
                messageFive.textContent=data.forecast.humidity

            }

        })
    })
})
