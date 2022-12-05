const STORAGE_KEY = 'todosDB'
var gTodos
var gFilterBy = 'all'
var gSortBy = 'importance'

_createTodos()

function getTodosForDisplay() {
    if (gFilterBy === 'all') {
        getTodosSortedForDisplay(gTodos)
        return gTodos
    }
    
    const todos = gTodos.filter(todo =>
        todo.isDone && gFilterBy === 'done' ||
        !todo.isDone && gFilterBy === 'active')
        getTodosSortedForDisplay(todos)
    return todos
}

function getTodosSortedForDisplay(todos) {
    if(gSortBy === 'importance'){
        todos.sort((a,b) => a.importance - b.importance)
    }else if(gSortBy === 'text'){
        todos.sort((a,b) => {
            const txtA = a.txt.toUpperCase()
            const txtB = b.txt.toUpperCase()
            if (txtA < txtB) return -1;
            if (txtA > txtB) return 1;
            
        })
    }else if(gSortBy === 'time'){
        todos.sort((a,b) => b.createdAt - a.createdAt)
    }

}


function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    saveToStorage(STORAGE_KEY, gTodos)

}

function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    saveToStorage(STORAGE_KEY, gTodos)

}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    saveToStorage(STORAGE_KEY, gTodos)

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function setSort(SortBy) {
    gSortBy = SortBy
}


function getTotalTodos() {
    return gTodos.length
}

function getActiveTodos() {
    return gTodos.filter(todo => !todo.isDone).length
}

function _createTodos() {
    gTodos = loadFromStorage(STORAGE_KEY)
    if (!gTodos || !gTodos.length) {
        gTodos = [
            _createTodo('Learn HTML'),
            _createTodo('Study CSS'),
            _createTodo('Master JS'),
        ]
        saveToStorage(STORAGE_KEY, gTodos)
    }
}

function _createTodo(txt, importance = '3') {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance
    }
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}