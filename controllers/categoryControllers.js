const sequelize = require("../lib/sequelize");
const Category = require("../models/Category");

module.exports = {
  get: async (req, res) => {
    try {
      const all = await Category.findAll();
      res.status(200).send(all);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  add: async (req, res) => {
    try {
      const add = await Category.findOrCreate({
        where: {
          category: req.body.category,
        },
      });
      // return primary key of the newly created (or found) category
      // @ts-ignore vs code can't see the dynamically-generated id prop
      res.status(200).send(JSON.stringify(add[0].id));
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const remove = await Category.destroy({
        where: {
          id: +req.params.id,
        },
      });
      res.status(200).send(`Category ID ${req.params.id} deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  edit: async (req, res) => {
    try {
      const update = await Category.update(
        { category: req.body.category },
        { where: { id: +req.params.id } }
      );
      res.status(200).send(`Category ID ${req.params.id} updated.`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
