module.exports = {
    pageSummary: function (page, count, size, limit) {
        let pageInfo;
        const totalPage = Math.ceil(count/size);
        if(limit){
            pageInfo = (page) ? page + ' of ' + totalPage : '1 of ' + totalPage
        }else {
            pageInfo = '1 of 1';
        }
        return pageInfo;
    },
};
