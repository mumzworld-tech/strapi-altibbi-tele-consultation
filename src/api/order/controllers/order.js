"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      const { fullName, phone, countryCode } = ctx.request.body.data.customer;

      // find or create customer
      let customer = await strapi.db
        .query("api::customer.customer")
        .findOne({ where: { phone, countryCode } });

      if (!customer) {
        customer = await strapi.entityService.create("api::customer.customer", {
          data: { fullName, phone, countryCode },
        });
      }

      // Generate order ID with retry logic
      const generateUniqueOrderId = async (attempts = 0) => {
        if (attempts > 3) {
          throw new Error(
            "Failed to generate unique order ID after 3 attempts"
          );
        }

        const prefix = "ALH-";

        // Using findOne in Strapi v5
        const lastOrder = await strapi.entityService.findMany(
          "api::order.order",
          {
            where: {
              orderId: {
                $startsWith: prefix,
              },
            },
            sort: { orderId: "desc" },
            limit: 1,
          }
        );

        let orderId;
        if (lastOrder.length > 0 && lastOrder[0].orderId?.startsWith(prefix)) {
          const lastOrderId = lastOrder[0].orderId.split("-")[1];
          orderId = `${prefix}${parseInt(lastOrderId) + 1}`;
        } else {
          orderId = `${prefix}915100`;
        }

        // inject relation before calling super
        ctx.request.body.data.customerId = customer.documentId;
        ctx.request.body.data.orderId = orderId;

        try {
          // now create the service-request (customer is attached)
          const response = await super.create(ctx);
          return response;
        } catch (error) {
          if (
            error.message.includes("unique") ||
            error.message.includes("duplicate")
          ) {
            // Retry with new ID
            return await generateUniqueOrderId(attempts + 1);
          }
          throw error;
        }
      };

      const data = await generateUniqueOrderId();

      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      ctx.throw(500, "Failed to create order");
    }
  },
}));
