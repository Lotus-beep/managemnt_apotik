import { DATE, Op, where } from "sequelize";
import { riwayat,data } from "../model.js/model.js";

function paddzero(number){
    return number.toString().padStart(2, '0');
 }

export const getobat = async(req,res)=>{
    const result = await data.findAll({
        where:{
            category_barang:'OBAT'
        }
    });
    res.send(result);
}

export const getalat = async(req,res)=>{
    const result = await data.findAll({
        where:{
            category_barang:'alat'
        }
    });
    res.send(result);
}
export const getbyid = async(req,res)=>{
    const id_barang = req.params.id;
    try {
        const response = await data.findOne({
            where:{
                id_barang
            }
        })
        res.status(200).json(response)
    } catch (error) {
        
    }
}

export const updatebrg = async(req,res)=>{
    const id_barang = req.params.id
    const{ nama_barang,harga_barang,TIPE_barang } = req.body;
    console.log(TIPE_barang);
    try {
        await data.update({nama_barang,harga_barang,TIPE_barang},{
            where:{
                id_barang
            }
        })
        res.status(202).json({msg:"berhasil"})
    } catch (error) {
        res.status(407).json({msg:error.message})
    }
}

export const savebarang = async(req,res)=>{
    const { nama_barang , harga_barang , STOCK_BARANG , TIPE_barang ,category_barang} = req.body;
    console.log({ nama_barang , harga_barang , STOCK_BARANG , TIPE_barang  })
    console.log("berjalan")
    if (!nama_barang || !category_barang) {
        return res.status(403).json({ msg: 'Ada data yang kosong.' });
    }
    try {
        const check =  await data.findOne({
            where:{nama_barang}
        })
        
        if(check){
            return res.status(404).json({msg:'data double'});
        }
        await data.create({
            nama_barang,
            harga_barang,
            TIPE_barang,
            STOCK_BARANG,
            category_barang
        })
        
        res.status(200).json({msg:'data success'})
    } catch (error) {
        res.status(403).json({msg:error.message})
    }
}

export const barang = async(req,res)=>{
    const { barang,jumlah } = req.body;
    console.log(barang);
    if(!barang) return res.status(405).json({msg:'undifine'})
    const int_jumlah = parseInt(jumlah);
    const id_barang = req.params.id;
    const date = new Date();
    const hours = date.getHours();
    const minute = date.getMinutes();
    const waktu = `${hours}:${minute}`;
    const tggl = paddzero(date.getDate());
    const bulan = paddzero(date.getMonth() + 1);
    const thn = date.getFullYear();
    const tanggal = `${tggl}/${bulan}/${thn}`;
    console.log(waktu);
    console.log(tanggal);
    const nm_barang = await data.findOne({
        where:{
            id_barang
        }
    })

     if( barang == "Barang masuk" ){
        try {            
            const jumlah_brg = nm_barang.STOCK_BARANG + int_jumlah;
            
            await data.update({STOCK_BARANG:jumlah_brg},{
               where:{
                      nama_barang:nm_barang.nama_barang
                     }
        });

        await riwayat.create({
            id_barang,
            jumlah,
            keterangan:barang,
            tanggal,
            waktu
        })

        res.status(203).json({msg:'data success'})
        } catch (error) {
        console.log(error);
        res.status(404).json({msg:'invalid created'})
        }
     } else {
        try {
            let hasil = 0
            let jumlah_brg = 0;
            if(nm_barang.STOCK_BARANG === 0){
               jumlah_brg = 0;
            }else{
               hasil = nm_barang.STOCK_BARANG - int_jumlah;
            }

            if(hasil <= 0){
               jumlah_brg = 0;
            } else{
                jumlah_brg = hasil;
            }
               console.log(jumlah_brg)
            await data.update({STOCK_BARANG:jumlah_brg},{
               where:{
                      nama_barang:nm_barang.nama_barang
                     }
        });

        await riwayat.create({
            id_barang,
            jumlah,
            keterangan:barang,
            tanggal,
            waktu
        })

        res.status(203).json({msg:'data success'})
        } catch (error) {
        console
        res.status(404).json({msg:'invalid created'})
        }
     }
    
 }

 export const sercdata = async(req,res)=>{
    const serc = req.body.serc;
    try {
        const response = await data.findAll({
            where:{
                nama_barang:{[Op.like]:`%${serc}%`}
            }
        })
        
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({msg:error.message});
    }
    
 }

 export const dltdata = async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    try {
        await data.destroy({
            where:{id_barang:id}
        });

        res.status(200).json({msg:"delete success"});
    } catch (error) {
        console.log(error.message);
        res.status(406).json({msg:"delete invalid"});
    }
    
 }

 export const dltriwayat = async(req,res)=>{
    const id = req.params.id;
     try {
        await riwayat.destroy({
            where:{id_riwayat:id}
        })
        res.status(200).json({msg:"data berhasil"})
     } catch (error) {
        res.status(407).json({msg:error.message})
     }
 }

 
 export const inner = async(req,res)=>{
    try {
        const databarang = await riwayat.findAll({
            attributes:['keterangan','jumlah','tanggal','waktu','id_riwayat'],
            include:{
                model:data,
                attributes:['nama_barang']
            }
        })
        
        
        console.log(databarang.data);
        res.status(203).json(databarang)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({msg:"data invalid"})
    }
    
 }

 export const sercinner = async(req,res)=>{
    const barang = req.body.barang;
    try {
        const databarang = await riwayat.findAll({
            attributes:['keterangan','jumlah','tanggal','waktu'],
            include:{
                model:data,
                where:{
                    nama_barang:{[Op.like]:`%${barang}%`}
                },
                attributes:['nama_barang']
            }
        })
        
        
        console.log(databarang.data);
        res.status(203).json(databarang)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({msg:"data invalid"})
    }
    
 }

 export const sercinput = async(req,res)=>{
    const barang = req.body.barang;
    try {
        const databarang = await riwayat.findAll({
            attributes:['keterangan','jumlah','tanggal','waktu'],
            include:{
                model:data,
                where:{
                    nama_barang:barang,
                    keterangan:'Barang masuk'
                },
                attributes:['nama_barang']
            }
        })
        
        
        console.log(databarang.data);
        res.status(203).json(databarang)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({msg:"data invalid"})
    }
    
 }

 export const sercout = async(req,res)=>{
    const barang = req.body.barang;
    try {
        const databarang = await riwayat.findAll({
            attributes:['keterangan','jumlah','tanggal','waktu'],
            include:{
                model:data,
                where:{
                    nama_barang:barang,
                    keterangan:'Barang keluar'
                },
                attributes:['nama_barang']
            }
        })
        
        
        console.log(databarang.data);
        res.status(203).json(databarang)
    } catch (error) {
        console.log(error.message)
        res.status(404).json({msg:"data invalid"})
    }
    
 }