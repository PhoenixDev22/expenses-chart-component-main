const allLevel = Array.from(document.querySelectorAll(".level > span"))


// console.log(getMaximum(array))
async function getData(){
    const response = await fetch('data.json')
    // console.log(response.json())
    const array = await response.json()
    // console.log(array)
    let max = getMaximum(array)

    allLevel.forEach(level => {
        array.forEach(element => {
            if(level.dataset.day === element.day){
                setHeight(level,element.amount, max)
                if(element.amount === max){
                    level.classList.add("cyan")
                }
            }
        })
    })

    allLevel.forEach(level => {
        level.addEventListener("mouseenter", (e) => {
            console.log(e.currentTarget)
            array.forEach(element => {
                if(e.currentTarget.dataset.day === element.day){
                    createTooltip(e.currentTarget, element.amount)  
                }
            })
        })
        level.addEventListener("mouseleave", (e) => {
            document.querySelector('.tooltip').remove()  
        }) 
    })
}
// Getting the maximum amount in the object
function getMaximum(array){
    let maximum = array[0].amount
    array.filter(ele => {
        if(ele.amount > maximum){
            maximum = ele.amount
        }
    })
    return maximum;
}
// Creating the tooltip abpve the level graph
function createTooltip(level, text){
    const tooltip = document.createElement("p");
    tooltip.className = 'tooltip';
    tooltip.innerText = `$${text}`
    level.appendChild(tooltip);
}
// set the height of each day
function setHeight(level,amount, max){
    level.style.height = `${(amount * 150 ) / max}px`
}
// catch error
getData().catch(
    error => {
        console.log('The catched error is ' + error)
    }  
)