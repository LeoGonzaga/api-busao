const Bus = require("../../Models/bus/Bus");
const titleCase = require('title-case');
const { geoSearch } = require("../../Models/bus/Bus");
function SortByHour(bus){

}

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
      const allBus = await Bus.find().map(bus=>{
        bus.forEach(bus=>{
          if(bus.hour[1]== 'h'){
            bus.hour = '0' + bus.hour;
          }
        });
        return bus;
      });

      const sortedBus = allBus.sort(function(a,b){
        
        if(a.hour<b.hour) return -1;

        if(a.hour>b.hour) return 1;

        return 0;
      });

      if (allBus.length == 0)
        return res.json({
          message: "Nenhum ônibus foi cadastrado no sistema até o momento!",
        });
      return res.json(sortedBus);
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
      }).map(bus=>{
        bus.forEach(bus=>{
          if(bus.hour[1]== 'h'){
            bus.hour = '0' + bus.hour;
          }
        });
        return bus;
      });

      const sortedBus = bus.sort(function(a,b){
        
        if(a.hour<b.hour) return -1;

        if(a.hour>b.hour) return 1;

        return 0;
      });

      if (!bus || bus.length == 0) {
        return res.status(201).json({
          message: "Não existem ônibus cadastrados saindo de " + cityStart,
        });
      }
      return res.json(sortedBus);
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
      console.log("Error: " + err);
    }
  },

  async cityNames(req, res){
    try{
      let aux = await Bus.find({});
      let list = new Set();
      let result = [];
      aux.map((i)=>{
        list.add(i.cityStart);
        list.add(i.cityEnd)
      });
      for(let i of list){
        result.push(i);
      }
      return res.json(result);
    }catch(err){
      console.log("Error: " + err);
    }
  },

  async getBus(req, res){
    try{
      const { cityStart, cityEnd, hour, company } = req.query;
      let bus = await Bus.find({ 
        cityStart: { $regex: cityStart, $options: "i" }, 
        cityEnd: { $regex: cityEnd, $options: "i" },
        hour: { $regex: hour, $options: "i" }, 
        company: { $regex: company, $options: "i" }}).sort(
          {hour: 1, cityStart: 1 });
      return res.json(bus)

    }catch(err){
      console.log("Error: " + err);
    }
  },

  async getHour(req, res) {
    let bus = await Bus.find({}).sort({hour: 1});
    const hourMin = bus[0].hour;
    const hourMax = bus[bus.length-1].hour;
    return res.json({hourMin, hourMax});
  },

  async updateBus(req, res) {
    const { busId, value, hour, days } = req.body;
    let bus = await Bus.findById(busId);
    if(!bus){
      return res.status(401).json({error: "Onibus não encontrado"});
    }

    if(value) bus.value = value;
    if(hour) bus.hour = hour;
    //if(days) bus.days = days; 
    bus.save()
    return res.json({message: "Onibus atualizado"});
  }
};


     
