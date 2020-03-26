const connection=require('../database/connection')
const crypto=require('crypto')
module.exports={
    async create(req,res){
        const {nome,email,whatsapp,city,uf}=req.body;
        const id=crypto.randomBytes(4).toString('HEX');
        await connection('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return res.json({id})
    },
    async index(req,res){
        const ongs=await connection('ongs').select('*')
        console.log(ongs)
        return res.json(ongs);
    }
}