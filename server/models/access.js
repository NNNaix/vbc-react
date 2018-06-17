const dbUtils = require('./../util/db-util');

const user ={
    /**
     * 数据库新建用户
     * @param model
     * @return {Promise.<void>}
     */
    async create(model){
        let result = await dbUtils.insertData('user_info',model);
        return result;
    },

    /**
     * 查找一个存在用户的数据
     * @param  {obejct} options 查找条件参数
     * @return {object|null}        查找结果
     */
    async getExistOne(options ) {
        let _sql = `
    SELECT * from user_info
      where email="${options.email}" or name="${options.name}"
      limit 1`;
        let result = await dbUtils.query( _sql );
        if ( Array.isArray(result) && result.length > 0 ) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },
    /**
     * 根据用户名和密码查找用户
     * @param  {object} options 用户名密码对象
     * @return {object|null}         查找结果
     */
    async getOneByUserNameAndPassword( options ) {
        let _sql = `
    SELECT * from user_info
      where password="${options.password}" and name="${options.username}"
      limit 1`;
        let result = await dbUtils.query( _sql );
        if ( Array.isArray(result) && result.length > 0 ) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

    /**
     * 根据用户名查找用户信息
     * @param  {string} userName 用户账号名称
     * @return {object|null}     查找结果
     */
    async getUserInfoByUserName( userName ) {

        let result = await dbUtils.select(
            'user_info',
            ['uid', 'email', 'name', 'create_time']);
        if ( Array.isArray(result) && result.length > 0 ) {
            result = result[0]
        } else {
            result = null
        }
        return result
    },

};
module.exports =user;