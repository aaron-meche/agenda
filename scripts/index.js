function dom(id) {
    return document.getElementById(id)
}

function createEncryptionKey(length) {
    var library = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','1','2','3','4','5','6','7','8','9','0'];
    var collection = '';
    for (var i = 0; i < length; i++) {
        collection = collection + library[Math.floor(Math.random() * library.length)];
    }
    return collection;
}

window.addEventListener('load',function () {
    let module_view = localStorage['viewport:modules'];
    if (module_view !== undefined) {
        let module_view_split = module_view.split('::');
        console.log(module_view_split);
    }
})

function expandListAssignment(self) {
    var className = self.children[0].children[0].innerText;
    var assignmentName = self.children[0].children[1].innerText;

    dom('expandListAssignmentPrompt').style.display = 'flex';

    dom('expandAssignmentClass').innerHTML = className;
    dom('expandAssignmentTitle').innerHTML = assignmentName;
}

function completeAssignment() {
    congratulate();
    if (localStorage['completed'] !== undefined) {
        localStorage['completed'] = Number(localStorage['completed']) + 1;
    } else {
        localStorage['completed'] = 1;
    }
    removeAssignment();
}

function congratulate() {
    console.log('Congratulations on finishing an assignment!');
    // alert('Congratulations on finishing an assignment!');
}

function deleteAssignment() {
    removeAssignment();
}

function removeAssignment() {
    localStorage.removeItem(sessionStorage['activeAssignment'])
    window.location.reload();
}

function closePrompt(self) {
    self.parentNode.style.display = 'none';
}

function buildAssignment(className, title) {
    return `<div class='list-item' onclick='expandListAssignment(this)'>
        <div class='list-item-content'>
            <div class='list-item-class'>` + className + `</div>
            <div class='list-item-assignment'>` + title + `</div>
        </div>
    </div>`;
}

function insertAssignment(section) {
    dom(section + '_listItemContainer').innerHTML = dom(section + '_listItemContainer').innerHTML + buildAssignment('AP Euro','Project');
}