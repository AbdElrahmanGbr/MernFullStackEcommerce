class ApiFeatures {

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {  
        const keyword = this.queryStr.keyword ? {
            name : {
            $regex: this.queryStr.keyword,  //s operator is used to search for the given string in the specified collection. I
            $options: 'i'   
        }
        }:{}
        console.log(keyword);
        this.query= this.query.find({...keyword});
        return this;

    }
    filter() {
        const queryObj = { ...this.queryStr };
        const excludedFields = ['keyword','page', 'limit'];
        console.log(queryObj);
        excludedFields.forEach(el => delete queryObj[el]);
        // this.query = this.query.find(queryObj);
        console.log(queryObj);

        //1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        console.log(queryStr);
        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
    pagination(resPerPage) {
        const page = this.queryStr.page * 1 || 1;
        const limit = this.queryStr.limit * 1 || 100;
        const skip = resPerPage *(page - 1);
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

}
module.exports = ApiFeatures;