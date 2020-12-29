const Bus = require("../../Models/bus/Bus");
const titleCase = require('title-case');

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
    } catch (err) {
      console.log("Error:" + err);
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
    } catch (err) {
      console.log("Error:" + err);
    }
  },

  async getBusByCity(req, res) {
    try {
      regex = new RegExp();
      let { cityStart } = req.body;

      const bus = await Bus.find({
         cityStart: {$regex: cityStart, $options: "i"}
      });

      if (!bus || bus.length == 0) {
        return res.status(201).json({
          message: "Não existem ônibus cadastrados saindo de " + cityStart,
        });
      }
      return res.json(bus);
    } catch (err) {
      console.log("Error: " + err);
    }
  },

  async getBusByHour(req,res){
    try{
      let {hour} = req.body;

      const bus = await Bus.find({
        hour: hour
      });

      if(!hour || hour.length == 0){
        return res.status(201).json({
          message: "Não existem ônibus cadastrados às " + hour
        });
      }
      return res.json(bus);

    }catch(err){
      console.log("Error: " + err)
    }
  },
};

     
