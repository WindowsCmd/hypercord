module.exports = class FormData {
    constructor(){
        this.boundary = "--boundary";
        this.data = "";
    }

    /**
     * 
     * @param {string} fieldName 
     * @param {string | object} data 
     * @param {string} filename file name of the file that you want to upload
     */
    append(fieldName, data, filename=null){
        let string = ` Content-Disposition: form-data; name=\"${fieldName}\" `;

        if(typeof data == "object"){
            string += `Content-Type: application/json ${JSON.stringify(data)}`
        } else {
            string += data
        }

        this.data += " " + this.boundary + string;
    }

    /**
     * 
     * @returns Form Data
     */
    extract(){
        return this.data + " --boundary--";    
    }
}