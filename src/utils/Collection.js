module.exports = class Collection extends Map {
  constructor(base) {
    super();
    this.base = base;
  }


  /**
   * Updates an object
   * @arg {Object} obj the updated object
   * @arg {Any} [extra] extra data the the data might need
   * @arg {Boolean} [replace] If the object already exsists then it will overide it with a new object 
   * @returns {Class} Updated object
   */
  update(obj, extra, replace){
    if(!obj.id && obj.id !== 0){
      throw new Error("Missing the object id");
    }
    const item = this.get(obj.id);
    if(!item) {
      return this.add(obj, extra, replace);
    }
    return item.update(obj, replace);
  }

  /**
   * Add an object
   * @arg {Object} object data
   * @arg {Any} [extra] Any extra data that the data might need
   * @arg {Boolean} [replace] If the object already exsists then it will overide it with a new object  
   * @returns {Class} Updated object
   */
  add(obj, extra, replace){
    if(obj.id == null){
      throw new Error("No object ID");
    }

    const exsistingObj = this.get(obj.id);
    
    if(exsistingObj && !replace){
      return exsistingObj;
    }

    if(!(obj instanceof this.base)){
      obj = new this.base(obj);
    }

    this.set(obj.id, obj);
    return this.get(obj.id);
  }
};
