const Bus = require("../../Models/bus/Bus");

module.exports = {
  async createRoute(req, res) {
    try {
      const {
        hour,
        cityStart,
        cityEnd,
        value,
        citys,
        company,
        onRoad,
        days,
        holidays,
      } = req.body;
      if (!hour || !cityStart || !cityEnd || !value || !citys) {
        return res.status(400).json({
          error:
            "Ops! Não foi possivel cadastrar essa rota. Confira se os campos e tente novamente!",
        });
      }

      let newBus = await Bus.create({
        hour,
        cityStart,
        cityEnd,
        value,
        citys,
        company,
        days,
        holidays,
      });
      return res.json(newBus);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async getAllBus(req, res) {
    try {
      const allBus = await Bus.find();
      if (allBus.length == 0)
        return res.json({
          message: "Nenhum ônibus foi cadastrado no sistema até o momento!",
        });
      return res.json(allBus);
    } catch (e) {
      console.log("Error:" + e);
    }
  },

  async getBusByCity(req, res) {
    try {
      let { cityStart } = req.body;
      const bus = await Bus.find({
        cityStart: { $regex: cityStart },
      });
      if (!bus || bus.length == 0) {
        return res.status(201).json({
          message: "Não existem ônibus cadastrados saindo de" + cityStart,
        });
      }
      return res.json(bus);
    } catch (e) {
      console.log("Error" + e);
    }
  },

  async updateProduct(req, res) {
    try {
      let { newDescription, newUnitValue, newRebate, _id } = req.body;
      console.log(_id);
      const update = {
        description: newDescription,
        unitValue: newUnitValue,
        rebate: newRebate,
      };
      let product = await Product.findOneAndUpdate(_id, update);

      if (!product)
        return res
          .status(404)
          .json("Você esta tentando atualizar um produto que não existe!");

      return res.json({ message: "Atualizado!" });
    } catch (e) {
      console.log("Error" + e);
    }
  },
  async removeProduct(req, res) {
    try {
      let { _id } = req.body;

      let product = await Product.findOneAndDelete(_id);
      console.log(product);
      if (!product)
        return res
          .status(404)
          .json("Você esta tentando deletar um produto que não existe");

      return res.json({ message: "Deletado!" });
    } catch (e) {
      console.log("Error" + e);
    }
  },
};
