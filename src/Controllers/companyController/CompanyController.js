const Company = require("../../Models/company/Company");

module.exports = {
    async getCompanys (req, res){
        try{
            let company = await Company.find({});
            res.json(company);
        }catch(err){
            console.log("Error:" + err);
        }
    }
}