/* View helper - Part of view layer. 
 *               Generate wrapper of data from service layer for view layer only
 */
 
let service = require( './service.js' );
 
class EmployeeTree {
    
    constructor( ceo ) {
        
        this.coordsXOfVistingNode = -1;
        this.coordsYOfVistingNode = -1;
        
        this.rootNode = ceo;
        
        // [ [ employeeName, [ coordinateXinTable, coordinateYinTable ] ],  ... ]
        // 
        // Example: [ 
        //              [ 'Alan', [ 1, 1 ] ],
        //              [ 'Alex', [ 2, 3 ] ], 
        //              ... 
        //          ]
        // 
        this.employeeNamesWithCoords = [];
        this.depth = 0;
    }
    
    setDepth() {
        
        this.depth = ( this.coordsXOfVistingNode > this.depth )
                   ? this.coordsXOfVistingNode
                   : this.depth;
    }
    
    visitEmployeeNode( employeeNode, parentCoordsX, parentCoordsY ) {
       
        
        // Needs improve
        if ( parentCoordsX === undefined 
                || parentCoordsY === undefined ) {
            
            this.coordsXOfVistingNode = 0;
            this.coordsYOfVistingNode = 0;
        }
        else {
            
            this.coordsXOfVistingNode = parentCoordsX + 1;
            this.coordsYOfVistingNode += 1;
        }
        
        let currentCoordsX = this.coordsXOfVistingNode;
        let currentCoordsY = this.coordsYOfVistingNode;
        let employeeName = employeeNode.name;
        
        let nameWithCoords = [ employeeName, currentCoordsX, currentCoordsY ];
        
        // console.log( 7, nameWithCoords );
        
        this.setDepth();
        this.employeeNamesWithCoords.push( nameWithCoords );

        for ( let i = 0; i < employeeNode.managerOf.length; i ++ ) {

            let childEmployeeNode = employeeNode.managerOf[ i ];

            this.visitEmployeeNode( childEmployeeNode, currentCoordsX, currentCoordsY );
            
        }       
    }
    
    walkEmployeeNodes( ) {
        
        this.visitEmployeeNode( this.rootNode );
        return this.employeesWithCoords;
    }
    
}

let momentonEmployeeTree = new EmployeeTree( service.momentonTeam.ceo );
momentonEmployeeTree.walkEmployeeNodes();


module.exports = {
    
    momentonEmployeeTree
};