import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormUpdate = ({ id,method }) => {
  const navigate = useNavigate();
  const [nama, setNama] = useState('');
  const [type, setType] = useState('');
  const [jumlah, setJumlah] = useState(0);
  const [status, setStatus] = useState(null);

  useEffect(()=>{
    getBarang();
  },[])

  const getBarang = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/data/${id}`);
      setJumlah(response.data.harga_barang);
      setNama(response.data.nama_barang);
      setType(response.data.TYPE_BARANG);
      console.log(response.data.nama_barang);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInput = async (e) => {
    e.preventDefault();
    try {
      console.log(id)
      const response = await axios.put(`http://localhost:8000/data/update/${id}`, {
        nama_barang: nama,
        harga_barang: jumlah,
        TIPE_barang: type,
      });
      setStatus(response.status);
      if (status === 403 || status === 404) return console.log('salah')
      window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  function handlecancel(){
    method();
  }

  return (
      <form className="Auth-form" onSubmit={handleInput}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Update Barang</h3>
          <div className="form-group mt-3">
            <label>Nama Barang</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Nama Barang"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Type Barang</label>
            <select
              name="select_box"
              className="form-select"
              id="select_box"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Masukkan type barang</option>
              <option value="BOTOL">BOTOL</option>
              <option value="BOX">BOX</option>
              <option value="PACK">PACK</option>
              <option value="PCS">PCS</option>
              <option value="TUBE">TUBE</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label>Harga Barang</label>
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
              Update
            </button>
            <button type="submit" className="btn btn-primary" onClick={handlecancel}>
             Batalkan
            </button>
          </div>
        </div>
      </form>
  );
};

export default FormUpdate;
