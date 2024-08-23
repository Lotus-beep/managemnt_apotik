import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate,useParams } from 'react-router-dom';

const Stock = ({id,method}) => {
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [type, settype] = useState('');
  const [stock, setstock] = useState(0);
  const [keterangan, setketerangan] = useState('');
  const [jumlah, setJumlah] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(()=>{
    getBarang();
    console.log(type);
  },[])

  const getBarang = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/data/${id}`);
      setstock(response.data.STOCK_BARANG);
      setNama(response.data.nama_barang);
      settype(response.data.TIPE_barang);
      console.log(response.data.nama_barang);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  function handleDelete (){method();}
  const handleInput = async (e) => {
    e.preventDefault();
    try {
      console.log(keterangan)
      const response = await axios.patch(`http://localhost:8000/data/map/${id}`, {
        jumlah,
        barang:keterangan
      });
      window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (

      <form className="Auth-form" onSubmit={handleInput}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{nama}</h3>
          <h3 className="Auth-form-title">Stock Barang : {stock} {type}</h3>
          <div className="form-group mt-3">
            <label>Type Barang</label>
            <select
              name="select_box"
              className="form-select"
              id="select_box"
              value={keterangan}
              onChange={(e) => setketerangan(e.target.value)}
            >
              <option value="">Masukkan keterangan</option>
              <option value="Barang masuk">Barang masuk</option>
              <option value="Barang keluar">Barang keluar</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label>Jumlah Barang</label>
            <input
              type="number"
              className="form-control mt-1"
              placeholder="Harga Barang"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Kirim
            </button>
            <button type="submit" className="btn btn-primary" onClick={()=>handleDelete()}>
              Batalkan
            </button>
          </div>
        </div>
      </form>
  );
};

export default Stock;
