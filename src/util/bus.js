function checkFilter(category, title, checked) {
            // console.log( 'app - checkFilter ' + title );
    if (checked) {
        this[category].push(title); // pushes to genre or time array
    } 
    else {
        let index = this[category].indexOf(title);  // returns -1 if not found
        if (index >= 0) {
            this[category].splice(index,1);  // remove item at index
        }
    }
}

function setDay(day) {
    this.day = day;
}

export { checkFilter, setDay };