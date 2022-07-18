const allLevel = Array.from(document.querySelectorAll(".level > span"))
console.log(allLevel)

allLevel.forEach( level => {
    console.log(level.dataset.day)
})
function getMaximum(array){
    let maximum = array[0].amount
    array.filter(ele => {
        if(ele.amount > maximum){
            maximum = ele.amount
        }
    })
    return maximum;
}
// console.log(getMaximum(array))
async function getData(){
    const response = await fetch('data.json')
    // console.log(response.json())
    const array = await response.json()
    // console.log(array)
    let max = getMaximum(array)
    // console.log(getMaximum(array))
    allLevel.forEach(level => {
        // console.log(level)
        array.forEach(element => {
            if(level.dataset.day === element.day){
                // console.log(element.day === level.dataset.day )
                // console.log(element.amount)
                createTooltip(level, element.amount)
                level.style.height = `${(element.amount * 150 ) / max}px`
            }
 
        })
    })
 ;
}

function createTooltip(level, text){
    const span = document.createElement("span");
    span.className = 'tooltip';
    span.innerText = `$${text}`
    level.appendChild(span);
}

getData().catch(
    error => {
        console.log('The catched error is ' + error)
    }  
)