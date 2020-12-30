const Company = require("../../Models/company/Company");

module.exports = {
    async getCompanys (req, res){
        try{
            let company = await Company.find({});
            res.json(company);
        }catch(err){
            console.log("Error:" + err);
        }
    },

    async createCompany(req,res){
        try{
            const{
                name,
                color
            } = req.body;

            if (!name) {
                return res.status(400).json({
                  error:
                    "Ops, insira um nome para sua compania!",
                });
            }

            let company = await Company.create({name, color});
            return res.json(company);

        }catch(err){
            console.log("Error: " + err);
        }
    }
}