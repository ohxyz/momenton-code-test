/* Service layer - Organize data from Database and send it to View layer */

let database = require( './database.js' );

class EmployeeNotFoundError extends Error {
    
    constructor() {
        
        super();       
        this.message = 'Employee not found.';
    }
}

class InvalidArgumentError extends Error {
    
    constructor( errorContent ) {
        
        super();       
        this.message = `Invalid argument: ${errorContent}`;
    }
}

// Example:
//
// { 
//     name: 'Alan',
//     employeeId:   '100',
//     managerId:    '150',
//     managerOf:    [ { name: 'Martin', employeeId: '220', managerOf: [ ] },
//                     { name: 'Alex',   employeeId: '275', managerOf: [ ] } ]
// }
//

class Employee {
    
    constructor( employeeRecord ) {
    
        this.name = employeeRecord[ 0 ];
        this.employeeId = employeeRecord[ 1 ];
        this.managerId = employeeRecord[ 2 ];
        this.managerOf = [];
    }
    
}

class EmployeeManagement {

    constructor() {
        
        this.employees = [];
        this.ceo = null;
    }
    
    addEmployee( employee ) {
        
        if ( employee.managerId === '' ) {
            
            this.ceo = employee;
        }

        this.employees.push( employee );
    }
    
    addEmployeesFromRecords( employeeRecords ) {
        
        for( let i = 0; i < employeeRecords.length; i ++ ) { 
        
            let employee = new Employee( employeeRecords[ i ] );
            this.addEmployee( employee );
        }
        
    }
    
    assignEmployeeToManager( employee ) {
        
        let manager = this.findManagerOfEmployee( employee );
        
        if ( manager !== null ) {
            manager.managerOf.push( employee );
            return true;
        }
        
        return false;
    }
    
    assignAllEmployees() {
        
        for ( let i = 0; i < this.employees.length; i ++ ) {
            
            this.assignEmployeeToManager( this.employees[ i ] );
        }
        
        return this.employees;
    }
    
    findEmployeeByEmployeeId( employeeId ) {
        
        let employeeFound = this.employees.find( ( employee ) => {
            
            return employee.employeeId === employeeId;
            
        } );
        
        if ( employeeFound === undefined ) {
            
            return null;
        }
        
        return employeeFound;
    }
    
    findManagerOfEmployee( employee ) {
        
        let employeeIdOfManager = employee.managerId;
        
        return this.findEmployeeByEmployeeId( employeeIdOfManager );
    }

}

let momentonTeam = new EmployeeManagement();

momentonTeam.addEmployeesFromRecords( database.employeesTable );
momentonTeam.assignAllEmployees();

module.exports = {
    
    EmployeeManagement,
    momentonTeam,
}