// buttons 
const runBtn = document.querySelector('#run-btn');
const resetBtn = document.querySelector('.reset-btn');
const rightArrowBtn = document.querySelector('.fa-chevron-right');
const leftArrowBtn = document.querySelector('.fa-chevron-left');
const runBtnFilter = document.querySelector('.filter-active')

//containers
const outputArray = document.querySelector('.output-array');
const inputArray = document.querySelector('.input-array');
const mapActive = document.getElementsByClassName('map-active');
const typeMethod = document.querySelector('.type');
const buttonContainer = document.querySelector('.button-container');

//items
const boxTwo = document.querySelector('.box-2');
const boxes = document.querySelectorAll('.item');
const boxesArray = Array.from(boxes);

//Event Listeners
// runBtn.addEventListener('click', moveElements);
resetBtn.addEventListener('click', reset);

//left arrow needed running the same switchMethods
rightArrowBtn.addEventListener('click', switchMethods);
buttonContainer.addEventListener('click', execute);

//global variables 
let hasSimulatorRan = false;
let isSimulatorRunning = false;
let ArrayCounter_MethodsArray = 0;

console.log(mapActive.length); // return 1 means active, return 0 means inactive
const methodsArray = [{type: 'map(square => square)', buttonClass: 'map-active'}, {type: 'filter(square)', buttonClass: 'filter-active'} ];
const filterArray = [{className: 'item box-1'}, {className: 'item box-2'}, {className: 'item box-3 circle'}, {className: 'item box-4'}];

//load the first data from MethodsArray & increase ArrayCounter_MethodsArray by one 
window.addEventListener('load', (event) => {
    typeMethod.innerText = methodsArray[ArrayCounter_MethodsArray].type;
    runBtn.classList.add(`${methodsArray[ArrayCounter_MethodsArray].buttonClass}`);
    console.log(methodsArray[ArrayCounter_MethodsArray].buttonClass)
    // console.log()
    ArrayCounter_MethodsArray++;
  });

function execute(e){
    let buttonClassName = e.target.classList.value;
    console.log(buttonClassName);

    //change this to a switch statement 
    if(buttonClassName === 'map-active'){
        executeMap();
        console.log('it freaking worked');
        return
    }else if(buttonClassName === 'filter-active'){
        executeFilter();
        return
    }
    
}


function switchMethods(){
    typeMethod.innerText = methodsArray[ArrayCounter_MethodsArray].type;
    runBtn.classList.remove('map-active');
    runBtn.classList.add(`${methodsArray[ArrayCounter_MethodsArray].buttonClass}`)
    

    //delete everything that there, 
    const boxes =  document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);

    boxesArray.forEach((box)=>{
        //remove everything 
        box.remove();
    });

    switch (ArrayCounter_MethodsArray){
        case 0:
            setupMap();
            break;
        case 1:
            setupFilter();
            break;
        case 2:
            setupFindIndex();
            break;
        default:
            
    }
    ArrayCounter_MethodsArray++;
    //create the proper items needed based on 'active' that is selected
    //switch run btn & reset button 
}   

function setupFindIndex(){

}

function setupFilter(){
    //create what I need to replace it. 
    for(let i = 0; i < filterArray.length; i++){
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${filterArray[i].className}`);
        inputArray.append(newElement);
    }

}

function setupMap(){

}

function executeMap(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);
    if(hasSimulatorRan === false && isSimulatorRunning === false){
        hasSimulatorRan = true;
        isSimulatorRunning = true;
    boxesArray.forEach((box, index, array)=>{
        setTimeout(()=>{
            const newGhostElement = document.createElement('div');
            newGhostElement.setAttribute('class', 'item ghost-item');
            inputArray.append(newGhostElement);
            gsap.from(box,{x:-500, duration: 1});
            outputArray.append(box);
            box.style.borderRadius = '50%';
            if(index === array.length-1){
                isSimulatorRunning = false;
            }
        }, 1000 * index)
        
    });
    }
}

function executeFilter(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);
    if(hasSimulatorRan === false && isSimulatorRunning === false){
        hasSimulatorRan = true;
        isSimulatorRunning = true;
    boxesArray.forEach((box, index, array)=>{
        setTimeout(()=>{
            const newGhostElement = document.createElement('div');
            newGhostElement.setAttribute('class', 'item ghost-item circle');
            inputArray.append(newGhostElement);
            gsap.from(box,{x:-500, duration: 1});
            outputArray.append(box);
            box.style.borderRadius = '50%';
            if(index === array.length-1){
                isSimulatorRunning = false;
            }
        }, 1000 * index)
        
    });
    }
}

function reset(){
    if(hasSimulatorRan === true && isSimulatorRunning === false){
        const boxes = document.querySelectorAll('.item');
        const boxesArray = Array.from(boxes);
        boxesArray.forEach((box, index, array)=>{
            console.log(box);
            console.log(array.length)
            box.remove();
        })
        //readd items into input array
        for(let numOfItems = 0; numOfItems < 4; numOfItems++){
            const originalElements = document.createElement('div');
            originalElements.setAttribute('class', `item box-${numOfItems+1}`);
            inputArray.append(originalElements);
        }
        hasSimulatorRan = false;
    }
    //if ghost items exist remove them, if they don't don't do anything 
    // remove regular items if they are there, if not, don't do anything
}

