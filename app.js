// buttons 
const runBtn = document.querySelector('#run-btn');
const resetBtn = document.querySelector('.reset-btn');
const rightArrowBtn = document.querySelector('.fa-chevron-right');
const leftArrowBtn = document.querySelector('.fa-chevron-left');

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
rightArrowBtn.addEventListener('click', moveRight);
leftArrowBtn.addEventListener('click', moveLeft);
buttonContainer.addEventListener('click', execute);

//global variables 
let hasSimulatorRan = false;
let isSimulatorRunning = false;
let ArrayCounter = 0;

// console.log(mapActive.length); // return 1 means active, return 0 means inactive
const methodsArray = [{type: `.map( <span class="small-item-square"></span> => <span class="small-item-circle"></span> )`, buttonClass: 'map-active'}, {type: `.filter( <span class="small-item-square"></span> )`, buttonClass: 'filter-active'}, {type: `.find( <span class="small-item-square red"><p>[2]</p></span> )`, buttonClass: 'find-active'} ];
const filterArray = [{className: 'item box-1'}, {className: 'item box-2'}, {className: 'item box-3 circle'}, {className: 'item box-4'}];
const findArray = [{className: 'item box-1 circle'}, {className: 'item box-2 circle'}, {className: 'item box-3 red'}, {className: 'item box-4'}];
// load the first data from MethodsArray & increase ArrayCounter by one 
window.addEventListener('load', (event) => {
    typeMethod.innerHTML = methodsArray[ArrayCounter].type;
    runBtn.classList.add(`${methodsArray[ArrayCounter].buttonClass}`);
    // console.log(methodsArray[ArrayCounter].buttonClass)
    // ArrayCounter++;
  });

function execute(e){
    //run button executes function depending on what class it holds
    let buttonClassName = e.target.classList.value;
    console.log(buttonClassName);

    //change this to a switch statement 
    switch(buttonClassName){
        case 'map-active':
            executeMap();
            break;
        case 'filter-active':
            executeFilter();
            break;
        case 'reset-btn':
            reset();
            break;
        default:
            break;
    }

}

function moveLeft(){
    if(ArrayCounter === 0) return
    if(isSimulatorRunning === true) return
    //remove previous class
    runBtn.classList.remove(methodsArray[ArrayCounter].buttonClass);
    ArrayCounter--;
    switchMethods();
}
function moveRight(){

    if(methodsArray.length-1 === ArrayCounter) return
    if(isSimulatorRunning === true) return 
    //remove previous class
    runBtn.classList.remove(methodsArray[ArrayCounter].buttonClass);
    ArrayCounter++;
    switchMethods();
}

function switchMethods(){
    //need to fix this here! need to prevent early animation cancels
    hasSimulatorRan = false;
    typeMethod.innerHTML = methodsArray[ArrayCounter].type;
    runBtn.classList.add(methodsArray[ArrayCounter].buttonClass)
    

    //delete everything that there, 
    const boxes =  document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);

    boxesArray.forEach((box)=>{
        //remove everything 
        box.remove();
    });
    console.log(ArrayCounter);
    switch (ArrayCounter){
        case 0:
            setupMap();
            break;
        case 1:
            setupFilter();
            break;
        case 2:
            console.log('hello');
            setupFind();
            break;
        default:
           break; 
    }
    //create the proper items needed based on 'active' that is selected
    //switch run btn & reset button 
}   


/* 

RESET

*/

function reset(){
    if(isSimulatorRunning === false){
        const boxes = document.querySelectorAll('.item');
        const boxesArray = Array.from(boxes);
        boxesArray.forEach((box, index, array)=>{
            box.remove();
        })
        switch (ArrayCounter){
            case 0:
                setupMap();
                break;
            case 1:
                setupFilter();
                break;
            case 2:
                setupFind();
                break;
            
        }
        console.log('hello');
        hasSimulatorRan = false;
    }
    //if ghost items exist remove them, if they don't don't do anything 
    // remove regular items if they are there, if not, don't do anything
}


/* 

Setup up Functions 

*/



function setupFilter(){
    //create what I need to replace it. 
    for(let i = 0; i < filterArray.length; i++){
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${filterArray[i].className}`);
        // gsap.from(newElement,{x:-500, y: -200, duration: 1});
        gsap.to(newElement, 0.4, {scale:1.3, ease:Bounce.easeOut})
        gsap.to(newElement, 0.2, {scale:1, delay:0.4})
        newElement.innerText = `[${i}]`;
        inputArray.append(newElement);
    }

}

function setupMap(){
    for(let numOfItems = 0; numOfItems < 4; numOfItems++){
        const originalElements = document.createElement('div');
        originalElements.setAttribute('class', `item box-${numOfItems+1}`);
        gsap.to(originalElements, 0.4, {scale:1.3, ease:Bounce.easeOut})
        gsap.to(originalElements, 0.2, {scale:1, delay:0.4})
        originalElements.innerText = `[${numOfItems}]`;
        inputArray.append(originalElements);
    }
}

function setupFind(){
    //findArray
    for(let i = 0; i < findArray.length; i++){
        console.log(i);
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${findArray[i].className}`);
        gsap.to(newElement, 0.4, {scale:1.3, ease:Bounce.easeOut})
        gsap.to(newElement, 0.2, {scale:1, delay:0.4})
        newElement.innerText = `[${i}]`;
        inputArray.append(newElement);
    }
}
/* 

Execute Functions 

*/

function executeMap(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);
    if(isSimulatorRunning === false){
        // hasSimulatorRan = true;
        isSimulatorRunning = true;
    boxesArray.forEach((box, index, array)=>{
        setTimeout(()=>{
            const newGhostElement = document.createElement('div');
            newGhostElement.setAttribute('class', 'item ghost-item');
            newGhostElement.innerText = `[${index}]`;
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
    if(isSimulatorRunning === false){
        // hasSimulatorRan = true;
        isSimulatorRunning = true;
    boxesArray.forEach((box, index, array)=>{
        setTimeout(()=>{
            const newGhostElement = document.createElement('div');
            if(index === 2){
                newGhostElement.setAttribute('class', 'item ghost-item circle');
                // gsap.from(box,{x:-500, duration: 1});
                newGhostElement.innerText = `[${index}]`
                gsap.to(newGhostElement, 10, {rotation:"360", ease:Linear.easeNone, repeat:-1});
                box.remove();
                inputArray.append(newGhostElement);
            }else{
                newGhostElement.setAttribute('class', 'item ghost-item');
                newGhostElement.innerText = `[${index}]`
                inputArray.append(newGhostElement);
                gsap.from(box,{x:-500, duration: 1});
                outputArray.append(box);
            }
            if(index === array.length-1){
                isSimulatorRunning = false;
            }
        }, 1000 * index);
        
    });
    }
}

function executeFind(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);
    if(isSimulatorRunning === false){
        
    }
}

// rotate indefinitely 
 // gsap.to(box, 10, {rotation:"360", ease:Linear.easeNone, repeat:-1});