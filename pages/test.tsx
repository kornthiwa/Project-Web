import axios from 'axios';
import React, { useState } from 'react';

function Test() {
  const [image, setImage] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);

  const submitImage = async (e) => {
    e.preventDefault();

    if (!image) {
      return; // หรือแสดงข้อความแจ้งเตือนว่าผู้ใช้ยังไม่ได้เลือกไฟล์
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const result = await axios.get('http://localhost:8080/users', {
        headers: {"Content-Type": "multipart/form-data"},
      });
      console.log(result.data); // จัดการข้อมูลที่ได้รับจากการ response
      setData(result.data[0])  
      } catch (error) {
      console.error('Error submitting image:', error);
    }
  }

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  return (
    <div>
      <form onSubmit={submitImage}>
        <input type="file" name="image" onChange={onInputChange} />
        <button type="submit">Click</button>
      </form>
      <img src={data?.image} />
         </div>

  );
}

export default Test;
