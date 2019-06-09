




const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector('#message-1')
const messagetwo=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{ 
    messageone.textContent='loading..'
messagetwo.textContent=''

    e.preventDefault()
    fetch('/weather?address='+search.value).then((response)=>{ 
response.json().then((data)=>{ 
    if(data.error){
         console.log(data.error)
         messageone.textContent=data.error
    }else{
       console.log(data.forecast)
       console.log(data.location) 
       messagetwo.textContent=data.location,
       messageone.textContent=data.forecast
    }
    })
    
})

})