'use strict';

/**
 * find controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::find.find');
