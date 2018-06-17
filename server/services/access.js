const validator = require('validator');
const userModel = require('./../models/access');

/**
 * 用户业务操作
 */

const access = {

    /**
     *
     * @param {Object} user 用户信息
     * @return {Promise.<void>} 创建结果
     */
    async signup(user){
        let resultData = await userModel.create(user);
        return resultData;
    },
    /**
     * 查找存在用户信息
     * @param  {object} formData 查找的表单数据
     * @return {object|null}      查找结果
     */
    async getExistOne( formData ) {
        let resultData = await userModel.getExistOne({
            'email': formData.email,
            'name': formData.username
        });
        return resultData
    },
    /**
     * 登录业务操作
     * @param  {object} formData 登录表单信息
     * @return {object}          登录业务操作结果
     */
    async login( formData ) {
        let resultData = await userModel.getOneByUserNameAndPassword({
            'password': formData.password,
            'username': formData.username});
        return resultData
    },


    /**
     * 根据用户名查找用户业务操作
     * @param  {string} userName 用户名
     * @return {object|null}     查找结果
     */
    async getUserInfoByUserName( userName ) {
        let resultData = await userModel.getUserInfoByUserName( userName ) || {};
        let userInfo = {
            // id: resultData.id,
            email: resultData.email,
            username: resultData.name,
            createTime: new Date.parse(resultData.create_time)
        };
        return userInfo
    },
};

module.exports = access;