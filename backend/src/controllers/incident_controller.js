const connection= require('../database/connection')

module.exports={
    async create(req,res){
        const {title,description,value}=req.body;
        const ong_id=req.headers.authorization;

        const [id]= await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        console.log({id})
        return res.json({id})
    },
    async index(req,res){
        const {pages=1}=req.query;
        const [count] =  await connection('incidents').count();

        const incidents=await connection('incidents')
            .join('ongs','ongs.id','=','incidents.ong_id')
            .limit(5)
            .offset((pages-1)*5)    
            .select([
                'incidents.*',
                'ongs.nome',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        res.header('X-Total-Count',count['count(*)']);

        return res.json(incidents)

    },
    
    async delete(req,res){
        const {id} =req.params;
        const ong_id= req.headers.authorization;
        console.log(ong_id);
        console.log(id)
        const incident=await connection('incidents')
            .where('id',id).select('ong_id')
                .first();

        if(incident.ong_id !== ong_id){
            return res.status(401).json({error:'operation not permitted'})
        
        }
        await connection('incidents').where('id',id).delete();
        console.log(incident.ong_id);
        return res.status(204).send();
    }
}