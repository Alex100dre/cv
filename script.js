const actionsBtns = document.querySelectorAll('.action-btn');
const actionsCollapseBtn = document.querySelector('#actionsCollapse');
const printBtn = document.querySelector('#print');

const rippleEffect = event => {
    // Ripple effect
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const offset = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
        }
        //create .ink element if it doesn't exist
        if (target.querySelectorAll('.ink').length == 0) {
            const newInk = document.createElement('span');
            newInk.classList.add('ink');
            target.prepend(newInk);
        }

        const ink = target.querySelector('.ink');
        //in case of quick double clicks stop the previous animation
        ink.classList.remove('animate');

        //set size of .ink
        if (!ink.offsetHeight && !ink.offsetWidth) {
            //use parent's width or height whichever is larger for the diameter to make a circle which can cover the entire element.
            const d = Math.max(target.offsetWidth, target.offsetHeight);
            ink.style.width = `${d}px`;
            ink.style.height = `${d}px`;
        }

        //get click coordinates
        //logic = click coordinates relative to page - parent's position relative to page - half of self height/width to make it controllable from the center;
        const x = event.pageX - offset.left - ink.offsetWidth / 2;
        const y = event.pageY - offset.top - ink.offsetHeight / 2;

        //set the position and add class .animate
        ink.style.top = `${y}px`;
        ink.style.left = `${x}px`;
        ink.classList.add('animate');

}

const collapseActions = event => {
    const target = event.currentTarget;
    rippleEffect(event);
    target.classList.toggle('active');
    actionsBtns.forEach(btn => btn.classList.toggle('visible'));
}

const printCv = event => {
    rippleEffect(event);
    window.print();
}

actionsBtns.forEach(btn => btn.onclick = rippleEffect);
actionsCollapseBtn.onclick = collapseActions;
printBtn.onclick = printCv;