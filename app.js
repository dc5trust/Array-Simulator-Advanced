// buttons 
const runBtn = document.querySelector('.run-btn');
const resetBtn = document.querySelector('.reset-btn');

//containers
const outputArray = document.querySelector('.output-array');
const inputArray = document.querySelector('.input-array');

//items
const boxTwo = document.querySelector('.box-2');
const boxes = document.querySelectorAll('.item');
const boxesArray = Array.from(boxes);

runBtn.addEventListener('click', moveElements);
resetBtn.addEventListener('click', reset);

//global variables 
let hasSimulatorRan = false;
let isSimulatorRunning = false;

function moveElements(){
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
            // console.log(array.length);
            // console.log(index);
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