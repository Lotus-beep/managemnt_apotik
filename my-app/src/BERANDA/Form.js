import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Form() {
  const navigate = useNavigate();
  const[nama,setnama] = useState('');
  const[type,settype] = useState('');
  const[category,setcategory] = useState('');
  const[jumlah,setjumlah] = useState(0);
  const[stock,setstock] = useState(0);
  const[status,setstatus] = useState(null);
  const handleinput = async(e)=>{
    e.preventDefault();
    try {
        console.log('berjalan')
        console.log(type)
        const response = await axios.post('http://localhost:8000/tambahbarang',{
            nama_barang:nama,
            harga_barang:jumlah,
            TIPE_barang:type,
            STOCK_BARANG:stock,
            category_barang:category
        })
        setstatus(response.status);
        if(status == 403 || status == 404) return navigate('/form');
        navigate('/')


    } catch (error) {
        navigate('/form')
    }
  }
  return (
    <form className="Auth-form mb3" onSubmit={handleinput}>
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Tambahkan Barang</h3>
        <div className="form-group mt-3">
          <label>Nama Barang</label>
          <input
            type="TEXT"
            className="form-control mt-1"
            placeholder="Nama Barang"
            value={nama} onChange={ (e)=> setnama(e.target.value) }
          />
        </div>
        <div className="form-group mt-3">
          <label>Category</label>
  <div class="col-md-6">
  <select 
  name="select_box" 
  className="form-select" 
  id="select_box"
  value={category}  
  onChange={(event) => setcategory(event.target.value)}  
>
  <option value="">Masukkan Category</option>
  <option value="OBAT">Obat</option>
  <option value="ALAT">Alat kesehatan</option>
</select>
</div>
</div>
        <div className="form-group mt-3">
          <label>Type Barang</label>
          <div class="col-md-6">
          <select 
  name="select_box" 
  className="form-select" 
  id="select_box"
  value={type}  
  onChange={(event) => settype(event.target.value)}  
>
  <option value="">Masukkan Type</option>
  <option value="BOX">BOX</option>
  <option value="PACK">PACK</option>
  <option value="PCS">PCS</option>
  <option value="TUBE">TUBE</option>
  <option value="BOTOL">BOTOL</option>
  <option value="AMPUL">AMPUL</option>
  <option value="POT">POT</option>
  <option value="SUPP">SUPP</option>
  <option value="STRIP">STRIP</option>
  <option value="PACKL">PACK</option>
</select>

                </div>
        </div>
        <div className="form-group mt-3">
          <label>Stock Barang</label>
          <input
            type="NUMBER"
            className="form-control mt-1"
            placeholder="Nama Barang"
            value={stock} onChange={ (e)=> setstock(e.target.value) }
          />
        </div>
        <div className="form-group mt-3">
          <label>Harga Barang</label>
          <input
            type="TEXT"
            className="form-control mt-1"
            placeholder="Nama Barang"
            value={jumlah} onChange={ (e)=> setjumlah(e.target.value) }
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button type="submit" className="btn btn-primary">
            Tambahkan
          </button>
        </div>
      </div>
    </form>
  )
}

export default Form