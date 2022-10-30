'use strict';

/**
 * ordering service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::ordering.ordering');
