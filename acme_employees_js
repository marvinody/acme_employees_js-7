function findEmployeeByName (name,list){
    for(let i=0;i<list.length;i++){
        let emp = list[i]
        if(emp.name === name){
            return emp
        }
    }
}



function findManagerFor(employee, list){
    let manager = employee.managerId
    console.log(manager)
    for (let i=0;i<list.length;i++){
        let curr = list[i]
        if(curr.id === manager){
            return curr
        }
    }
}

function findCoworkersFor (employee, list){
    let manager = employee.managerId
    let coworkers = []
    for (let i=0;i<list.length;i++){
        let curr = list[i]
        if(curr.id === employee.id){
            continue
        }
        if(curr.managerId === manager){
            coworkers.push(curr)
        }
    }
    return coworkers
}

function findManagementChainForEmployee (employee, list){
    let manager = employee.managerId
    let managerList = []
    while (manager){
        for (let i =0;i<list.length;i++){
            let curr = list[i]
            if(curr.id === manager){
                manager = curr.managerId
                managerList.unshift(curr)
            }
        }
    }
    return managerList
}

function getReport(emp,list){
    let id = emp.id
    emp.reports = []
    
    for(let i=0;i<list.length;i++){
        let curr = list[i]
        if(curr.managerId === id){
            emp.reports.push(curr)
            curr.reports = getReport(curr,list)

        }
        
    }
    return
}

function generateManagementTree(list){
    let tree = {}
    for(let i=0;i<list.length;i++){
        let curr = list[i]
        if(!curr.managerId){
            tree = curr
            
        }
    }
    tree[0].reports = getReport(tree[0],list)
    return tree

}

