# Momenton Code Test

Demo: http://www.runademo.com/momenton-code-test/


## Notes


1. An employee with no manager is CEO, eg. Jamie. Other employees with no managers will not be put into the table. It would have a seperate list.
2. A manager who is not a valid employee will also be excluded from the table. It would have been put into another list. 

These two items listed above were not completed in the code. My effort was only on implentation of the hierarchical data. I appologise for this, as I don't have too much time for this test. The test cases have the minimum coverage.

However, the code was done in a clear architectural way. I added additional "employees" to validate the application. And it worked as designed.

## Data flow

database.js -> service.js -> view-helper.js -> index.js

database - Simulates data from database.

service - Provides data service layer to organize data.

view-helper - View Helper is a part of view layer. Its purpose is to produce good data structure for React components.

index - Contains React code. In most caess, components will be further seperated.
             
