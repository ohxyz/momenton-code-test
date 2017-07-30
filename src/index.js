/* View layer - Implemented in React */

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

let viewHelper = require( './view-helper.js' );
let momentonEmployeeTree = viewHelper.momentonEmployeeTree;

class EmployeeTableRow extends React.Component {
    
    constructor() {
        
        super();
        this.numOfColumns = momentonEmployeeTree.depth + 1;
        
    }
    
    render() {
        
        let employeeName = this.props.employeeName;
        let columnIndex = this.props.columnIndex;
        
        console.log( 8, employeeName, columnIndex );
        
        return (
        
            <tr>
            {
                Array( this.numOfColumns ).fill( null ).map( ( item, index ) => {
                    
                    if ( columnIndex === index ) {
                        
                        return <td>{ employeeName }</td>
                    }
                    else {
                        
                        return <td></td>
                    }
                    
                } )
            }
            </tr>
        
        );
    }
}


class EmployeeTable extends React.Component {
    
    constructor() {
        
        super();
        this.employeeNamesWithCoords = momentonEmployeeTree.employeeNamesWithCoords;
    }
    
    render() {
        
        return (
        
            <table>
                <tbody>
                { 
                    this.employeeNamesWithCoords.map( ( nameWithCoords ) => {
            
                        return (
                        
                            <EmployeeTableRow key={ nameWithCoords[ 0 ] }
                                              employeeName={ nameWithCoords[ 0 ] }
                                              columnIndex={ nameWithCoords[ 1 ] } 
                            />  
                        );
                        
                    } )
                }   
                </tbody>
            </table>
        
        );
    }
}

class App extends React.Component {
    
    render() {
        
        return ( 
            
            <div id="app">
                <EmployeeTable />
            </div> 
        );
        
    }
}

ReactDOM.render( <App />, document.getElementById( 'root' ) );