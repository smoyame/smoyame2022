'use strict';

/**
 * find service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::find.find');
