console.log("used for testing");

const weatherform=document.querySelector('form');
const locationString=document.querySelector('input');
const firstPara=document.querySelector('#first');
const secondPara=document.querySelector('#second');
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('testing');
    const location= locationString.value;
    console.log(location);
    firstPara.textContent="Loading.........";
    secondPara.textContent='';
    fetch("/weather?address="+location).then(response=>{
    response.json().then(data=>{
      if(data.error){
           firstPara.textContent=data.error;
      }
      else{
      firstPara.textContent=data.forecast;
     secondPara.textContent=data.location;
      }
    })
})
})