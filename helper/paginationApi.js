
const pagination = async (totalRow, req) => {
    return new Promise(async (resolve, reject) => {
        var search = req.search ? req.search : '';
        var limit = req.limit ? req.limit : 2;
        var page = req.page ? req.page : 1;
        var order_by = req.order_by ? req.order_by : 'id';
        var order_type = req.order_type ? req.order_type : 'ASC';  // ASC / DESC

        var total = 0;
        var totalPage = 0;
        let offset = 0;
        if (limit) {
            offset = (page - 1) * limit;
        }
        total = totalRow.length;
        totalPage = Math.ceil(total / limit);  // Total Page Count -
        let data = {
            page: page,
            limit: limit,
            offset: offset,
            totalPage: totalPage,
            totalRow: total,
            search:search,
            order_by:order_by,
            order_type:order_type
        }
        resolve(data);
    });
}

module.exports = pagination ;