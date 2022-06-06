// buttons 
const runBtn = document.querySelector('#run-btn');
const resetBtn = document.querySelector('.reset-btn');
const rightArrowBtn = document.querySelector('.fa-circle-chevron-right');
const leftArrowBtn = document.querySelector('.fa-circle-chevron-left');

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

//Methods Array holds the classes and innertext for each method. When the user switches, it injects the information directly with classes via innerHTML
const methodsArray = [{type: `.map( <span class="small-item-square"></span> => <span class="small-item-circle outline-marked"></span> )`, buttonClass: 'map-active'}, {type: `.filter( <span class="small-item-square outline-marked"></span> )`, buttonClass: 'filter-active'}, {type: `.find( <span class="small-item-square outline-marked"><p>[2]</p></span> )`, buttonClass: 'find-active'}, {type: `.findIndex( <span class="small-item-square outline-marked"></span> )`, buttonClass: 'findIndex-active'}, {type: `.some( <span class="small-item-square"></span> )`, buttonClass: 'some-active'}, {type: `.every( <span class="small-item-square"></span> )`, buttonClass: 'every-active'} ];

//Each array holds the circles/squares for their respective INPUTS. This holds the class names for the shapes
const mapArray = [{className: 'item box-1'}, {className: 'item box-2'}, {className: 'item box-3'}, {className: 'item box-4'}];
const filterArray = [{className: 'item box-1 outline-marked'}, {className: 'item box-2 outline-marked'}, {className: 'item box-3 circle'}, {className: 'item box-4 outline-marked'}];
const findArray = [{className: 'item box-1 circle'}, {className: 'item box-2 circle'}, {className: 'item box-3 outline-marked'}, {className: 'item box-4'}];
const findIndexArray = [{className: 'item box-1 circle'}, {className: 'item box-2 circle'}, {className: 'item box-3 circle'}, {className: 'item box-4 outline-marked'}];
const someArray = [{className: 'item box-1 circle'}, {className: 'item box-2'}, {className: 'item box-3'}, {className: 'item box-4 circle'}];
const everyArray = [{className: 'item box-1'}, {className: 'item box-2'}, {className: 'item box-3 circle'}, {className: 'item box-4'}];


// load the first data from MethodsArray & increase ArrayCounter by one 
window.addEventListener('load', (event) => {
    typeMethod.innerHTML = methodsArray[ArrayCounter].type;
    runBtn.classList.add(`${methodsArray[ArrayCounter].buttonClass}`);
    setupMap();
  });

function execute(e){
    //run button executes function depending on what class it holds
    let buttonClassName = e.target.classList.value;

    //depending on the button class name will determine the function that will be executed
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
        case 'every-active':
            executeEvery();
        default:
            break;
    }

}

function moveLeft(){
    
    if(ArrayCounter === 0) return
    if(isSimulatorRunning === true) return
    if(ArrayCounter === 1){
        leftArrowBtn.classList.add('disabled-arrow');
    }
    if(ArrayCounter === methodsArray.length-1){
        rightArrowBtn.classList.remove('disabled-arrow');
    }
    //remove previous class
    runBtn.classList.remove(methodsArray[ArrayCounter].buttonClass);
    ArrayCounter--;
    switchMethods();
}

function moveRight(){
    
    if(ArrayCounter === methodsArray.length-2){
        rightArrowBtn.classList.add('disabled-arrow');   
    } 
    if(isSimulatorRunning === true) return 
    if(ArrayCounter === 0){
        leftArrowBtn.classList.remove('disabled-arrow');
    }
   
    //remove previous class
    runBtn.classList.remove(methodsArray[ArrayCounter].buttonClass);
    ArrayCounter++;
    switchMethods();
}

function switchMethods(){
    hasSimulatorRan = false;
    typeMethod.innerHTML = methodsArray[ArrayCounter].type;
    runBtn.classList.add(methodsArray[ArrayCounter].buttonClass)

    //delete everything that there, 
    const boxes =  document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);

    const outputResult = document.querySelector('.output-result');
    const newArrayCreatedMessage = document.querySelector('.announcement');
    
    //this deletes messages within the output array if they exist only 
    if(outputResult !== null) outputResult.remove();
    if(newArrayCreatedMessage !== null) newArrayCreatedMessage.remove();

    boxesArray.forEach((box)=>{
        //remove everything 
        box.remove();
    });

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
        case 5: 
            setupEvery();
            break;
        default:
           break; 
    }
}   

/* 

RESET

*/

function reset(){
    if(isSimulatorRunning === false){
        const boxes = document.querySelectorAll('.item');
        const boxesArray = Array.from(boxes);
        
        const outputResult = document.querySelector('.output-result');
        const newArrayCreatedMessage = document.querySelector('.announcement');

        //this deletes messages within the output array if they exist only 
        if(outputResult !== null) outputResult.remove();
        if(newArrayCreatedMessage !== null) newArrayCreatedMessage.remove();
        
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
                break;
            case 5:
                setupEvery();
                break;
            default:
                break;
        }
        hasSimulatorRan = false;
    }
}

/* 

Setup up Functions 

*/

function setupMap(){
    for(let i = 0; i < mapArray.length; i++){
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${mapArray[i].className}`);
        gsap.to(newElement, 0.4, {scale:1.3, ease:Bounce.easeOut})
        gsap.to(newElement, 0.2, {scale:1, delay:0.4})
        newElement.innerText = `[${i}]`;
        inputArray.append(newElement);
    }
}

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

function setupEvery(){
    for(let i = 0; i < everyArray.length; i++){
        const newElement = document.createElement('div');
        newElement.setAttribute('class', `${everyArray[i].className}`);
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
            const newArrayCreatedMessage = document.createElement('h2');
            newArrayCreatedMessage.classList.add('announcement');
            newArrayCreatedMessage.innerText = 'New Array Created';
            newGhostElement.setAttribute('class', 'item ghost-item');
            newGhostElement.innerText = `[${index}]`;
            inputArray.append(newGhostElement);
            box.classList.add('outline-marked');
            gsap.from(box,{x:-500, duration: 1.5});
            outputArray.append(box);
            box.style.borderRadius = '50%';
            //display announcement 'new array created during the first index element created
            if(index === 0){
                gsap.to(newArrayCreatedMessage, 0.4, {scale:1.5, ease:Bounce.easeOut})
                gsap.to(newArrayCreatedMessage, 0.2, {scale:1, delay:0.7})
                outputArray.append(newArrayCreatedMessage);
            }
            if(index === array.length-1){
                isSimulatorRunning = false;
            }
        }, 1500 * index)
        
    });
    }
}

function executeFilter(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);
    if(isSimulatorRunning === false && hasSimulatorRan === false){
        hasSimulatorRan = true;
        isSimulatorRunning = true;
    boxesArray.forEach((box, index, array)=>{
        setTimeout(()=>{
            const newGhostElement = document.createElement('div');
            const newArrayCreatedMessage = document.createElement('h2');
            newArrayCreatedMessage.classList.add('announcement');
            newArrayCreatedMessage.innerText = 'New Array Created';
            if(index === 2){
                newGhostElement.setAttribute('class', 'item circle outline-marked-red');
                newGhostElement.innerText = `[${index}]`
                box.remove();
                inputArray.append(newGhostElement);
            }else{
                newGhostElement.setAttribute('class', 'item ghost-item');
                newGhostElement.innerText = `[${index}]`
                inputArray.append(newGhostElement);
                gsap.from(box,{x:-500, duration: 1.5});
                outputArray.append(box);
                if(index === 0){
                    gsap.to(newArrayCreatedMessage, 0.4, {scale:1.5, ease:Bounce.easeOut})
                    gsap.to(newArrayCreatedMessage, 0.2, {scale:1, delay:0.7})
                    outputArray.append(newArrayCreatedMessage);
                }
            }
            if(index === array.length-1){
                isSimulatorRunning = false;
            }
        }, 1500 * index);
        
    });
    }
}

function executeFind(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);
    if(isSimulatorRunning === false && hasSimulatorRan === false){
        hasSimulatorRan = true;
        isSimulatorRunning = true;
        boxesArray.forEach((box, index, array)=>{
            setTimeout(()=>{
                if(index === 2){
                    const newGhostElement = document.createElement('div');
                    newGhostElement.setAttribute('class', 'item ghost-item');
                    newGhostElement.innerText = `[${index}]`;
                    // box.classList.add('marked');
                    outputArray.append(box);
                    gsap.from(box,{x: -500, duration: 1.5});
                    setTimeout(()=>{
                        inputArray.append(newGhostElement);
                    }, 900)
                    
                }else if(index < 2){
                    const newGhostElement = document.createElement('div');
                    newGhostElement.setAttribute('class', 'item ghost-item circle');
                    newGhostElement.innerText = `[${index}]`;
                    gsap.to(box,{y:-500, duration: 1.5});
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
            }, 1500 * index)
            
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
                if(index < 3){
                    const newGhostElement = document.createElement('div');
                newGhostElement.setAttribute('class', 'item ghost-item circle');
                newGhostElement.innerText = `[${index}]`;
                gsap.to(box,{y:-500, duration: 1.5});
                setTimeout(()=>{
                    inputArray.append(newGhostElement);
                }, 900)
                setTimeout(()=>{
                    box.remove();
                }, 900);
                }else if(index === 3){
                    const resultElement = document.createElement('h2');
                    resultElement.setAttribute('class', 'output-result');
                    resultElement.innerText = `Index: 3`;
                    outputArray.append(resultElement);
                    isSimulatorRunning = false;
                }
            }, 1500 * index)
            
        });
    }
}

function executeSome(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);

    if(isSimulatorRunning === false && hasSimulatorRan === false){
        isSimulatorRunning = true;
        hasSimulatorRan = true;
        boxesArray.forEach((box, index, array)=>{
            setTimeout(()=>{
                if(index === 1){
                    box.classList.add('outline-marked');
                    const outputResult = document.createElement('h2');
                    outputResult.setAttribute('class', 'output-result');
                    outputResult.innerText = `TRUE`;
                    outputArray.append(outputResult);
                }else if(index < 1){
                    const newGhostElement = document.createElement('div');
                    newGhostElement.setAttribute('class', 'item ghost-item circle');
                    newGhostElement.innerText = `[${index}]`;
                    gsap.to(box,{y:-500, duration: 1.5});
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
            }, 1500 * index)
            
        });
    }
}

function executeEvery(){
    const boxes = document.querySelectorAll('.item');
    const boxesArray = Array.from(boxes);

    if(isSimulatorRunning === false && hasSimulatorRan === false){
        isSimulatorRunning = true;
        hasSimulatorRan = true;
        boxesArray.forEach((box, index, array)=>{
            setTimeout(()=>{
                if(index === 2){
                    box.classList.add('outline-marked-red');
                    const outputResult = document.createElement('h2');
                    outputResult.setAttribute('class', 'output-result');
                    outputResult.innerText = `FALSE`;
                    outputArray.append(outputResult);
                }else if(index < 2){
                    const newGhostElement = document.createElement('div');
                    gsap.to(box,{y:-500, duration: 1.5});
                    //locate the circle at index 2 and make it into a circle. The faded 'ghost' element
                    if(index === 2){
                        newGhostElement.setAttribute('class', 'item ghost-item circle');
                        newGhostElement.innerText = `[${index}]`;
                    }else{
                        newGhostElement.setAttribute('class', 'item ghost-item');
                        newGhostElement.innerText = `[${index}]`;
                    }
                    setTimeout(()=>{
                        inputArray.append(newGhostElement);
                    }, 900)
                    setTimeout(()=>{
                        box.remove();
                    }, 900);
                }
                if(index === 3){
                    isSimulatorRunning = false;
                }
            }, 1500 * index)
            
        });
    }
}
