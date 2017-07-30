/* Unit test in Chome dev tools */

let service = require( './service.js' );
let database = require( './database.js' );
let viewHelper = require( './view-helper.js' );

console.log( '==========================================' ); 
console.log( 'Start to test: service.js ...' );
console.log( '==========================================' );

let momenton = new service.EmployeeManagement();
momenton.addEmployeesFromRecords( database.employeesTable );

// Assign to window object in Chome dev tools
window.momenton = momenton;


// Test: EmployeeManagement.findEmployeeByEmplyoeeId
console.log( null, momenton.findEmployeeByEmployeeId( '999' ) );
console.log( 'Jamie', momenton.findEmployeeByEmployeeId( '150' ).name );


// Test: EmployeeManagement.findManagerOfEmployee
console.log( 'Alan', momenton.findManagerOfEmployee( { name: 'Martin',
                                                       employeeId: '220',
                                                       managerId: '100' } ).name );
                                                       
console.log( null, momenton.findManagerOfEmployee( { name: 'Jamie',
                                                     employeeId: '150',
                                                     managerId: '' } ) );
                                                       
                                               
// Test: EmployeeManagement.assignEmployeeToManager
console.log( momenton.findEmployeeByEmployeeId( '400' ),
             momenton.assignEmployeeToManager( { name: 'David',
                                                 employeeId: '190',
                                                 managerId: '400' } ) );

                                                 
// Test: CEO
momenton.assignAllEmployees();
console.log( 'CEO: Jamie', momenton.ceo );


console.log( '==========================================' );
console.log( 'Start to test: view-helper.js ...' );
console.log( '==========================================' );

let momenton2 = new service.EmployeeManagement();
momenton2.addEmployeesFromRecords( database.employeesTable );
momenton2.assignAllEmployees();
window.momenton2 = momenton2;

// Test: EmployeeTree
let tree = new viewHelper.EmployeeTree( momenton2.ceo );
tree.walkEmployeeNodes();
console.log( '[ name, x, y ]', tree.employeeNamesWithCoords );
