/**
 * @description test server
 * @author Thanatos
 */

const request = require('supertest')
const server = require('../src/app').callback()


module.exports = request(server)