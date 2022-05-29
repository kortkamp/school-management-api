# CP-MODULE

The script cp-module provides a quick way to create a new module in this api.

You just need to pass as args the SOURCE and DESTINATION  of the modules.
Remember to use the singular name, not plural. 

```
yarn cp-module user customer
```
The script will copy all the content of source directory into a new directory, them all file names , comments , strings and file content referencing SOURCE will be replaced to DESTINATION, as lower case , as First Letter High Case. 


The command must be executed from the root of the project.