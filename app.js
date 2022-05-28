const runBtn = document.querySelector('.run-btn');
const outputArray = document.querySelector('.output-array');
const inputArray = document.querySelector('.input-array');
const boxTwo = document.querySelector('.box-2');
const boxes = document.querySelectorAll('.item');
const boxesArray = Array.from(boxes);


runBtn.addEventListener('click', moveElements);

function moveElements(){
    boxesArray.forEach((box, index)=>{
        setTimeout(()=>{
            const newGhostElement = document.createElement('div');
            newGhostElement.setAttribute('class', 'ghost-item');
            inputArray.append(newGhostElement);
            gsap.from(box,{x:-500, duration: 1});
            outputArray.append(box);
            box.style.borderRadius = '50%';
        }, 1000 * index)
        
    });
}

