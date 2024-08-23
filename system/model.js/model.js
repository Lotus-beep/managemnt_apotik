import {  HasMany, Sequelize } from "sequelize";
import db from "../configdatabase.js";

const{ DataTypes } = Sequelize;

export const data = db.define('barang',{
    id_barang:{
        type:DataTypes.INTEGER(5),
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    nama_barang:{
        type:DataTypes.STRING(30),
        allowNull:false
    },
    harga_barang:{
        type:DataTypes.INTEGER(8),
        allowNull:false
    },
    TIPE_barang:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    STOCK_BARANG:{
        type:DataTypes.INTEGER(5),
        allowNull:true
    },
    category_barang:{
        type:DataTypes.STRING(10)
    }
},{
    timestamps:false,
    freezeTableName:true
})

export const riwayat = db.define('riwayat',{
    id_riwayat:{
        primaryKey:true,
        allowNull:false,
        autoIncrement:true,
        type:DataTypes.INTEGER(5)
    },
    id_barang:{
        type:DataTypes.INTEGER(5),
        allowNull:false
    },
    keterangan:{
        type:DataTypes.STRING(13),
        allowNull:false
    },
    jumlah:{
        type:DataTypes.INTEGER(3),
        allowNull:false
    },
    tanggal:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    waktu:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    freezeTableName:true,
    timestamps:false
})

data.hasMany(riwayat,{foreignKey:'id_barang'});
riwayat.belongsTo(data,{foreignKey:'id_barang'});

(async()=>{
    await db.sync();
})();