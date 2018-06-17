const dbUtils = require('./../util/db-util');

module.exports = {
    /**
     * 创建新的post
     * @param model <Object> ->[title,author,category,date,content]
     * @return {Promise.<void>}
     */
    async create(model) {
        let result = await dbUtils.insertData('post_info', model);
        return result;
    },
    async getOfficialPost(){
        let items = await dbUtils.query(`select * from official_post`);
        return items
    },
    async descLoad(row) {
        let sql = ``;
        if (row) {
            _sql = `
        SELECT *
        FROM post_info
        WHERE pid < ${row}
        ORDER BY pid DESC
        LIMIT 5`;
        } else {
            _sql = `SELECT *
                   FROM post_info 
                   ORDER BY pid DESC 
                   LIMIT 5`
        }

        let reslut = {};
        let items = await dbUtils.query(_sql);
        if ([].slice.call(items).length === 5) {
            reslut = {
                items: items,
                isInsufficient: false
            }
        } else {
            reslut = {
                items: items,
                isInsufficient: true
            }
        }
        return reslut
    },
    /**
     * 根据pid 在数据库中查找
     * @param pid {int} 需要加载的post的pid值
     * @return {Promise.<void>}
     */
    async find(pid) {
        let result = await dbUtils.findByKey('post_info',  'pid', pid);
        console.log(result)
        return result[0]
    },
    /**
     * 在数据库中计算并返回所有post的总行数
     * @return {Promise.<void>}
     */
    async totalCount(categroy) {
        let _sql ="";
        if (!categroy) {
            _sql = `           
                SELECT COUNT(*) AS total_count
                FROM post_info 
        `;
        } else {
            _sql = `           
                SELECT COUNT(*) AS total_count
                FROM post_info 
                WHERE category = ${categroy}
        `;
        }

        let result = await dbUtils.query(_sql);
        console.log(result);
        return result[0]['total_count'];
    },
    async filterLoad(categroy,row) {
        let sql = ``;
        const view=`CREATE VIEW `
        if (row) {
            _sql = `
                SELECT *
                FROM  categroy${categroy}
                WHERE pid < ${row}
                ORDER BY pid DESC
                LIMIT 5
                `;
        } else {
            _sql = `
               SELECT *
               FROM  categroy${categroy}
               ORDER BY pid DESC 
               LIMIT 5
               `;
        }

        let reslut = {};
        let items = await dbUtils.query(_sql);
        if ([].slice.call(items).length === 5) {
            reslut = {
                items: items,
                isInsufficient: false
            }
        } else {
            reslut = {
                items: items,
                isInsufficient: true
            }
        }
        return reslut
    }
};