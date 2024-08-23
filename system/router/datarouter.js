import express, { Router } from 'express';

import { 
    getobat,getalat,savebarang,barang,sercdata,dltdata,dltriwayat,inner,updatebrg,getbyid,sercinner
 } from '../controler/controler.js';

const router = express.Router();

router.get('/data',getobat);
router.get('/data_ALAT',getalat);
router.post('/tambahbarang',savebarang);
router.put('/data/update/:id',updatebrg);
router.patch('/data/map/:id',barang);
router.post('/srcdata',sercdata);
router.delete('/delete_data/:id',dltdata);
router.delete('/delete_riwayat/:id',dltriwayat);
router.get('/data_riwayat',inner);
router.get('/data/:id',getbyid);
router.post('/caririwayat',sercinner);



export default router;

