class ApiFeatures {

    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {

        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,  //s operator is used to search for the given string in the specified collection. I
                $options: 'i'   //
            }
        } : {}
        console.log(keyword);
        console.log({ ...keyword });
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {

        const queryCopy = { ...this.queryStr };

        // Removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        const queryObj = { ...this.queryStr };
        const excludedFields = ['keyword', 'page', 'limit'];
        // console.log(queryObj);
        excludedFields.forEach(el => delete queryObj[el]);
        // this.query = this.query.find(queryObj);
        // console.log(queryObj);

        //1B) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        const range = JSON.parse(queryStr)['price']
        console.log(JSON.parse(queryStr))
        console.log(range);
        const fullQuery = { price: { $gte: range[0], $lte: range[1] }}
        const category = JSON.parse(queryStr)['category']
        const rating = parseInt(JSON.parse(queryStr)['rating'])
        if(category != '') {
            fullQuery['category'] = category;
        }
        if(rating != 0) {
            fullQuery['ratings'] = rating ;
        }
        console.log({fullQuery})
        this.query = this.query.find(fullQuery);

        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures 