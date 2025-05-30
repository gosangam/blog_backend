/**
 *  article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::article.article",
  ({ strapi }) => ({
    async find(ctx) {
      const articles = await strapi.documents("api::article.article").findMany({
        fields: ["createdAt", "id", "title", "slug"],
        populate: {
          cover: {
            fields: ["url"],
          },
          blocks: true,
        },
        sort: {
          createdAt: "desc",
        }
      });
      return articles;
    },
    async findOne(ctx) {
      const { id } = ctx.params;
      
      const article = await strapi.documents("api::article.article").findFirst({
        filters: {
          documentId: id,
        },
        fields: ["createdAt", "id", "title", "slug"],
        populate: {
          cover: {
            fields: ["url"],
          },
          blocks: true,
        },
      });
      return article;
    },
  })
);
