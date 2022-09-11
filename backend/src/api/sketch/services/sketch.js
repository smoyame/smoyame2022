'use strict';

/**
 * sketch service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sketch.sketch');
