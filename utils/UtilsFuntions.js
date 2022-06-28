import axios from "axios";
export const CreateRamdomOrderID = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// upload image on cloudinary
export const UploadImage = async (images) => {
  console.log(images);
  let imgArr = [];
  const formData = new FormData();

  for (const item of images) {
    formData.append("file", item);
    formData.append("upload_preset", "shopfi");
    formData.append("cloud_name", "djl5iy2pe");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/djl5iy2pe/image/upload",
        formData
      );
      imgArr.push({ public_id: data.public_id, imgURL: data.secure_url });
    } catch (err) {
      alert(err);
    }
  }

  return imgArr;
  // formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME);
};
