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
const methodsArray = [{type: `.map( <span class="small-item-square"></span> => <span class="small-item-circle"></span> )`, buttonClass: 'map-active'}, {type: `.filter( <span class="small-item-square"></span> )`, buttonClass: 'filter-active'}, {type: `.find( <span class="small-item-square red"><p>[2]</p></span> )`, buttonClass: 'find-active'}, {type: `.findIndex( <span class="small-item-square red"></span> )`, buttonClass: 'findIndex-active'}, {type: `.some( <span class="small-item-square"></span> )`, buttonClass: 'some-active'}, {type: `.every( <span class="small-item-square"></span> )`, buttonClass: 'every-active'} ];

//Each array holds the circles/squares for their respective INPUTS. This holds the class names for the shapes
const filterArray = [{className: 'item box-1'}, {className: 'item box-2'}, {className: 'item box-3 circle'}, {className: 'item box-4'}];
const findArray = [{className: 'item box-1 circle'}, {className: 'item box-2 circle'}, {className: 'item box-3 red'}, {className: 'item box-4'}];
const findIndexArray = [{className: 'item box-1 circle'}, {className: 'item box-2 circle'}, {className: 'item box-3 circle'}, {className: 'item box-4'}];
const someArray = [{className: 'item box-1 circle'}, {className: 'item box-2'}, {className: 'item box-3'}, {className: 'item box-4 circle'}];

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
        case 'find-active':
            executeFind();
            break;
        case 'findIndex-active':
            executeFindIndex();
            break;
        case 'some-active':
            executeSome();
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
    const outputResult = document.querySelector('.output-result');
        
    if(outputResult !== null){
        outputResult.remove();
    }

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
            setupFind();
            break;
        case 3:
            setupFindIndex();
            break;
        case 4:
            setupSome();
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
        const outputResult = document.querySelector('.output-result');
        if(outputResult !== null){
            outputResult.remove();
        }
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
            case 3:
                setupFindIndex();
                break;
            case 4:
                setupSome();
            default:
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
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${findArray[i].className}`);
        gsap.to(newElement, 0.4, {scale:1.3, ease:Bounce.easeOut})
        gsap.to(newElement, 0.2, {scale:1, delay:0.4})
        newElement.innerText = `[${i}]`;
        inputArray.append(newElement);
    }
}

function setupFindIndex(){
    for(let i = 0; i < findIndexArray.length; i++){
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${findIndexArray[i].className}`);
        gsap.to(newElement, 0.4, {scale:1.3, ease:Bounce.easeOut})
        gsap.to(newElement, 0.2, {scale:1, delay:0.4})
        newElement.innerText = `[${i}]`;
        inputArray.append(newElement);
    }
}

function setupSome(){
    for(let i = 0; i < someArray.length; i++){
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${someArray[i].className}`);
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
    if(isSimulatorRunning === false && hasSimulatorRan === false){
        hasSimulatorRan = true;
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
        isSimulatorRunning = true;
        boxesArray.forEach((box, index, array)=>{
            setTimeout(()=>{
                if(index === 2){
                    const newGhostElement = document.createElement('div');
                    newGhostElement.setAttribute('class', 'item ghost-item');
                    newGhostElement.innerText = `[${index}]`;
                    outputArray.append(box);
                    gsap.from(box,{x: -500, duration: 1});
                    setTimeout(()=>{
                        inputArray.append(newGhostElement);
                    }, 900)
                    
                }else if(index < 2){
                    const newGhostElement = document.createElement('div');
                    newGhostElement.setAttribute('class', 'item ghost-item');
                    newGhostElement.innerText = `[${index}]`;
                    gsap.to(box,{y:-500, duration: 1});
                    setTimeout(()=>{
                        inputArray.append(newGhostElement);
                    }, 900)
                    setTimeout(()=>{
                        box.remove();
                    }, 900);
                    
                }
                if(index === 2){
                    isSimulatorRunning = false;
                }
            }, 1000 * index)
            
        });
    }
}

function executeFindIndex(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);
    if(isSimulatorRunning === false && hasSimulatorRan === false){
        hasSimulatorRan = true;
        isSimulatorRunning = true;
        boxesArray.forEach((box, index, array)=>{
            setTimeout(()=>{
                const newGhostElement = document.createElement('div');
                newGhostElement.setAttribute('class', 'item ghost-item');
                newGhostElement.innerText = `[${index}]`;
                gsap.to(box,{y:-500, duration: 1});
                setTimeout(()=>{
                    inputArray.append(newGhostElement);
                }, 900)
                setTimeout(()=>{
                    box.remove();
                }, 900); 
                if(index === 3){
                    const resultElement = document.createElement('h2');
                    resultElement.setAttribute('class', 'output-result');
                    resultElement.innerText = `Index: 3`;
                    setTimeout(()=>{
                        outputArray.append(resultElement);
                    }, 900)
                    isSimulatorRunning = false;
                }
            }, 1000 * index)
            
        });
    }
}

function executeSome(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);

    if(isSimulatorRunning === false){
        isSimulatorRunning = true;
        boxesArray.forEach((box, index, array)=>{
            setTimeout(()=>{
                if(index === 1){
                    box.classList.add('red');
                    const outputResult = document.createElement('h2');
                    outputResult.setAttribute('class', 'output-result');
                    outputResult.innerText = `TRUE`;
                    outputArray.append(outputResult);
                }else if(index < 1){
                    const newGhostElement = document.createElement('div');
                    newGhostElement.setAttribute('class', 'item ghost-item');
                    newGhostElement.innerText = `[${index}]`;
                    gsap.to(box,{y:-500, duration: 1});
                    setTimeout(()=>{
                        inputArray.append(newGhostElement);
                    }, 900)
                    setTimeout(()=>{
                        box.remove();
                    }, 900);
                    
                }
                if(index === 1){
                    isSimulatorRunning = false;
                }
            }, 1000 * index)
            
        });
    }
}


// rotate indefinitely 
 // gsap.to(box, 10, {rotation:"360", ease:Linear.easeNone, repeat:-1});

//const newAnnouncement = document.createElement('h2');
//  newAnnouncement.setAttribute('class', 'announcement');
// newAnnouncement.innerText = 'NEW ARRAY: NO';
// outputArray.append(newAnnouncement);