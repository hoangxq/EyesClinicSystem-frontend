import React, { useState } from "react";
import { storage } from "../configs/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { notification } from "antd";

const UploadImage = ({ onUploadComplete }) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onUploadComplete(downloadURL); // Gọi hàm callback với URL của ảnh đã tải lên

          // Hiển thị thông báo khi tải ảnh lên thành công
          notification.success({
            message: "Upload Image",
            description: "Image uploaded successfully!",
          });
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <p>Upload is {progress}% done</p>}
    </div>
  );
};

export default UploadImage;
