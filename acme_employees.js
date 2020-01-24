// name is a good variable name, but list seems very generic
// is it a list of anything? can I give you a fruit list?
// name it what it has. it is a list of employee objects, so calling it employees
// give more intention to what it contains
function findEmployeeByName(name, list) {
    // I won't be writing about loops vs array methods
    // both are correct, but like we talked, it's good to be comfortable with both
    for (let i = 0; i < list.length; i++) {
        // good variable name inside here! clear intent
        let emp = list[i]
        if (emp.name === name) {
            return emp
        }
    }
}


function findManagerFor(employee, list) {
    // is manager a manager? or a manager id?
    let manager = employee.managerId
    console.log(manager) // leftover debug console logs are alright for now, but try to remember
    // to remove them before 'pushing code to production' or in this case, submitting
    for (let i = 0; i < list.length; i++) {
        let curr = list[i] // curr is alright here I think but could be better
        if (curr.id === manager) {
            return curr
        }
    }
}

function findCoworkersFor(employee, list) {
    let manager = employee.managerId
    // good variable name!
    let coworkers = []
    for (let i = 0; i < list.length; i++) {
        let curr = list[i]
        if (curr.id === employee.id) { // nice conditional catch!
            continue
        }
        if (curr.managerId === manager) {
            coworkers.push(curr)
        }
    }
    return coworkers
}

function findManagementChainForEmployee(employee, list) {
    let manager = employee.managerId
    let managerList = []
    while (manager) { // yes!! a while loop because you don't know how many managers!!
        for (let i = 0; i < list.length; i++) {
            let curr = list[i]
            if (curr.id === manager) {
                manager = curr.managerId
                managerList.unshift(curr)
            }
        }
    }
    return managerList
}

// breaking apart your functions is good!
function getReport(emp, list) {
    let id = emp.id
    emp.reports = []

    for (let i = 0; i < list.length; i++) {
        let curr = list[i]
        if (curr.managerId === id) {
            emp.reports.push(curr)
            curr.reports = getReport(curr, list) // recursion!!

        }

    }

}

function generateManagementTree(list) {
    let tree = {}
    // I think this for loop could be abstracted into a function
    // I THINK it's getting the top level manager but if it was a function
    // or a comment explaining it, it could be much clearer
    for (let i = 0; i < list.length; i++) {
        let curr = list[i]
        if (!curr.managerId) {
            tree = curr

        }
    }
    // tree is an object, not an array! be careful with that
    // I think it works a little here, but this may lead to buggy behavior later
    tree[0].reports = getReport(tree[0], list)
    return tree

}

const employees = [
    { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 },
    { id: 3, name: 'curly', managerId: 1 },
    { id: 5, name: 'groucho', managerId: 3 },
    { id: 6, name: 'harpo', managerId: 5 },
    { id: 8, name: 'shep Jr.', managerId: 4 },
    { id: 99, name: 'lucy', managerId: 1 }
]

const spacer = (text) => {
    if (!text) {
        return console.log('')
    }
    const stars = new Array(5).fill('*').join('')
    console.log(`${stars} ${text} ${stars}`)
}

spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees))//{ id: 1, name: 'moe' }
spacer('')

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees))//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees))/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */

spacer('')

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees))//[  ]
spacer('')

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees))/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer('')


spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2))
spacer('')

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees))/*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */

