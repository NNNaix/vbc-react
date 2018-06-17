const dbUtils = require('./../util/db-util');

module.exports = {
    /**
     * 插入新的评论数据
     * @param model
     * @return {Promise.<void>}
     */
    async create(model){
        let result = await dbUtils.insertData('comment_info',model);
        return result
    },
    async descLoad(pid,row){
        let sql=``;
        if(row){
            _sql = `
        SELECT *
        FROM comment_info
        WHERE pid= ${pid} 
        AND cid <= ${row}
        ORDER BY cid DESC
        LIMIT 10`;
        }else {
            _sql = `SELECT *
                   FROM comment_info
                   WHERE pid = ${pid}
                   ORDER BY cid DESC 
                   LIMIT 10`
        }

        let reslut = {};
        let items =await dbUtils.query(_sql);
        if([].slice.call(items).length === 10 ){
            reslut = {
                items:items,
                isInsufficient:false
            }
        }else {
            reslut= {
                items:items,
                isInsufficient:true
            }
        }
        return reslut
    },
    async getTotalCount(pid){
        let _sql=`
       SELECT COUNT(*) AS total_count
       FROM comment_info 
       WHERE pid = ${pid}
        `;
        let result =await dbUtils.query(_sql);
        console.log(result);
        return result[0]['total_count'];
    }
};
