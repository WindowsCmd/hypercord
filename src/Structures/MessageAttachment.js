const fs = require('fs');

module.exports = class MessageAttachment {
    constructor(path, name){
        this.path = path;
        this.name = name;
        this.id = null;

        fs.access(path, fs.F_OK, (e) => {
        	if(e) throw new Error("Attachment file does not exsist!");
        });
    }    
	
    readBytes(){
    	fs.readFile(this.path, 'base64', (err, data) => {
    		if(err) throw new Error("FS Error trying to read data from file:  "+ this.path);
    		return data;
    	})
    }

    setName(name){
    	this.name = name; 
    }
}