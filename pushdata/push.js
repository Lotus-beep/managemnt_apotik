import axios from 'axios';

const data = [
  {"name": "Aboket 20", "price": 4500, "unit": "PCS", "category": "alat"},
  {"name": "Aboket 22", "price": 4500, "unit": "PCS", "category": "alat"},
  {"name": "Aboket 24", "price": 4500, "unit": "PCS", "category": "alat"},
  {"name": "Aboket 26", "price": 4500, "unit": "PCS", "category": "alat"},
  {"name": "Altamed handscoon latex gloves", "price": 41000, "unit": "PCS", "category": "alat"},
  {"name": "Blood lancets 100", "price": 15000, "unit": "BOX", "category": "alat"},
  {"name": "Catgut Chromic 2/0", "price": 10000, "unit": "PCS", "category": "alat"},
  {"name": "Catgut Chromic 3/0", "price": 10000, "unit": "PCS", "category": "alat"},
  {"name": "Chili plast 12,5x4,5", "price": 8000, "unit": "PCS", "category": "alat"},
  {"name": "Dermafix 5x7cm", "price": 3500, "unit": "PCS", "category": "alat"},
  {"name": "Dermafix 10X12 CM", "price": 10000, "unit": "PCS", "category": "alat"},
  {"name": "Dermafix 10x15cm", "price": 12500, "unit": "PCS", "category": "alat"},
  {"name": "Dermafix 10x25cm", "price": 15500, "unit": "PCS", "category": "alat"},
  {"name": "Hansaplas plaster 1,25x5", "price": 13000, "unit": "PCS", "category": "alat"},
  {"name": "Infused anak", "price": 4800, "unit": "PCS", "category": "alat"},
  {"name": "Infused dewasa", "price": 4500, "unit": "PCS", "category": "alat"},
  {"name": "Kasa gulung 10cm", "price": 4500, "unit": "PCS", "category": "alat"},
  {"name": "Kasa gulung 15cm", "price": 9000, "unit": "PCS", "category": "alat"},
  {"name": "Kasa steril", "price": 3000, "unit": "PCS", "category": "alat"},
  {"name": "Kasa steril onemed", "price": 8500, "unit": "PCS", "category": "alat"},
  {"name": "Lomatuell 10x10cm", "price": 13000, "unit": "PCS", "category": "alat"},
  {"name": "Micropore 1,25x9,1 cm", "price": 12000, "unit": "PCS", "category": "alat"},
  {"name": "Micropore 2,5x9,1 cm", "price": 19500, "unit": "PCS", "category": "alat"},
  {"name": "Micropore 5x9,1 cm", "price": 40000, "unit": "PCS", "category": "alat"},
  {"name": "Needle 23G X ¼’’", "price": 24000, "unit": "PCS", "category": "alat"},
  {"name": "Needle 24G X 1’’", "price": 24000, "unit": "PCS", "category": "alat"},
  {"name": "Needle 25G X 1’’", "price": 24000, "unit": "PCS", "category": "alat"},
  {"name": "Needle 26 X ½’’", "price": 24000, "unit": "PCS", "category": "alat"},
  {"name": "Needle 27 G X ½’’", "price": 24000, "unit": "PCS", "category": "alat"},
  {"name": "Needle wing Onemed", "price": 3500, "unit": "PCS", "category": "alat"},
  {"name": "Testpack Hexacare", "price": 2500, "unit": "PCS", "category": "alat"},
  {"name": "Testpack akurat", "price": 9500, "unit": "PCS", "category": "alat"},
  {"name": "Testpack akurat compact", "price": 18000, "unit": "PCS", "category": "alat"},
  {"name": "Ovutest", "price": 22500, "unit": "PCS", "category": "alat"},
  {"name": "Spuit 1cc", "price": 66000, "unit": "BOX", "category": "alat"},
  {"name": "Spuit 2cc", "price": 65000, "unit": "BOX", "category": "alat"},
  {"name": "Spuit 5cc", "price": 66500, "unit": "BOX", "category": "alat"},
  {"name": "Alcohol swab", "price": 12000, "unit": "BOX", "category": "alat"},
  {"name": "Kasa gulung", "price": 80000, "unit": "BALL", "category": "alat"},
  {"name": "Kertas puyer", "price": 12000, "unit": "PCS", "category": "alat"},
  {"name": "Plastik klip kecil", "price": 7000, "unit": "PCS", "category": "alat"},
  {"name": "Plastic klip sedang", "price": 8000, "unit": "PCS", "category": "alat"},
  {"name": "Plastic klip besar", "price": 10000, "unit": "PCS", "category": "alat"},
  {"name": "Thermometer", "price": 25000, "unit": "PCS", "category": "alat"}
]












try {
    data.forEach(async(item) => {
      await axios.post('http://localhost:8000/tambahbarang',{
        nama_barang:item.name,
        harga_barang:item.price,
        TIPE_barang:item.unit,
        STOCK_BARANG:0,
        category_barang:item.category
      })
    })
} catch (error) {
    console.log(error)
}
